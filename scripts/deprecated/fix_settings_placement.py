# -*- coding: utf-8 -*-
import os

REPO_DIR = r"E:\Antigravity\Antigravity-Theme"
PIXEL_THEME_PATH = os.path.join(REPO_DIR, "patch", "pixelTheme.js")

with open(PIXEL_THEME_PATH, "r", encoding="utf-8") as f:
    js_content = f.read()

OLD_FUNC_START = "  function setupSettingsCustomizer() {"
NEW_FUNC_BODY = r'''  function setupSettingsCustomizer() {
    function injectTab() {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return;

      if (dialog.querySelector('#agy-theme-studio-tab')) return;

      const buttons = Array.from(dialog.querySelectorAll('button, [role="tab"]'));
      const sampleBtn = buttons.find(b => /General|Cài đặt chung|Application|Giao diện/i.test(b.textContent));
      if (!sampleBtn || !sampleBtn.parentElement) return;

      const tabContainer = sampleBtn.parentElement;

      // 1. Tạo button tab ở cột bên trái
      const themeTab = document.createElement('button');
      themeTab.id = 'agy-theme-studio-tab';
      themeTab.className = sampleBtn.className;
      themeTab.setAttribute('type', 'button');
      themeTab.style.cssText = sampleBtn.style.cssText;
      themeTab.style.display = 'flex';
      themeTab.style.alignItems = 'center';
      themeTab.style.gap = '8px';
      themeTab.style.cursor = 'pointer';
      themeTab.innerHTML = '<span style="font-size:14px;">🎨</span><span>Tùy biến Theme</span>';

      tabContainer.appendChild(themeTab);

      // 2. Tìm CỘT BÊN PHẢI (vùng nội dung chính rộng rãi)
      function findRightColumn() {
        let parent = tabContainer;
        while (parent && parent.parentElement && parent.parentElement !== document.body) {
          const grand = parent.parentElement;
          for (const sibling of grand.children) {
            if (sibling !== parent && !sibling.contains(tabContainer) && sibling.clientWidth > 250) {
              return sibling;
            }
          }
          parent = grand;
        }
        const candidates = Array.from(dialog.querySelectorAll('div')).filter(d => !d.contains(tabContainer) && d.clientWidth > 300);
        candidates.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight));
        return candidates[0] || null;
      }

      // 3. Tạo panel Theme Studio rộng rãi
      let customPanel = dialog.querySelector('#agy-theme-studio-panel');
      if (!customPanel) {
        customPanel = document.createElement('div');
        customPanel.id = 'agy-theme-studio-panel';
        customPanel.style.cssText = 'display:none; width:100%; height:100%; flex:1; background:#121622 !important; color:#EAE6D3; padding:28px; border-radius:12px; overflow-y:auto; box-sizing:border-box; font-family:sans-serif; z-index:10;';

        const currentWp = localStorage.getItem('agy_custom_wallpaper') || '';
        const currentDim = localStorage.getItem('agy_wallpaper_dim') || '35';
        const currentBlur = localStorage.getItem('agy_glass_blur') || '24';
        const currentAlpha = localStorage.getItem('agy_sidebar_alpha') || '40';
        const catEnabled = localStorage.getItem('antigravity_cat_enabled') !== 'false';
        const viEnabled = localStorage.getItem('agy_vietnamese_enabled') !== 'false';

        const previewStyle = currentWp ? ('background-image:url(\"' + currentWp + '\");') : '';
        const previewText = currentWp ? '' : 'Mặc định';

        customPanel.innerHTML = [
          '<div style="border-bottom:1px solid rgba(122,168,159,0.25); padding-bottom:16px; margin-bottom:22px;">',
          '  <h2 style="margin:0; font-size:20px; font-weight:600; color:#E6C384; display:flex; align-items:center; gap:10px;">',
          '    <span>🎨</span> Antigravity Theme Studio <span style="font-size:11px; padding:2px 8px; background:rgba(122,168,159,0.2); border-radius:10px; color:#7AA89F;">v2.1.0</span>',
          '  </h2>',
          '  <p style="margin:6px 0 0; font-size:13px; color:#A6A69C;">Tùy chỉnh hình nền, hiệu ứng kính mờ Acrylic Glassmorphism, giao diện và thú cưng Cyber-Cat.</p>',
          '</div>',

          '<!-- Mục 1: Hình nền -->',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:12px; padding:20px; margin-bottom:20px;">',
          '  <h3 style="margin:0 0 14px; font-size:15px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:8px;">',
          '    <span>🖼️</span> Hình nền tùy chỉnh (Custom Wallpaper)',
          '  </h3>',
          '  <div style="display:flex; gap:20px; align-items:center; margin-bottom:16px;">',
          '    <div id="agy-wp-preview" style="width:160px; height:100px; border-radius:8px; border:1px solid rgba(122,168,159,0.3); background-size:cover; background-position:center; background-color:#0d111a; display:flex; align-items:center; justify-content:center; color:#737C73; font-size:12px; ' + previewStyle + '">',
          '      ' + previewText,
          '    </div>',
          '    <div style="flex:1; display:flex; flex-direction:column; gap:10px;">',
          '      <label style="display:inline-flex; align-items:center; justify-content:center; gap:8px; background:#2D4F67; color:#EAE6D3; padding:8px 18px; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; width:fit-content; transition:background 0.2s;">',
          '        <span>📂 Chọn ảnh từ máy tính</span>',
          '        <input type="file" id="agy-wp-file-input" accept="image/*" style="display:none;" />',
          '      </label>',
          '      <button id="agy-wp-reset-btn" type="button" style="display:inline-flex; align-items:center; gap:6px; background:rgba(196,116,110,0.15); border:1px solid rgba(196,116,110,0.3); color:#E46876; padding:6px 14px; border-radius:8px; font-size:12px; cursor:pointer; width:fit-content;">',
          '        <span>🗑️ Xóa ảnh nền (về mặc định)</span>',
          '      </button>',
          '    </div>',
          '  </div>',
          '  <div style="display:flex; align-items:center; justify-content:space-between; font-size:13px; color:#C5C9C5;">',
          '    <span>Độ mờ tối của hình nền (Dim Scrim):</span>',
          '    <div style="display:flex; align-items:center; gap:12px;">',
          '      <input type="range" id="agy-wp-dim" min="0" max="80" value="' + currentDim + '" style="width:160px; accent-color:#7AA89F; cursor:pointer;" />',
          '      <span id="agy-wp-dim-val" style="width:36px; text-align:right; font-family:monospace;">' + currentDim + '%</span>',
          '    </div>',
          '  </div>',
          '</div>',

          '<!-- Mục 2: Acrylic Glassmorphism -->',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:12px; padding:20px; margin-bottom:20px;">',
          '  <h3 style="margin:0 0 14px; font-size:15px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:8px;">',
          '    <span>✨</span> Kính mờ Acrylic (Glassmorphism)',
          '  </h3>',
          '  <div style="display:flex; flex-direction:column; gap:16px; font-size:13px; color:#C5C9C5;">',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <span>Độ mờ kính (Acrylic Blur):</span>',
          '      <div style="display:flex; align-items:center; gap:12px;">',
          '        <input type="range" id="agy-glass-blur-slider" min="0" max="50" value="' + currentBlur + '" style="width:160px; accent-color:#7AA89F; cursor:pointer;" />',
          '        <span id="agy-glass-blur-val" style="width:36px; text-align:right; font-family:monospace;">' + currentBlur + 'px</span>',
          '      </div>',
          '    </div>',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <span>Độ trong suốt thanh bên (Sidebar Opacity):</span>',
          '      <div style="display:flex; align-items:center; gap:12px;">',
          '        <input type="range" id="agy-sidebar-alpha-slider" min="15" max="85" value="' + currentAlpha + '" style="width:160px; accent-color:#7AA89F; cursor:pointer;" />',
          '        <span id="agy-sidebar-alpha-val" style="width:36px; text-align:right; font-family:monospace;">' + currentAlpha + '%</span>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</div>',

          '<!-- Mục 3: Tiện ích -->',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:12px; padding:20px;">',
          '  <h3 style="margin:0 0 14px; font-size:15px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:8px;">',
          '    <span>⚙️</span> Tiện ích nâng cao',
          '  </h3>',
          '  <div style="display:flex; flex-direction:column; gap:16px; font-size:13px; color:#C5C9C5;">',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <div>',
          '        <div style="font-weight:500; color:#EAE6D3; font-size:14px;">🐱 Thú cưng Cyber-Cat</div>',
          '        <div style="font-size:12px; color:#8A8980; margin-top:2px;">Mèo neon có thể kéo thả tự do trên màn hình.</div>',
          '      </div>',
          '      <div style="display:flex; align-items:center; gap:10px;">',
          '        <button id="agy-cat-reset-btn" type="button" style="padding:4px 10px; font-size:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#EAE6D3; border-radius:6px; cursor:pointer;">Đặt lại vị trí</button>',
          '        <input type="checkbox" id="agy-cat-toggle" ' + (catEnabled ? 'checked' : '') + ' style="width:18px; height:18px; accent-color:#7AA89F; cursor:pointer;" />',
          '      </div>',
          '    </div>',
          '    <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.08); padding-top:14px;">',
          '      <div>',
          '        <div style="font-weight:500; color:#EAE6D3; font-size:14px;">🇻🇳 Giao diện Tiếng Việt</div>',
          '        <div style="font-size:12px; color:#8A8980; margin-top:2px;">Bật / Tắt dịch các nút bấm và menu sang tiếng Việt.</div>',
          '      </div>',
          '      <input type="checkbox" id="agy-vi-toggle" ' + (viEnabled ? 'checked' : '') + ' style="width:18px; height:18px; accent-color:#7AA89F; cursor:pointer;" />',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('');
      }

      // 4. Bind events
      const fileInput = customPanel.querySelector('#agy-wp-file-input');
      const preview = customPanel.querySelector('#agy-wp-preview');
      const resetBtn = customPanel.querySelector('#agy-wp-reset-btn');
      const dimSlider = customPanel.querySelector('#agy-wp-dim');
      const dimVal = customPanel.querySelector('#agy-wp-dim-val');
      const blurSlider = customPanel.querySelector('#agy-glass-blur-slider');
      const blurVal = customPanel.querySelector('#agy-glass-blur-val');
      const alphaSlider = customPanel.querySelector('#agy-sidebar-alpha-slider');
      const alphaVal = customPanel.querySelector('#agy-sidebar-alpha-val');
      const catToggle = customPanel.querySelector('#agy-cat-toggle');
      const catReset = customPanel.querySelector('#agy-cat-reset-btn');
      const viToggle = customPanel.querySelector('#agy-vi-toggle');

      if (fileInput) {
        fileInput.onchange = (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
            const b64 = ev.target.result;
            localStorage.setItem('agy_custom_wallpaper', b64);
            preview.style.backgroundImage = 'url("' + b64 + '")';
            preview.textContent = '';
            applyRuntimeTheme();
          };
          reader.readAsDataURL(file);
        };
      }

      if (resetBtn) {
        resetBtn.onclick = () => {
          localStorage.removeItem('agy_custom_wallpaper');
          preview.style.backgroundImage = 'none';
          preview.textContent = 'Mặc định';
          applyRuntimeTheme();
        };
      }

      if (dimSlider) {
        dimSlider.oninput = () => {
          dimVal.textContent = dimSlider.value + '%';
          localStorage.setItem('agy_wallpaper_dim', dimSlider.value);
          applyRuntimeTheme();
        };
      }

      if (blurSlider) {
        blurSlider.oninput = () => {
          blurVal.textContent = blurSlider.value + 'px';
          localStorage.setItem('agy_glass_blur', blurSlider.value);
          applyRuntimeTheme();
        };
      }

      if (alphaSlider) {
        alphaSlider.oninput = () => {
          alphaVal.textContent = alphaSlider.value + '%';
          localStorage.setItem('agy_sidebar_alpha', alphaSlider.value);
          applyRuntimeTheme();
        };
      }

      if (catToggle) {
        catToggle.onchange = () => {
          localStorage.setItem('antigravity_cat_enabled', catToggle.checked ? 'true' : 'false');
          const cat = document.getElementById('antigravity-cyber-cat');
          if (cat) cat.style.display = catToggle.checked ? 'block' : 'none';
        };
      }

      if (catReset) {
        catReset.onclick = () => {
          localStorage.removeItem('antigravity_cat_x');
          localStorage.removeItem('antigravity_cat_y');
          const catWrapper = document.querySelector('#antigravity-cyber-cat .cat-wrapper');
          if (catWrapper) {
            catWrapper.style.left = 'auto';
            catWrapper.style.top = 'auto';
            catWrapper.style.right = '25px';
            catWrapper.style.bottom = '100px';
          }
        };
      }

      if (viToggle) {
        viToggle.onchange = () => {
          localStorage.setItem('agy_vietnamese_enabled', viToggle.checked ? 'true' : 'false');
        };
      }

      // 5. Click Handler: Hiển thị Theme Studio ở CỘT BÊN PHẢI RỘNG RÃI
      dialog.addEventListener('click', (e) => {
        const target = e.target.closest('button, [role="tab"]');
        if (!target) return;

        const rightCol = findRightColumn();
        if (!rightCol) return;

        if (target === themeTab || themeTab.contains(target)) {
          tabContainer.querySelectorAll('button, [role="tab"]').forEach(b => {
            b.style.background = 'transparent';
            b.style.fontWeight = 'normal';
          });
          themeTab.style.background = 'rgba(122,168,159,0.2)';
          themeTab.style.fontWeight = '600';

          // Ẩn tất cả các phần tử con hiện có trong CỘT BÊN PHẢI
          Array.from(rightCol.children).forEach(child => {
            if (child === customPanel) return;
            if (!child.hasAttribute('data-agy-prev-disp')) {
              child.setAttribute('data-agy-prev-disp', child.style.display || 'block');
            }
            child.style.display = 'none';
          });

          // Gắn customPanel vào CỘT BÊN PHẢI
          if (!rightCol.contains(customPanel)) {
            rightCol.appendChild(customPanel);
          }
          customPanel.style.display = 'block';

        } else if (tabContainer.contains(target)) {
          themeTab.style.background = 'transparent';
          themeTab.style.fontWeight = 'normal';
          customPanel.style.display = 'none';

          // Hiện lại các con ban đầu của CỘT BÊN PHẢI
          Array.from(rightCol.children).forEach(child => {
            if (child === customPanel) return;
            const prev = child.getAttribute('data-agy-prev-disp');
            if (prev) {
              child.style.display = (prev === 'block' ? '' : prev);
            }
          });
        }
      }, true);
    }

    setInterval(injectTab, 1000);
  }'''

idx1 = js_content.find(OLD_FUNC_START)
idx2 = js_content.find("  runWhenAppReady();")

if idx1 != -1 and idx2 != -1:
    js_content = js_content[:idx1] + NEW_FUNC_BODY + "\n\n" + js_content[idx2:]
    with open(PIXEL_THEME_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)
    print("[Success] Replaced setupSettingsCustomizer to right column!")
else:
    print(f"[Error] Could not find bounds: idx1={idx1}, idx2={idx2}")
