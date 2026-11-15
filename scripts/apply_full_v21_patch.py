# -*- coding: utf-8 -*-
import os
import re

REPO_DIR = r"E:\Antigravity\Antigravity-Theme"
PIXEL_THEME_PATH = os.path.join(REPO_DIR, "patch", "pixelTheme.js")
KANAGAWA_CSS_PATH = os.path.join(REPO_DIR, "kanagawa-theme", "kanagawa.css")

print("[v2.1.0] Starting theme & localization update...")

# ============================================================================
# 1. THEME_RUNTIME_INIT_JS
# ============================================================================
THEME_RUNTIME_INIT_JS = r'''
const THEME_RUNTIME_INIT_JS = `(() => {
  try {
    const savedWp = localStorage.getItem('agy_custom_wallpaper');
    const dim = localStorage.getItem('agy_wallpaper_dim') || '35';
    const blur = localStorage.getItem('agy_glass_blur') || '24';
    const sidebarAlpha = localStorage.getItem('agy_sidebar_alpha') || '40';

    let style = document.getElementById('agy-runtime-theme-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'agy-runtime-theme-style';
      document.head.appendChild(style);
    }

    let cssRules = ':root { --agy-glass-blur: ' + blur + 'px !important; --agy-sidebar-alpha: ' + (parseInt(sidebarAlpha)/100) + ' !important; }\\n';
    if (savedWp) {
      cssRules += 'html::before { background-image: url("' + savedWp + '") !important; background-size: cover !important; background-position: center !important; }\\n';
      cssRules += 'body:not(.theme-light)::before { background-color: rgba(10, 14, 22, ' + (parseInt(dim)/100) + ') !important; background-image: none !important; }\\n';
    }
    style.textContent = cssRules;

    const catEnabled = localStorage.getItem('antigravity_cat_enabled') !== 'false';
    const cat = document.getElementById('antigravity-cyber-cat');
    if (cat) cat.style.display = catEnabled ? 'block' : 'none';
  } catch (e) {
    console.error('[runtime-init] Error applying runtime theme:', e);
  }
})()`;
'''

