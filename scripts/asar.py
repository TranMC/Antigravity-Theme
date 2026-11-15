import os
import sys
import json
import struct

def extract_asar(asar_path, out_dir):
    with open(asar_path, 'rb') as f:
        magic = struct.unpack('<I', f.read(4))[0]
        if magic != 4:
            raise ValueError(f"Invalid asar magic: {magic}")
        header_size_total = struct.unpack('<I', f.read(4))[0]
        header_size_payload = struct.unpack('<I', f.read(4))[0]
        json_len = struct.unpack('<I', f.read(4))[0]
        
        json_bytes = f.read(json_len).rstrip(b'\x00')
        header = json.loads(json_bytes.decode('utf-8'))
        
        base_offset = 16 + json_len
        
        def extract_dir(node, current_path):
            os.makedirs(current_path, exist_ok=True)
            files = node.get('files', {})
            for name, meta in files.items():
                target_path = os.path.join(current_path, name)
                if 'files' in meta:
                    extract_dir(meta, target_path)
                elif 'size' in meta and 'offset' in meta:
                    offset = int(meta['offset'])
                    size = meta['size']
                    f.seek(base_offset + offset)
                    data = f.read(size)
                    with open(target_path, 'wb') as out_f:
                        out_f.write(data)
                elif meta.get('unpacked', False):
                    # Unpacked placeholder
                    pass
        
        extract_dir(header, out_dir)
    print(f"[asar.py] Extracted {asar_path} to {out_dir}")

def pack_asar(src_dir, out_asar_path):
    files_tree = {"files": {}}
    files_to_pack = []
    current_offset = 0

    for root, dirs, files in os.walk(src_dir):
        rel_root = os.path.relpath(root, src_dir)
        parts = [] if rel_root == '.' else rel_root.split(os.sep)
        
        cur = files_tree
        for part in parts:
            if 'files' not in cur:
                cur['files'] = {}
            if part not in cur['files']:
                cur['files'][part] = {"files": {}}
            cur = cur['files'][part]

        for file in files:
            full_path = os.path.join(root, file)
            size = os.path.getsize(full_path)
            cur['files'][file] = {
                "size": size,
                "offset": str(current_offset)
            }
            files_to_pack.append(full_path)
            current_offset += size

    json_str = json.dumps(files_tree, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    
    # 4-byte alignment
    pad = (4 - (len(json_bytes) % 4)) % 4
    if pad:
        json_bytes += b'\x00' * pad
        
    json_len = len(json_bytes)
    header_size_payload = json_len + 4
    header_size_total = header_size_payload + 4

    with open(out_asar_path, 'wb') as f:
        f.write(struct.pack('<I', 4))
        f.write(struct.pack('<I', header_size_total))
        f.write(struct.pack('<I', header_size_payload))
        f.write(struct.pack('<I', json_len))
        f.write(json_bytes)
        
        for file_path in files_to_pack:
            with open(file_path, 'rb') as in_f:
                while True:
                    chunk = in_f.read(1024 * 1024)
                    if not chunk:
                        break
                    f.write(chunk)
                    
    print(f"[asar.py] Packed {src_dir} to {out_asar_path}")

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python asar.py extract <asar_path> <out_dir>")
        print("       python asar.py pack <src_dir> <out_asar_path>")
        sys.exit(1)
    cmd = sys.argv[1]
    if cmd == 'extract':
        extract_asar(sys.argv[2], sys.argv[3])
    elif cmd == 'pack':
        pack_asar(sys.argv[2], sys.argv[3])
    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)
