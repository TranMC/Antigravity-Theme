# -*- coding: utf-8 -*-
import os
import re

REPO_DIR = r"E:\Antigravity\Antigravity-Theme"
PIXEL_THEME_PATH = os.path.join(REPO_DIR, "patch", "pixelTheme.js")

print("[Fix] Starting safe injector patch...")

# Đoạn code an toàn hoàn chỉnh
SAFE_INJECTOR_JS = r'''
const THEME_SAFE_INIT_JS = `(() => {
  if (window.__agy_safe_theme_loaded) return 'already-present';
  window.__agy_safe_theme_loaded = true;

  // 1. Áp dụng cấu hình giao diện đã lưu
  function applyRuntimeTheme() {
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

      let css = ':root { --agy-glass-blur: ' + blur + 'px !important; --agy-sidebar-alpha: ' + (parseInt(sidebarAlpha)/100) + ' !important; }\\n';
      if (savedWp) {
        css += 'html::before { background-image: url("' + savedWp + '") !important; background-size: cover !important; background-position: center !important; }\\n';
        css += 'body:not(.theme-light)::before { background-color: rgba(10, 14, 22, ' + (parseInt(dim)/100) + ') !important; background-image: none !important; }\\n';
      }
      style.textContent = css;

      const catEnabled = localStorage.getItem('antigravity_cat_enabled') !== 'false';
      const cat = document.getElementById('antigravity-cyber-cat');
      if (cat) cat.style.display = catEnabled ? 'block' : 'none';
    } catch (e) {}
  }
  applyRuntimeTheme();

  // 2. Chờ React App mount xong hoàn toàn mới chạy UI enhancers
  function onAppReady(callback) {
    let retries = 0;
    const interval = setInterval(() => {
      retries++;
      const isReady = document.querySelector('[data-testid="conversation-list-sidebar"], [data-testid="composer"], div[role="navigation"], [data-main-content-body]');
      if (isReady) {
        clearInterval(interval);
        setTimeout(callback, 300);
      } else if (retries > 40) {
        clearInterval(interval);
        callback();
      }
    }, 250);
  }

  onAppReady(() => {
    initVietnameseLocalization();
    initSettingsThemeStudio();
  });

  // --- 3. VIỆT HÓA AN TOÀN (KHÔNG GÂY LẶP VÔ HẠN) ---
  function initVietnameseLocalization() {
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
      "Configure agent execution, queued message delivery, and permissions.": "Cấu hình thực thi agent, tin nhắn hàng đợi và phân quyền.",
      "Interface Layout": "Bố cục giao diện",
      "Knowledge Work": "Công việc văn phòng",
      "Simplified interface for research, writing, and everyday tasks.": "Giao diện tinh gọn cho nghiên cứu, viết lách và công việc hàng ngày.",
      "Software Engineering": "Lập trình & Kỹ thuật",
      "Full interface for coding, developer tools, and managing agents.": "Giao diện đầy đủ cho lập trình, công cụ phát triển và quản lý agent.",
      "Global Permissions": "Quyền hạn toàn cục",
      "Configure global allowed and denied resource permissions.": "Cấu hình quyền tài nguyên được phép và bị từ chối trên toàn hệ thống.",
      "Learn more.": "Tìm hiểu thêm.",
      "Permission Preset": "Mức quyền hạn",
      "Controls the actions the agent can take.": "Kiểm soát các hành động mà agent có thể thực hiện.",
      "Tool Permissions": "Quyền truy cập công cụ",
      "Modify permissions for file, terminal, and MCP tools.": "Chỉnh sửa quyền đối với tệp tin, terminal và công cụ MCP.",
      "Network Access Rules": "Quy tắc mạng",
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

    const translatedNodes = new WeakSet();

    function translateTextNode(node) {
      if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;
      if (!node || node.nodeType !== Node.TEXT_NODE || translatedNodes.has(node)) return;
      const val = node.nodeValue ? node.nodeValue.trim() : '';
      if (!val) return;

      const parent = node.parentElement;
      if (!parent) return;
      if (parent.closest('.monaco-editor, pre, code, .xterm, textarea, input, [data-code-block]')) return;

      if (/Hey .+, what should we build today\?/i.test(val)) {
        const m = val.match(/Hey (.+), what should we build today\?/i);
        const name = m ? m[1] : 'bạn';
        translatedNodes.add(node);
        node.nodeValue = 'Chào ' + name + ', hôm nay chúng ta sẽ cùng tạo nên điều gì?';
        return;
      }

      if (VI_MAP[val]) {
        translatedNodes.add(node);
        node.nodeValue = node.nodeValue.replace(val, VI_MAP[val]);
      }
    }

    function scanScope(scopeEl) {
      if (!scopeEl) return;
      if (scopeEl.querySelectorAll) {
        scopeEl.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
          const ph = el.getAttribute('placeholder');
          if (ph && ph.includes('Ask anything')) {
            el.setAttribute('placeholder', 'Hỏi bất kỳ điều gì, @ để gắn thẻ, / cho hành động');
          }
        });
      }

      const walker = document.createTreeWalker(scopeEl, NodeFilter.SHOW_TEXT, null, false);
      let n;
      while (n = walker.nextNode()) {
        translateTextNode(n);
      }
    }

    function translateUI() {
      if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;
      const targets = [
        document.querySelector('[data-testid="conversation-list-sidebar"]'),
        document.querySelector('div[role="navigation"]'),
        document.querySelector('[data-testid="title-menu-bar"]'),
        document.querySelector('[role="dialog"]'),
        document.querySelector('[data-main-content-header]')
      ];
      targets.forEach(t => { if (t) scanScope(t); });
    }

    translateUI();

    let debounceTimer = null;
    const viObserver = new MutationObserver((mutations) => {
      if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;
      let shouldScan = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          translateUI();
        }, 300);
      }
    });

    viObserver.observe(document.body, { childList: true, subtree: true });
  }

  // --- 4. SETTINGS THEME STUDIO (SAFE ENGINE) ---
  function initSettingsThemeStudio() {
    function tryMountStudio() {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return;

      if (dialog.querySelector('#agy-theme-studio-tab')) return;

      const buttons = Array.from(dialog.querySelectorAll('button, [role="tab"]'));
      const generalBtn = buttons.find(b => /General|Cài đặt chung/i.test(b.textContent));
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

      function findContentPanel() {
        let p = dialog.querySelector('[role="tabpanel"]');
        if (p) return p;
        const allDivs = Array.from(dialog.querySelectorAll(':scope > div, :scope > div > div'));
        for (const d of allDivs) {
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

        customPanel.innerHTML = `
          <div style="border-bottom:1px solid rgba(122,168,159,0.25); padding-bottom:14px; margin-bottom:18px;">
            <h2 style="margin:0; font-size:18px; font-weight:600; color:#E6C384; display:flex; align-items:center; gap:8px;">
              <span>🎨</span> Antigravity Theme Studio <span style="font-size:11px; padding:2px 8px; background:rgba(122,168,159,0.2); border-radius:10px; color:#7AA89F;">v2.1.0</span>
            </h2>
            <p style="margin:4px 0 0; font-size:12px; color:#A6A69C;">Tùy chỉnh hình nền, hiệu ứng kính mờ Acrylic Glassmorphism, giao diện và thú cưng.</p>
          </div>

          <div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px; margin-bottom:16px;">
            <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">
              <span>🖼️</span> Hình nền tùy chỉnh (Custom Wallpaper)
            </h3>
            <div style="display:flex; gap:14px; align-items:center; margin-bottom:12px;">
              <div id="agy-wp-preview" style="width:110px; height:68px; border-radius:6px; border:1px solid rgba(122,168,159,0.3); background-size:cover; background-position:center; background-color:#0d111a; display:flex; align-items:center; justify-content:center; color:#737C73; font-size:11px; ${currentWp ? 'background-image:url(\"' + currentWp + '\");' : ''}">
                ${currentWp ? '' : 'Mặc định'}
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
                <input type="range" id="agy-wp-dim" min="0" max="80" value="${currentDim}" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />
                <span id="agy-wp-dim-val" style="width:32px; text-align:right; font-family:monospace;">${currentDim}%</span>
              </div>
            </div>
          </div>

          <div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px; margin-bottom:16px;">
            <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">
              <span>✨</span> Kính mờ Acrylic (Glassmorphism)
            </h3>
            <div style="display:flex; flex-direction:column; gap:12px; font-size:12px; color:#C5C9C5;">
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <span>Độ mờ kính (Acrylic Blur):</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="range" id="agy-glass-blur-slider" min="0" max="50" value="${currentBlur}" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />
                  <span id="agy-glass-blur-val" style="width:32px; text-align:right; font-family:monospace;">${currentBlur}px</span>
                </div>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <span>Độ trong suốt thanh bên (Sidebar Opacity):</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="range" id="agy-sidebar-alpha-slider" min="15" max="85" value="${currentAlpha}" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />
                  <span id="agy-sidebar-alpha-val" style="width:32px; text-align:right; font-family:monospace;">${currentAlpha}%</span>
                </div>
              </div>
            </div>
          </div>

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
                  <input type="checkbox" id="agy-cat-toggle" ${catEnabled ? 'checked' : ''} style="width:16px; height:16px; accent-color:#7AA89F; cursor:pointer;" />
                </div>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
                <div>
                  <div style="font-weight:500; color:#EAE6D3;">🇻🇳 Giao diện Tiếng Việt</div>
                  <div style="font-size:11px; color:#8A8980;">Bật / Tắt dịch các nút bấm và menu sang tiếng Việt.</div>
                </div>
                <input type="checkbox" id="agy-vi-toggle" ${viEnabled ? 'checked' : ''} style="width:16px; height:16px; accent-color:#7AA89F; cursor:pointer;" />
              </div>
            </div>
          </div>
        `;

        const p = findContentPanel();
        if (p && p.parentElement) {
          p.parentElement.appendChild(customPanel);
        }
      }

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
          alert('Đã lưu thay đổi. Vui lòng bấm Ctrl+R hoặc khởi động lại ứng dụng!');
        };
      }

      // Safe Click Event Delegation
      dialog.addEventListener('click', (e) => {
        const target = e.target.closest('button, [role="tab"]');
        if (!target) return;

        if (target === themeTab || themeTab.contains(target)) {
          tabContainer.querySelectorAll('button, [role="tab"]').forEach(b => {
            b.style.background = 'transparent';
            b.style.fontWeight = 'normal';
          });
          themeTab.style.background = 'rgba(122,168,159,0.2)';
          themeTab.style.fontWeight = '600';

          const content = findContentPanel();
          if (content) content.style.display = 'none';
          customPanel.style.display = 'block';
        } else if (tabContainer.contains(target)) {
          themeTab.style.background = 'transparent';
          themeTab.style.fontWeight = 'normal';
          customPanel.style.display = 'none';
          const content = findContentPanel();
          if (content) content.style.display = '';
        }
      }, true);
    }

    const obs = new MutationObserver(() => {
      tryMountStudio();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    tryMountStudio();
  }

  return 'installed';
})()`;
'''