# ============================================================================
# 2. VI_LOCALIZATION_JS
# ============================================================================
VI_LOCALIZATION_JS = r'''
const VI_LOCALIZATION_JS = `(() => {
  if (window.__agy_vi_installed) return 'already-present';
  window.__agy_vi_installed = true;

  const VI_MAP = {
    "Antigravity": "Antigravity",
    "Workspace": "Không gian làm việc",
    "View": "Hiển thị",
    "Window": "Cửa sổ",
    "Open IDE": "Mở IDE",
    "New Conversation": "Cuộc trò chuyện mới",
    "Automations": "Tự động hóa",
    "Customizations": "Tùy chỉnh",
    "Projects": "Dự án",
    "Conversations": "Trò chuyện",
    "Settings": "Cài đặt",
    "Give Feedback": "Gửi phản hồi",
    "Show All": "Hiện tất cả",
    "Not in Project": "Ngoài dự án",

    "Ask anything, @ to mention, / for actions": "Hỏi bất kỳ điều gì, @ để gắn thẻ, / cho hành động",
    "Local Checkout": "Mã nguồn cục bộ",
    "Review": "Xem lại",
    "file changed": "tệp thay đổi",
    "files changed": "tệp thay đổi",
    "just now": "vừa xong",
    "Worked for": "Đã xử lý trong",
    "Stop": "Dừng lại",
    "Retry": "Thử lại",

    "General": "Cài đặt chung",
    "Application": "Ứng dụng",
    "Appearance": "Giao diện",
    "Shortcuts": "Phím tắt",
    "Notifications": "Thông báo",
    "Models": "Mô hình AI",
    "Browser": "Trình duyệt",
    "Configure agent execution, queued message delivery, and permissions.": "Cấu hình thực thi agent, gửi tin nhắn hàng đợi và phân quyền.",
    "Interface Layout": "Bố cục giao diện",
    "Knowledge Work": "Công việc văn phòng & Tri thức",
    "Simplified interface for research, writing, and everyday tasks.": "Giao diện tinh gọn cho nghiên cứu, viết lách và công việc hàng ngày.",
    "Software Engineering": "Kỹ thuật phần mềm & Lập trình",
    "Full interface for coding, developer tools, and managing agents.": "Giao diện đầy đủ cho lập trình, công cụ phát triển và quản lý agent.",
    "Global Permissions": "Quyền hạn toàn cục",
    "Configure global allowed and denied resource permissions.": "Cấu hình quyền tài nguyên được phép và bị từ chối trên toàn hệ thống.",
    "Learn more.": "Tìm hiểu thêm.",
    "Permission Preset": "Mức quyền hạn",
    "Controls the actions the agent can take.": "Kiểm soát các hành động mà agent có thể thực hiện.",
    "Tool Permissions": "Quyền truy cập công cụ",
    "Modify permissions for file, terminal, and MCP tools.": "Chỉnh sửa quyền đối với tệp tin, terminal và các công cụ MCP.",
    "Network Access Rules": "Quy tắc truy cập mạng",
    "Configure allowed and denied URLs for reading.": "Cấu hình các URL được phép hoặc bị chặn khi truy cập web.",
    "Execution": "Cơ chế thực thi",
    "Queued Messages": "Tin nhắn xếp hàng",
    "Configure when follow-up messages are sent.": "Cấu hình thời điểm gửi các tin nhắn tiếp theo.",
    "Send Immediately": "Gửi ngay",
    "Queue": "Xếp hàng",
    "Open": "Mở",
    "Save": "Lưu",
    "Cancel": "Hủy",
    "Close": "Đóng",
    "Reset": "Đặt lại",
    "Default": "Mặc định",
    "Custom": "Tùy chỉnh"
  };

  function translateNode(node) {
    if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;
    if (!node || !node.nodeValue) return;
    const parent = node.parentElement;
    if (!parent) return;
    const tag = parent.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') return;
    if (parent.closest('.monaco-editor, pre, code, .xterm, [data-code-block]')) return;

    let text = node.nodeValue.trim();
    if (!text) return;

    if (/Hey .+, what should we build today\?/i.test(text)) {
      const match = text.match(/Hey (.+), what should we build today\?/i);
      const name = match ? match[1] : 'bạn';
      node.nodeValue = 'Chào ' + name + ', hôm nay chúng ta sẽ cùng tạo nên điều gì?';
      return;
    }

    if (VI_MAP[text]) {
      node.nodeValue = node.nodeValue.replace(text, VI_MAP[text]);
      return;
    }

    if (parent.getAttribute && parent.getAttribute('placeholder')) {
      const ph = parent.getAttribute('placeholder');
      if (VI_MAP[ph]) {
        parent.setAttribute('placeholder', VI_MAP[ph]);
      }
    }
  }

  function walk(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while (n = walker.nextNode()) {
      translateNode(n);
    }
    if (root.querySelectorAll) {
      root.querySelectorAll('[placeholder]').forEach(el => {
        const ph = el.getAttribute('placeholder');
        if (VI_MAP[ph]) el.setAttribute('placeholder', VI_MAP[ph]);
      });
    }
  }

  walk(document.body);

  const observer = new MutationObserver((mutations) => {
    if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;
    for (const m of mutations) {
      if (m.type === 'childList') {
        for (const added of m.addedNodes) {
          if (added.nodeType === Node.TEXT_NODE) {
            translateNode(added);
          } else if (added.nodeType === Node.ELEMENT_NODE) {
            walk(added);
          }
        }
      } else if (m.type === 'characterData') {
        translateNode(m.target);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  return 'installed';
})()`;
'''

