# -*- coding: utf-8 -*-
import os

REPO_DIR = r"E:\Antigravity\Antigravity-Theme"
PIXEL_THEME_PATH = os.path.join(REPO_DIR, "patch", "pixelTheme.js")

with open(PIXEL_THEME_PATH, "r", encoding="utf-8") as f:
    js_content = f.read()

ANTIGRAVITY_STUDIO_V21_JS = r'''
const ANTIGRAVITY_STUDIO_V21_JS = `(() => {
  if (window.__agy_studio_v21_loaded) return 'already-present';
  window.__agy_studio_v21_loaded = true;

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
    } catch (e) {
      console.error('[theme-studio] Runtime theme error:', e);
    }
  }

  applyRuntimeTheme();

  function runWhenAppReady() {
    let attempts = 0;
    const checkApp = setInterval(() => {
      attempts++;
      const appRoot = document.querySelector('[data-testid="conversation-list-sidebar"], [data-testid="composer"], div[role="navigation"]');
      if (appRoot) {
        clearInterval(checkApp);
        setTimeout(() => {
          setupLocalization();
          setupSettingsCustomizer();
        }, 500);
      } else if (attempts > 50) {
        clearInterval(checkApp);
      }
    }, 300);
  }

  function setupLocalization() {
    const VI_DICT = {
      "New Conversation": "Cuộc trò chuyện mới",
      "Automations": "Tự động hóa",
      "Customizations": "Tùy chỉnh",
      "Projects": "Dự án",
      "Conversations": "Trò chuyện",
      "Settings": "Cài đặt",
      "Give Feedback": "Gửi phản hồi",
      "Show All": "Hiện tất cả",
      "Not in Project": "Ngoài dự án",
      "General": "Cài đặt chung",
      "Application": "Ứng dụng",
      "Appearance": "Giao diện",
      "Shortcuts": "Phím tắt",
      "Notifications": "Thông báo",
      "Models": "Mô hình AI",
      "Browser": "Trình duyệt",
      "Interface Layout": "Bố cục giao diện",
      "Knowledge Work": "Công việc văn phòng",
      "Software Engineering": "Kỹ thuật phần mềm",
      "Global Permissions": "Quyền hạn toàn cục",
      "Permission Preset": "Mức quyền hạn",
      "Tool Permissions": "Quyền công cụ",
      "Network Access Rules": "Quy tắc mạng",
      "Execution": "Thực thi",
      "Queued Messages": "Tin nhắn hàng đợi",
      "Send Immediately": "Gửi ngay",
      "Queue": "Xếp hàng",
      "Open IDE": "Mở IDE",
      "Review": "Xem lại"
    };

    function translateStaticUI() {
      if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;

      const input = document.querySelector('textarea[data-testid="composer-input"]');
      if (input && input.placeholder && input.placeholder.includes('Ask anything')) {
        input.placeholder = 'Hỏi bất kỳ điều gì, @ để gắn thẻ, / cho hành động';
      }

      const elements = document.querySelectorAll('[data-testid="conversation-list-sidebar"] span, [data-testid="conversation-list-sidebar"] div, div[role="navigation"] span, [role="dialog"] span, [role="dialog"] div');
      elements.forEach(el => {
        if (el.children.length > 0) return;
        const txt = el.textContent ? el.textContent.trim() : '';
        if (VI_DICT[txt]) {
          el.textContent = VI_DICT[txt];
        } else if (/Hey .+, what should we build today\?/i.test(txt)) {
          const match = txt.match(/Hey (.+), what should we build today\?/i);
          const name = match ? match[1] : 'bạn';
          el.textContent = 'Chào ' + name + ', hôm nay chúng ta sẽ cùng tạo nên điều gì?';
        }
      });
    }

    translateStaticUI();
    setInterval(translateStaticUI, 1500);
  }

  function setupSettingsCustomizer() {
    function injectTab() {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return;

      if (dialog.querySelector('#agy-theme-studio-tab')) return;

      const buttons = Array.from(dialog.querySelectorAll('button, [role="tab"]'));
      const sampleBtn = buttons.find(b => /General|Cài đặt chung|Application|Giao diện/i.test(b.textContent));
      if (!sampleBtn || !sampleBtn.parentElement) return;

      const tabContainer = sampleBtn.parentElement;

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

        const previewStyle = currentWp ? ('background-image:url(\"' + currentWp + '\");') : '';
        const previewText = currentWp ? '' : 'Mặc định';

        customPanel.innerHTML = [
          '<div style="border-bottom:1px solid rgba(122,168,159,0.25); padding-bottom:14px; margin-bottom:18px;">',
          '  <h2 style="margin:0; font-size:18px; font-weight:600; color:#E6C384; display:flex; align-items:center; gap:8px;">',
          '    <span>🎨</span> Antigravity Theme Studio <span style="font-size:11px; padding:2px 8px; background:rgba(122,168,159,0.2); border-radius:10px; color:#7AA89F;">v2.1.0</span>',
          '  </h2>',
          '  <p style="margin:4px 0 0; font-size:12px; color:#A6A69C;">Tùy chỉnh hình nền, hiệu ứng kính mờ Acrylic Glassmorphism, giao diện và thú cưng.</p>',
          '</div>',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px; margin-bottom:16px;">',
          '  <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">',
          '    <span>🖼️</span> Hình nền tùy chỉnh (Custom Wallpaper)',
          '  </h3>',
          '  <div style="display:flex; gap:14px; align-items:center; margin-bottom:12px;">',
          '    <div id="agy-wp-preview" style="width:110px; height:68px; border-radius:6px; border:1px solid rgba(122,168,159,0.3); background-size:cover; background-position:center; background-color:#0d111a; display:flex; align-items:center; justify-content:center; color:#737C73; font-size:11px; ' + previewStyle + '">',
          '      ' + previewText,
          '    </div>',
          '    <div style="flex:1; display:flex; flex-direction:column; gap:6px;">',
          '      <label style="display:inline-flex; align-items:center; justify-content:center; gap:6px; background:#2D4F67; color:#EAE6D3; padding:7px 14px; border-radius:6px; font-size:12px; font-weight:500; cursor:pointer; width:fit-content;">',
          '        <span>📂 Chọn ảnh từ máy tính</span>',
          '        <input type="file" id="agy-wp-file-input" accept="image/*" style="display:none;" />',
          '      </label>',
          '      <button id="agy-wp-reset-btn" type="button" style="display:inline-flex; align-items:center; gap:6px; background:rgba(196,116,110,0.15); border:1px solid rgba(196,116,110,0.3); color:#E46876; padding:5px 12px; border-radius:6px; font-size:11px; cursor:pointer; width:fit-content;">',
          '        <span>🗑️ Xóa ảnh nền (về mặc định)</span>',
          '      </button>',
          '    </div>',
          '  </div>',
          '  <div style="display:flex; align-items:center; justify-content:space-between; font-size:12px; color:#C5C9C5;">',
          '    <span>Độ mờ tối của hình nền (Dim):</span>',
          '    <div style="display:flex; align-items:center; gap:8px;">',
          '      <input type="range" id="agy-wp-dim" min="0" max="80" value="' + currentDim + '" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />',
          '      <span id="agy-wp-dim-val" style="width:32px; text-align:right; font-family:monospace;">' + currentDim + '%</span>',
          '    </div>',
          '  </div>',
          '</div>',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px; margin-bottom:16px;">',
          '  <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">',
          '    <span>✨</span> Kính mờ Acrylic (Glassmorphism)',
          '  </h3>',
          '  <div style="display:flex; flex-direction:column; gap:12px; font-size:12px; color:#C5C9C5;">',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <span>Độ mờ kính (Acrylic Blur):</span>',
          '      <div style="display:flex; align-items:center; gap:8px;">',
          '        <input type="range" id="agy-glass-blur-slider" min="0" max="50" value="' + currentBlur + '" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />',
          '        <span id="agy-glass-blur-val" style="width:32px; text-align:right; font-family:monospace;">' + currentBlur + 'px</span>',
          '      </div>',
          '    </div>',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <span>Độ trong suốt thanh bên (Sidebar Opacity):</span>',
          '      <div style="display:flex; align-items:center; gap:8px;">',
          '        <input type="range" id="agy-sidebar-alpha-slider" min="15" max="85" value="' + currentAlpha + '" style="width:130px; accent-color:#7AA89F; cursor:pointer;" />',
          '        <span id="agy-sidebar-alpha-val" style="width:32px; text-align:right; font-family:monospace;">' + currentAlpha + '%</span>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</div>',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:10px; padding:16px;">',
          '  <h3 style="margin:0 0 10px; font-size:14px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:6px;">',
          '    <span>⚙️</span> Tiện ích nâng cao',
          '  </h3>',
          '  <div style="display:flex; flex-direction:column; gap:12px; font-size:12px; color:#C5C9C5;">',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <div>',
          '        <div style="font-weight:500; color:#EAE6D3;">🐱 Thú cưng Cyber-Cat</div>',
          '        <div style="font-size:11px; color:#8A8980;">Mèo neon có thể kéo thả tự do trên màn hình.</div>',
          '      </div>',
          '      <div style="display:flex; align-items:center; gap:8px;">',
          '        <button id="agy-cat-reset-btn" type="button" style="padding:3px 8px; font-size:11px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#EAE6D3; border-radius:4px; cursor:pointer;">Đặt lại vị trí</button>',
          '        <input type="checkbox" id="agy-cat-toggle" ' + (catEnabled ? 'checked' : '') + ' style="width:16px; height:16px; accent-color:#7AA89F; cursor:pointer;" />',
          '      </div>',
          '    </div>',
          '    <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">',
          '      <div>',
          '        <div style="font-weight:500; color:#EAE6D3;">🇻🇳 Giao diện Tiếng Việt</div>',
          '        <div style="font-size:11px; color:#8A8980;">Bật / Tắt dịch các nút bấm và menu sang tiếng Việt.</div>',
          '      </div>',
          '      <input type="checkbox" id="agy-vi-toggle" ' + (viEnabled ? 'checked' : '') + ' style="width:16px; height:16px; accent-color:#7AA89F; cursor:pointer;" />',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('');

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
        };
      }

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

    setInterval(injectTab, 1000);
  }

  runWhenAppReady();
  return 'installed';
})()`;
'''

target_str = "function attachPixelTheme(win) {"
if target_str in js_content:
    js_content = js_content.replace(target_str, ANTIGRAVITY_STUDIO_V21_JS + "\n\n" + target_str, 1)

cat_call = 'wc.executeJavaScript(CYBER_CAT_PET_JS, true).catch(() => {});'
if cat_call in js_content:
    safe_call = cat_call + '\n            // Safe Unified Theme & UI Enhancer (v2.1.0)\n            wc.executeJavaScript(ANTIGRAVITY_STUDIO_V21_JS, true).catch(() => {});'
    js_content = js_content.replace(cat_call, safe_call, 1)

with open(PIXEL_THEME_PATH, "w", encoding="utf-8") as f:
    f.write(js_content)

print("[Success] Re-injected ANTIGRAVITY_STUDIO_V21_JS without nested backticks!")