with open(PIXEL_THEME_PATH, "r", encoding="utf-8") as f:
    js_content = f.read()

# Xóa bỏ các block cũ (THEME_RUNTIME_INIT_JS, VI_LOCALIZATION_JS, SETTINGS_THEME_STUDIO_JS)
patterns = [
    r'const THEME_RUNTIME_INIT_JS = `[\s\S]*?`\);\n\n',
    r'const THEME_RUNTIME_INIT_JS = `[\s\S]*?`\);\n',
    r'const VI_LOCALIZATION_JS = `[\s\S]*?`\);\n\n',
    r'const VI_LOCALIZATION_JS = `[\s\S]*?`\);\n',
    r'const SETTINGS_THEME_STUDIO_JS = `[\s\S]*?`\);\n\n',
    r'const SETTINGS_THEME_STUDIO_JS = `[\s\S]*?`\);\n',
    r'const THEME_SAFE_INIT_JS = `[\s\S]*?`\);\n\n',
    r'const THEME_SAFE_INIT_JS = `[\s\S]*?`\);\n'
]
for pat in patterns:
    js_content = re.sub(pat, '', js_content)

# Thay thế bằng khối SAFE_INJECTOR_JS duy nhất ngay trước attachPixelTheme
target_func = "function attachPixelTheme(win) {"
js_content = js_content.replace(target_func, SAFE_INJECTOR_JS + "\n\n" + target_func, 1)