# ============================================================================
# 3. SETTINGS_THEME_STUDIO_JS
# ============================================================================
SETTINGS_THEME_STUDIO_JS = r'''
const SETTINGS_THEME_STUDIO_JS = `(() => {
  function tryInjectThemeStudio() {
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) return;

    if (dialog.querySelector('#agy-theme-studio-tab')) return;

    const allButtons = Array.from(dialog.querySelectorAll('button, [role="tab"]'));
    const generalBtn = allButtons.find(b => /General|Cài đặt chung/i.test(b.textContent));
    if (!generalBtn || !generalBtn.parentElement) return;

    const tabContainer = generalBtn.parentElement;

    const themeTab = document.createElement('button');
    themeTab.id = 'agy-theme-studio-tab';
    themeTab.className = generalBtn.className;
    themeTab.setAttribute('type', 'button');
    themeTab.style.cssText = generalBtn.style.cssText;
    themeTab.style.display = 'flex';
    themeTab.style.alignItems = 'center';
    themeTab.style.gap = '8px';
    themeTab.style.cursor = 'pointer';
    themeTab.innerHTML = '<span style="font-size:14px;">🎨</span><span>Tùy biến Theme</span>';

    tabContainer.appendChild(themeTab);

    function getRightPanel() {
      let panel = dialog.querySelector('[role="tabpanel"]');
      if (panel) return panel;
      const directChildren = Array.from(dialog.querySelectorAll(':scope > div, :scope > div > div'));
      for (const d of directChildren) {
        if (!d.contains(tabContainer) && d.clientWidth > 250) {
          return d;
        }
      }
      return tabContainer.nextElementSibling || tabContainer.parentElement.lastElementChild;
    }

    let customPanel = dialog.querySelector('#agy-theme-studio-panel');
    if (!customPanel) {
      customPanel = document.createElement('div');
      customPanel.id = 'agy-theme-studio-panel';
      customPanel.style.cssText = 'display:none; flex:1; background:#121622 !important; color:#EAE6D3; padding:24px; border-radius:12px; height:100%; overflow-y:auto; box-sizing:border-box; font-family:sans-serif; z-index:10;';
      
      const currentWp = localStorage.getItem('agy_custom_wallpaper') || '';
      const currentDim = localStorage.getItem('agy_wallpaper_dim') || '35';
      const currentBlur = localStorage.getItem('agy_glass_blur') || '24';
      const currentAlpha = localStorage.getItem('agy_sidebar_alpha') || '40';
      const catEnabled = localStorage.getItem('antigravity_cat_enabled') !== 'false';
      const viEnabled = localStorage.getItem('agy_vietnamese_enabled') !== 'false';

      customPanel.innerHTML = \`
        <div style="border-bottom:1px solid rgba(122,168,159,0.25); padding-bottom:14px; margin-bottom:18px;">
          <h2 style="margin:0; font-size:18px; font-weight:600; color:#E6C384; display:flex; align-items:center; gap:8px;">
            <span>🎨</span> Antigravity Theme Studio <span style="font-size:11px; padding:2px 8px; background:rgba(122,168,159,0.2); border-radius:10px; color:#7AA89F;">v2.1.0</span>
          </h2>
          <p style="margin:4px 0 0; font-size:12px; color:#A6A69C;">Tùy chỉnh hình nền, hiệu ứng kính mờ Acrylic Glassmorphism, giao diện và thú cưng.</p>
        </div>

        <!-- Mục 1: Hình nền -->
        <div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px; margin-bottom:16px;">
          <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">
            <span>🖼️</span> Hình nền tùy chỉnh (Custom Wallpaper)
          </h3>
          <div style="display:flex; gap:14px; align-items:center; margin-bottom:12px;">
            <div id="agy-wp-preview" style="width:110px; height:68px; border-radius:6px; border:1px solid rgba(122,168,159,0.3); background-size:cover; background-position:center; background-color:#0d111a; display:flex; align-items:center; justify-content:center; color:#737C73; font-size:11px; \${currentWp ? 'background-image:url(\\\"' + currentWp + '\\\");' : ''}">
              \${currentWp ? '' : 'Mặc định'}
            </div>
            <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
              <label style="display:inline-flex; align-items:center; justify-content:center; gap:6px; background:#2D4F67; color:#EAE6D3; padding:7px 14px; border-radius:6px; font-size:12px; font-weight:500; cursor:pointer; width:fit-content;">
                <span>📂 Chọn ảnh từ máy tính</span>
                <input type="file" id="agy-wp-file-input" accept="image/*" style="display:none;" />
              </label>
              <button id="agy-wp-reset-btn" type="button" style="display:inline-flex; align-items:center; gap:6px; background:rgba(196,116,110,0.15); border:1px solid rgba(196,116,110,0.3); color:#E46876; padding:5px 12px; border-radius:6px; font-size:11px; cursor:pointer; width:fit-content;">
                <span>🗑️ Xóa ảnh nền (về mặc định)</span>
              </button>
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; font-size:12px; color:#C5C9C5;">
            <span>Độ mờ tối của hình nền (Dim):</span>
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="range" id="agy-wp-dim" min="0" max="80" value="\${currentDim}" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />
              <span id="agy-wp-dim-val" style="width:32px; text-align:right; font-family:monospace;">\${currentDim}%</span>
            </div>
          </div>
        </div>

        <!-- Mục 2: Acrylic Glassmorphism -->
        <div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px; margin-bottom:16px;">
          <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">
            <span>✨</span> Kính mờ Acrylic (Glassmorphism)
          </h3>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:12px; color:#C5C9C5;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span>Độ mờ kính (Acrylic Blur):</span>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="range" id="agy-glass-blur-slider" min="0" max="50" value="\${currentBlur}" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />
                <span id="agy-glass-blur-val" style="width:32px; text-align:right; font-family:monospace;">\${currentBlur}px</span>
              </div>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span>Độ trong suốt thanh bên (Sidebar Opacity):</span>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="range" id="agy-sidebar-alpha-slider" min="15" max="85" value="\${currentAlpha}" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />
                <span id="agy-sidebar-alpha-val" style="width:32px; text-align:right; font-family:monospace;">\${currentAlpha}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mục 3: Tiện ích -->
        <div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px;">
          <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">
            <span>⚙️</span> Tiện ích nâng cao
          </h3>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:12px; color:#C5C9C5;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <div>
                <div style="font-weight:500; color:#EAE6D3;">🐱 Thú cưng Cyber-Cat</div>
                <div style="font-size:11px; color:#8A8980;">Mèo neon có thể kéo thả tự do trên màn hình.</div>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <button id="agy-cat-reset-btn" type="button" style="padding:3px 8px; font-size:11px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#EAE6D3; border-radius:4px; cursor:pointer;">Đặt lại vị trí</button>
                <input type="checkbox" id="agy-cat-toggle" \${catEnabled ? 'checked' : ''} style="width:16px; height:16px; accent-color:#7AA89F; cursor:pointer;" />
              </div>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
              <div>
                <div style="font-weight:500; color:#EAE6D3;">🇻🇳 Giao diện Tiếng Việt</div>
                <div style="font-size:11px; color:#8A8980;">Bật / Tắt dịch toàn bộ giao diện Antigravity.</div>
              </div>
              <input type="checkbox" id="agy-vi-toggle" \${viEnabled ? 'checked' : ''} style="width:16px; height:16px; accent-color:#7AA89F; cursor:pointer;" />
            </div>
          </div>
        </div>
      \`;

      const rightPanel = getRightPanel();
      if (rightPanel && rightPanel.parentElement) {
        rightPanel.parentElement.appendChild(customPanel);
      }
    }

    function updateRuntimeStyle() {
      const savedWp = localStorage.getItem('agy_custom_wallpaper');
      const dim = localStorage.getItem('agy_wallpaper_dim') || '35';
      const blur = localStorage.getItem('agy_glass_blur') || '24';
      const sidebarAlpha = localStorage.getItem('agy_sidebar_alpha') || '40';

      let style = document.getElementById('agy-runtime-theme-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'agy-runtime-theme-style';
        document.head.appendChild(style);
      }

      let cssRules = ':root { --agy-glass-blur: ' + blur + 'px !important; --agy-sidebar-alpha: ' + (parseInt(sidebarAlpha)/100) + ' !important; }\\n';
      if (savedWp) {
        cssRules += 'html::before { background-image: url("' + savedWp + '") !important; background-size: cover !important; background-position: center !important; }\\n';
        cssRules += 'body:not(.theme-light)::before { background-color: rgba(10, 14, 22, ' + (parseInt(dim)/100) + ') !important; background-image: none !important; }\\n';
      }
      style.textContent = cssRules;
    }

    // Bind event handlers inside customPanel
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
          updateRuntimeStyle();
        };
        reader.readAsDataURL(file);
      };
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        localStorage.removeItem('agy_custom_wallpaper');
        preview.style.backgroundImage = 'none';
        preview.textContent = 'Mặc định';
        updateRuntimeStyle();
      };
    }

    if (dimSlider) {
      dimSlider.oninput = () => {
        dimVal.textContent = dimSlider.value + '%';
        localStorage.setItem('agy_wallpaper_dim', dimSlider.value);
        updateRuntimeStyle();
      };
    }

    if (blurSlider) {
      blurSlider.oninput = () => {
        blurVal.textContent = blurSlider.value + 'px';
        localStorage.setItem('agy_glass_blur', blurSlider.value);
        updateRuntimeStyle();
      };
    }

    if (alphaSlider) {
      alphaSlider.oninput = () => {
        alphaVal.textContent = alphaSlider.value + '%';
        localStorage.setItem('agy_sidebar_alpha', alphaSlider.value);
        updateRuntimeStyle();
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
        alert('Đã cập nhật cài đặt ngôn ngữ. Vui lòng nhấn Ctrl+R hoặc khởi động lại ứng dụng để áp dụng hoàn toàn!');
      };
    }

    // Tab switching behavior
    themeTab.onclick = () => {
      tabContainer.querySelectorAll('button, [role="tab"]').forEach(b => {
        b.style.background = 'transparent';
        b.style.fontWeight = 'normal';
      });
      themeTab.style.background = 'rgba(122,168,159,0.2)';
      themeTab.style.fontWeight = '600';

      const rightPanel = getRightPanel();
      if (rightPanel) rightPanel.style.display = 'none';
      customPanel.style.display = 'block';
    };

    // When clicking any other tab, restore rightPanel
    tabContainer.querySelectorAll('button, [role="tab"]').forEach(b => {
      if (b === themeTab) return;
      const oldClick = b.onclick;
      b.onclick = (e) => {
        themeTab.style.background = 'transparent';
        themeTab.style.fontWeight = 'normal';
        customPanel.style.display = 'none';
        const rightPanel = getRightPanel();
        if (rightPanel) rightPanel.style.display = '';
        if (typeof oldClick === 'function') oldClick.call(b, e);
      };
    });
  }

  const dialogObserver = new MutationObserver(() => {
    tryInjectThemeStudio();
  });
  dialogObserver.observe(document.body, { childList: true, subtree: true });

  tryInjectThemeStudio();
  return 'installed';
})()`;
'''

# ============================================================================
# 4. CHÈN VÀO patch/pixelTheme.js
# ============================================================================
with open(PIXEL_THEME_PATH, "r", encoding="utf-8") as f:
    js_content = f.read()

# Chèn các block JS trước attachPixelTheme nếu chưa có
if "const THEME_RUNTIME_INIT_JS" not in js_content:
    target_str = "function attachPixelTheme(win) {"
    injection = THEME_RUNTIME_INIT_JS + "\n" + VI_LOCALIZATION_JS + "\n" + SETTINGS_THEME_STUDIO_JS + "\n\n" + target_str
    js_content = js_content.replace(target_str, injection, 1)

# Chèn các lời gọi executeJavaScript trong dom-ready
dom_ready_call = '''            // Runtime theme settings (custom wallpaper, blur, dim, cat)
            wc.executeJavaScript(THEME_RUNTIME_INIT_JS, true).catch(() => {});
            // Screen Pet (Cyber-Cat)
            wc.executeJavaScript(CYBER_CAT_PET_JS, true).catch(() => {});
            // Vietnamese UI Localization
            wc.executeJavaScript(VI_LOCALIZATION_JS, true).catch(() => {});
            // Settings Theme Studio
            wc.executeJavaScript(SETTINGS_THEME_STUDIO_JS, true).catch(() => {});'''