# Xóa các lời gọi execute cũ trong dom-ready
js_content = re.sub(r'\s*// Runtime theme settings[\s\S]*?SETTINGS_THEME_STUDIO_JS, true\)\.catch\(\(\) => \{\}\);', '', js_content)
js_content = re.sub(r'\s*wc\.executeJavaScript\(VI_LOCALIZATION_JS[\s\S]*?SETTINGS_THEME_STUDIO_JS, true\)\.catch\(\(\) => \{\}\);', '', js_content)
js_content = re.sub(r'\s*wc\.executeJavaScript\(THEME_SAFE_INIT_JS, true\)\.catch\(\(\) => \{\}\);', '', js_content)

# Thêm lời gọi duy nhất an toàn sau CYBER_CAT_PET_JS
cat_call = 'wc.executeJavaScript(CYBER_CAT_PET_JS, true).catch(() => {});'
safe_dom_call = cat_call + '\n            // Safe Unified Theme & UI Enhancer (Delayed after React mount)\n            wc.executeJavaScript(THEME_SAFE_INIT_JS, true).catch(() => {});'
js_content = js_content.replace(cat_call, safe_dom_call, 1)

with open(PIXEL_THEME_PATH, "w", encoding="utf-8") as f:
    f.write(js_content)

print("[Fix] Successfully updated patch/pixelTheme.js with THEME_SAFE_INIT_JS!")