if "wc.executeJavaScript(VI_LOCALIZATION_JS" not in js_content:
    cat_call = "wc.executeJavaScript(CYBER_CAT_PET_JS, true).catch(() => {});"
    js_content = js_content.replace(cat_call, dom_ready_call, 1)

with open(PIXEL_THEME_PATH, "w", encoding="utf-8") as f:
    f.write(js_content)

print("[v2.1.0] Successfully updated patch/pixelTheme.js")

# ============================================================================
# 5. CẬP NHẬT kanagawa-theme/kanagawa.css (Acrylic Glassmorphism)
# ============================================================================
with open(KANAGAWA_CSS_PATH, "r", encoding="utf-8") as f:
    css_content = f.read()

# Thêm biến CSS mặc định ở :root
root_patch = """
:root {
  --agy-glass-blur: 24px;
  --agy-sidebar-alpha: 0.40;
}
"""
if "--agy-glass-blur:" not in css_content:
    css_content = root_patch + css_content

# Cập nhật rule sidebar chuẩn Acrylic Glassmorphism
css_content = re.sub(
    r':is\(\[data-testid="conversation-list-sidebar"\], \[data-testid="settings-sidebar"\], div\[role="navigation"\]\[aria-label="Sidebar"\]\):not\(\[role="navigation"\] \[data-testid="conversation-list-sidebar"\]\)\s*\{[\s\S]*?overflow:\s*hidden\s*!important;\s*\}',
    ''':is([data-testid="conversation-list-sidebar"], [data-testid="settings-sidebar"], div[role="navigation"][aria-label="Sidebar"]):not([role="navigation"] [data-testid="conversation-list-sidebar"]) {
  background-color: rgba(14, 18, 26, var(--agy-sidebar-alpha, 0.40)) !important;
  backdrop-filter: blur(var(--agy-glass-blur, 24px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--agy-glass-blur, 24px)) saturate(140%) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 14px !important;
  margin: 6px 0 6px 6px !important;
  width: calc(100% - 6px) !important;
  height: calc(100% - 12px) !important;
  overflow: hidden !important;
}''',
    css_content
)

# Thêm khối Acrylic overrides ở cuối file nếu chưa có
acrylic_block = """
/* === ANTIGRAVITY-ACRYLIC-ENHANCEMENT-START (v2.1.0) === */
/* 1. Sidebar & Title bar acrylic blur */
div[role="navigation"][aria-label="Sidebar"] [class~="bg-sidebar"],
[data-testid="conversation-list-sidebar"] [class~="bg-sidebar"],
div[role="navigation"][aria-label="Sidebar"] nav,
[data-testid="conversation-list-sidebar"] nav {
  background-color: transparent !important;
  background: transparent !important;
}

[data-testid="title-menu-bar"] {
  background: rgba(13, 17, 25, 0.45) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

/* 2. Message bubbles & Composer Glassmorphism */
div[data-testid="composer"],
div:has(> textarea[data-testid="composer-input"]),
form:has(textarea) {
  background: rgba(18, 24, 38, 0.52) !important;
  backdrop-filter: blur(28px) saturate(150%) !important;
  -webkit-backdrop-filter: blur(28px) saturate(150%) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 16px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
}

[data-testid="user-message-bubble"],
.agy-user-bubble-frame {
  background: rgba(45, 79, 103, 0.45) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(126, 156, 216, 0.25) !important;
  border-radius: 14px !important;
}

[data-testid="agent-response"] {
  background: rgba(15, 20, 29, 0.40) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(122, 168, 159, 0.2) !important;
  border-radius: 14px !important;
  padding: 12px 16px !important;
}

/* 3. Solid Settings Dialog (chống đè chữ & trong suốt) */
[role="dialog"],
div[data-testid="settings-modal"],
.settings-modal-container {
  background-color: #121622 !important;
  background: #121622 !important;
  opacity: 1 !important;
  border: 1px solid rgba(122, 168, 159, 0.3) !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85) !important;
}

[role="dialog"] div[class*="bg-background"],
[role="dialog"] div[class*="bg-content"],
[role="dialog"] [class*="bg-muted"],
[role="dialog"] [class*="bg-card"] {
  background-color: #181d2a !important;
  background: #181d2a !important;
}
/* === ANTIGRAVITY-ACRYLIC-ENHANCEMENT-END === */
"""

if "ANTIGRAVITY-ACRYLIC-ENHANCEMENT-START" not in css_content:
    css_content = css_content.strip() + "\n\n" + acrylic_block

with open(KANAGAWA_CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css_content)

print("[v2.1.0] Successfully updated kanagawa-theme/kanagawa.css")
print("[v2.1.0] Done all theme updates.")
