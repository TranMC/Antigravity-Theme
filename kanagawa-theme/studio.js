(() => {
  if (window.__agy_studio_v22_loaded) return 'already-present';
  window.__agy_studio_v22_loaded = true;

  const PRESETS = {
    "kanagawa-wave": {
      name: "Kanagawa Wave",
      desc: "Mặc định Dark & Light",
      swatches: ["#131720", "#E6C384", "#7E9CD8", "#7AA89F"],
      agentAvatar: {
        bgStops: ["#FAF7E6", "#F6ECC9", "#EBE3CC"],
        iconStops: ["#1F6E97", "#285C84", "#0E3252"]
      },
      dark: {
        chromeBg: "#131720",
        surfaceBase: "#11161F",
        sidebarBase: "#0E121A",
        overlayBase: "#0F141D",
        scrimBase: "#0B0F17",
        accentBlue: "#7E9CD8",
        accentAqua: "#7AA89F",
        selection: "#2D4F67"
      },
      light: {
        chromeBg: "#E5DDB0",
        surfaceBase: "#F7F3D6",
        sidebarBase: "#EBE5C2",
        overlayBase: "#F2ECBC",
        scrimBase: "#F2ECBC",
        primary: "#43436C"
      }
    },
    "kanagawa-dragon": {
      name: "Kanagawa Dragon",
      desc: "Tối ấm áp & trầm mặc",
      swatches: ["#151412", "#C4B28A", "#8BA4B0", "#8EA4A2"],
      agentAvatar: {
        bgStops: ["#F3ECD8", "#E6D9B8", "#D8C89E"],
        iconStops: ["#8EA4A2", "#625E5A", "#1D1C19"]
      },
      dark: {
        chromeBg: "#151412",
        surfaceBase: "#181614",
        sidebarBase: "#131210",
        overlayBase: "#1A1815",
        scrimBase: "#100F0E",
        accentBlue: "#8BA4B0",
        accentAqua: "#8EA4A2",
        selection: "#2D4F67"
      },
      light: {
        chromeBg: "#E6DEC8",
        surfaceBase: "#F5EFE0",
        sidebarBase: "#EAE2CE",
        overlayBase: "#F3ECD8",
        scrimBase: "#F3ECD8",
        primary: "#4D699B"
      }
    },
    "sakura-dusk": {
      name: "Sakura Dusk",
      desc: "Hồng tím hoàng hôn",
      swatches: ["#171421", "#E6A9BD", "#A3B8EF", "#9CD5C9"],
      agentAvatar: {
        bgStops: ["#FCECF2", "#F7D9E4", "#ECC3D3"],
        iconStops: ["#957FB8", "#7E5A88", "#4A2E56"]
      },
      dark: {
        chromeBg: "#171421",
        surfaceBase: "#1B1626",
        sidebarBase: "#14101D",
        overlayBase: "#1D1729",
        scrimBase: "#120E1A",
        accentBlue: "#A3B8EF",
        accentAqua: "#9CD5C9",
        selection: "#47325C"
      },
      light: {
        chromeBg: "#F3E4EA",
        surfaceBase: "#FCF5F8",
        sidebarBase: "#F4E7EC",
        overlayBase: "#FAF0F4",
        scrimBase: "#FAF0F4",
        primary: "#7D486D"
      }
    },
    "midnight-aqua": {
      name: "Midnight Aqua",
      desc: "Xanh biển đêm sâu thẳm",
      swatches: ["#0D1520", "#73DACA", "#7AA2F7", "#7DCFFF"],
      agentAvatar: {
        bgStops: ["#E6F7F5", "#CBECE8", "#B4DFDA"],
        iconStops: ["#1E7898", "#185978", "#0B354D"]
      },
      dark: {
        chromeBg: "#0D1520",
        surfaceBase: "#0F1926",
        sidebarBase: "#0B121C",
        overlayBase: "#101B29",
        scrimBase: "#091019",
        accentBlue: "#7AA2F7",
        accentAqua: "#7DCFFF",
        selection: "#1E425E"
      },
      light: {
        chromeBg: "#DCECEF",
        surfaceBase: "#F3FAFB",
        sidebarBase: "#E3F0F3",
        overlayBase: "#EDF6F8",
        scrimBase: "#EDF6F8",
        primary: "#1C6B78"
      }
    },
    "catppuccin-mocha": {
      name: "Catppuccin Mocha",
      desc: "Tím pastel dịu mắt",
      swatches: ["#181825", "#CBA6F7", "#89B4FA", "#A6E3A1"],
      agentAvatar: {
        bgStops: ["#EFF1F5", "#E6E9EF", "#DCE0E8"],
        iconStops: ["#CBA6F7", "#89B4FA", "#74C7EC"]
      },
      dark: {
        chromeBg: "#181825",
        surfaceBase: "#1E1E2E",
        sidebarBase: "#181825",
        overlayBase: "#313244",
        scrimBase: "#11111B",
        accentBlue: "#89B4FA",
        accentAqua: "#94E2D5",
        selection: "#45475A"
      },
      light: {
        chromeBg: "#E6E9EF",
        surfaceBase: "#EFF1F5",
        sidebarBase: "#E6E9EF",
        overlayBase: "#FFFFFF",
        scrimBase: "#DCE0E8",
        primary: "#8839EF"
      }
    },
    "tokyo-night": {
      name: "Tokyo Night",
      desc: "Tokyo neon xanh tím",
      swatches: ["#16161E", "#7AA2F7", "#BB9AF7", "#73DACA"],
      agentAvatar: {
        bgStops: ["#E9EBF0", "#DDE0EA", "#D0D5E3"],
        iconStops: ["#7AA2F7", "#BB9AF7", "#2E7DE9"]
      },
      dark: {
        chromeBg: "#16161E",
        surfaceBase: "#1A1B26",
        sidebarBase: "#16161E",
        overlayBase: "#1F2335",
        scrimBase: "#13141C",
        accentBlue: "#7AA2F7",
        accentAqua: "#73DACA",
        selection: "#283457"
      },
      light: {
        chromeBg: "#D5D6DB",
        surfaceBase: "#F2F3F7",
        sidebarBase: "#E1E2E7",
        overlayBase: "#E9EBF0",
        scrimBase: "#D0D5E3",
        primary: "#2E7DE9"
      }
    },
    "nord": {
      name: "Nord",
      desc: "Băng tuyết Bắc Âu",
      swatches: ["#242933", "#88C0D0", "#81A1C1", "#A3BE8C"],
      agentAvatar: {
        bgStops: ["#ECEFF4", "#E5E9F0", "#D8DEE9"],
        iconStops: ["#88C0D0", "#81A1C1", "#5E81AC"]
      },
      dark: {
        chromeBg: "#242933",
        surfaceBase: "#2E3440",
        sidebarBase: "#242933",
        overlayBase: "#3B4252",
        scrimBase: "#1F232A",
        accentBlue: "#81A1C1",
        accentAqua: "#8FBCBB",
        selection: "#434C5E"
      },
      light: {
        chromeBg: "#D8DEE9",
        surfaceBase: "#F2F4F8",
        sidebarBase: "#E5E9F0",
        overlayBase: "#ECEFF4",
        scrimBase: "#D8DEE9",
        primary: "#5E81AC"
      }
    },
    "gruvbox-dark": {
      name: "Gruvbox Dark",
      desc: "Retro ấm áp cổ điển",
      swatches: ["#1D2021", "#FABD2F", "#83A598", "#B8BB26"],
      agentAvatar: {
        bgStops: ["#FBF1C7", "#EBDBB2", "#D5C4A1"],
        iconStops: ["#FABD2F", "#FE8019", "#AF3A03"]
      },
      dark: {
        chromeBg: "#1D2021",
        surfaceBase: "#282828",
        sidebarBase: "#1D2021",
        overlayBase: "#3C3836",
        scrimBase: "#141617",
        accentBlue: "#83A598",
        accentAqua: "#8EC07C",
        selection: "#504945"
      },
      light: {
        chromeBg: "#E0D3A8",
        surfaceBase: "#F9F5D7",
        sidebarBase: "#EFE4B8",
        overlayBase: "#FBF1C7",
        scrimBase: "#D5C4A1",
        primary: "#B57614"
      }
    },
    "dracula": {
      name: "Dracula",
      desc: "Gothic tím & hồng neon",
      swatches: ["#1E1F29", "#BD93F9", "#FF79C6", "#50FA7B"],
      agentAvatar: {
        bgStops: ["#F8F8F2", "#ECECF0", "#E0E1E7"],
        iconStops: ["#FF79C6", "#BD93F9", "#8BE9FD"]
      },
      dark: {
        chromeBg: "#1E1F29",
        surfaceBase: "#282A36",
        sidebarBase: "#21222C",
        overlayBase: "#343746",
        scrimBase: "#191A21",
        accentBlue: "#8BE9FD",
        accentAqua: "#8BE9FD",
        selection: "#44475A"
      },
      light: {
        chromeBg: "#EAE9E4",
        surfaceBase: "#FFFFFF",
        sidebarBase: "#F0F0F4",
        overlayBase: "#F8F8F2",
        scrimBase: "#E4E5EA",
        primary: "#7B5EA7"
      }
    }
  };

  const DEFAULT_FONT_STACK = '"Inter", "Google Sans", "Google Sans Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!m) return "20, 24, 32";
    const n = parseInt(m[1], 16);
    return ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255);
  }

  function buildGeminiStarSvgUrl(bgStops, iconStops) {
    const bg1 = bgStops[0] || "#FAF7E6";
    const bg2 = bgStops[1] || "#F6ECC9";
    const bg3 = bgStops[2] || "#EBE3CC";
    const ic1 = iconStops[0] || "#1F6E97";
    const ic2 = iconStops[1] || "#285C84";
    const ic3 = iconStops[2] || "#0E3252";
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<defs>' +
      '<radialGradient id="rb" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="' + bg1 + '" stop-opacity="0.95"/>' +
      '<stop offset="65%" stop-color="' + bg2 + '" stop-opacity="0.85"/>' +
      '<stop offset="100%" stop-color="' + bg3 + '" stop-opacity="0.75"/>' +
      '</radialGradient>' +
      '<linearGradient id="si" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + ic1 + '"/>' +
      '<stop offset="50%" stop-color="' + ic2 + '"/>' +
      '<stop offset="100%" stop-color="' + ic3 + '"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<circle cx="50" cy="50" r="46" fill="url(#rb)"/>' +
      '<path d="M50 16 C50 34 34 50 16 50 C34 50 50 66 50 84 C50 66 66 50 84 50 C66 50 50 34 50 16 Z" fill="url(#si)"/>' +
      '</svg>';
    return 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")';
  }

  function applyRuntimeTheme() {
    try {
      const presetKey = localStorage.getItem('agy_selected_preset');
      const preset = (presetKey && PRESETS[presetKey]) ? PRESETS[presetKey] : null;
      const savedWp = localStorage.getItem('agy_custom_wallpaper');
      const dim = localStorage.getItem('agy_wallpaper_dim') || '35';
      const blur = localStorage.getItem('agy_glass_blur') || '24';
      const rawAlpha = localStorage.getItem('agy_sidebar_alpha');
      const sidebarAlpha = (parseInt(rawAlpha || '44') / 100).toFixed(2);
      const font = localStorage.getItem('agy_font_family') || '';

      let style = document.getElementById('agy-runtime-theme-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'agy-runtime-theme-style';
        document.head.appendChild(style);
      }

      let css = `
:root {
  --agy-glass-blur: ${blur}px !important;
  ${rawAlpha ? `--agy-sidebar-alpha: ${sidebarAlpha} !important;` : ''}
}
`;

      if (preset) {
        const d = preset.dark;
        const l = preset.light;
        const dSurf = hexToRgb(d.surfaceBase);
        const dSide = hexToRgb(d.sidebarBase);
        const dOver = hexToRgb(d.overlayBase);
        const dScrim = hexToRgb(d.scrimBase);
        const dBlue = hexToRgb(d.accentBlue);
        const dAqua = hexToRgb(d.accentAqua);
        const dSel = hexToRgb(d.selection);

        const lSurf = hexToRgb(l.surfaceBase);
        const lSide = hexToRgb(l.sidebarBase);
        const lOver = hexToRgb(l.overlayBase);
        const lPri = hexToRgb(l.primary);

        css += `
html { background-color: ${d.chromeBg} !important; }

body:not(.theme-light),
body[data-agy-theme]:not(.theme-light),
body[data-agy-theme]:not(.theme-light) .agy-inset-shell {
  --sidebar: rgba(${dSide}, 0.64) !important;
  --sidebar-secondary: rgba(${dSel}, 0.72) !important;
  --card: rgba(${dSurf}, 0.68) !important;
  --card-border: rgba(${dBlue}, 0.16) !important;
  --card-edge: rgba(${dAqua}, 0.14) !important;
  --border: rgba(${dBlue}, 0.12) !important;
  --glass: rgba(${dSurf}, 0.80) !important;
  --glass-border: rgba(${dAqua}, 0.28) !important;
  --onyx-frame: rgba(${dOver}, 0.84) !important;
  --onyx-well: rgba(${dSel}, 0.45) !important;
  --onyx-raised: rgba(${dSurf}, 0.90) !important;
  --onyx-selected: rgba(${dSel}, 0.82) !important;
}

body:not(.theme-light):not([data-has-browser-hole="true"]) .browser-hole-ancestor[data-side-panel-focus-scope="true"]:not([data-has-browser-hole="true"]),
body:not(.theme-light) [data-main-content-body],
body:not(.theme-light) [role="navigation"][aria-label="Sidebar"],
body:not(.theme-light) [data-testid="conversation-list-sidebar"] {
  background-color: rgba(${dSide}, ${sidebarAlpha}) !important;
  border-color: rgba(${dAqua}, 0.18) !important;
}

body:not(.theme-light) .agy-overlay,
body:not(.theme-light) .surface-glass,
body:not(.theme-light) [role="dialog"],
body:not(.theme-light) [role="menu"],
body:not(.theme-light) [role="listbox"] {
  background-color: rgba(${dOver}, 0.96) !important;
  border-color: rgba(${dBlue}, 0.18) !important;
}

body.theme-light,
body.theme-light[data-agy-theme],
body.theme-light[data-agy-theme] .agy-inset-shell {
  --sidebar: rgba(${lSide}, 0.74) !important;
  --card: rgba(${lSurf}, 0.78) !important;
  --card-border: rgba(${lPri}, 0.14) !important;
  --card-edge: rgba(${lPri}, 0.12) !important;
  --border: rgba(${lPri}, 0.11) !important;
}
body.theme-light [role="navigation"][aria-label="Sidebar"],
body.theme-light [data-testid="conversation-list-sidebar"] {
  background-color: rgba(${lSide}, 0.88) !important;
}
body.theme-light .agy-overlay,
body.theme-light .surface-glass,
body.theme-light [role="dialog"],
body.theme-light [role="menu"],
body.theme-light [role="listbox"] {
  background-color: rgba(${lOver}, 0.96) !important;
}
`;

        if (!savedWp) {
          css += `
body:not(.theme-light)::before {
  background-color: ${d.chromeBg} !important;
  background-image:
    radial-gradient(48% 46% at 86% 18%, rgba(${dScrim}, 0.14) 0%, rgba(${dScrim}, 0.54) 100%),
    linear-gradient(108deg, rgba(${dScrim}, 0.56) 0%, rgba(${dScrim}, 0.40) 56%, rgba(${dScrim}, 0.22) 100%) !important;
}
body.theme-light::before {
  background-color: ${l.chromeBg} !important;
}
`;
        }

        if (preset.agentAvatar) {
          const starUrl = buildGeminiStarSvgUrl(preset.agentAvatar.bgStops, preset.agentAvatar.iconStops);
          css += `
[data-testid="agent-response"] div[class~="px-2"][class~="py-1"]:has(> [data-markdown-root])::before {
  background-image: ${starUrl} !important;
}
`;
        }
      }

      if (savedWp) {
        css += `
html::before {
  background-image: url("${savedWp}") !important;
  background-size: cover !important;
  background-position: center !important;
}
body:not(.theme-light)::before {
  background-color: rgba(10, 14, 22, ${parseInt(dim) / 100}) !important;
  background-image: none !important;
}
body.theme-light::before {
  background-color: rgba(255, 255, 255, ${parseInt(dim) / 100}) !important;
  background-image: none !important;
}
`;
      }

      if (font && font.trim() && !/^(DEFAULT|NONE|off|false)$/i.test(font.trim())) {
        const cleanFont = font.trim().replace(/^["']|["']$/g, '');
        css += `
:root {
  --font-family: "${cleanFont}", ${DEFAULT_FONT_STACK} !important;
  --agy-font-family: "${cleanFont}", ${DEFAULT_FONT_STACK} !important;
}
body, input, textarea, select, button, [data-markdown-root] {
  font-family: "${cleanFont}", ${DEFAULT_FONT_STACK} !important;
}
`;
      } else {
        css += `
:root {
  --font-family: ${DEFAULT_FONT_STACK} !important;
  --agy-font-family: ${DEFAULT_FONT_STACK} !important;
}
body, input, textarea, select, button, [data-markdown-root] {
  font-family: ${DEFAULT_FONT_STACK} !important;
}
`;
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
      "No conversations yet": "Chưa có cuộc trò chuyện",
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
      "Review": "Xem lại",
      "Working": "Đang xử lý",
      "Working...": "Đang xử lý...",
      "Thinking": "Đang suy nghĩ",
      "Thinking...": "Đang suy nghĩ..."
    };

    function translateStaticUI() {
      if (localStorage.getItem('agy_vietnamese_enabled') === 'false') return;

      document.querySelectorAll('textarea[placeholder], input[placeholder]').forEach(input => {
        if (input.placeholder && input.placeholder.includes('Ask anything')) {
          input.placeholder = 'Hỏi bất kỳ điều gì, @ để gắn thẻ, / cho hành động';
        }
      });

      document.querySelectorAll('[data-placeholder]').forEach(el => {
        const dp = el.getAttribute('data-placeholder');
        if (dp && dp.includes('Ask anything')) {
          el.setAttribute('data-placeholder', 'Hỏi bất kỳ điều gì, @ để gắn thẻ, / cho hành động');
        }
      });

      const elements = document.querySelectorAll(
        '[data-testid="conversation-list-sidebar"] span, [data-testid="conversation-list-sidebar"] div, [data-testid="conversation-list-sidebar"] button, ' +
        'div[role="navigation"] span, div[role="navigation"] div, div[role="navigation"] button, ' +
        '[role="dialog"] span, [role="dialog"] div, [role="dialog"] button, [role="dialog"] h2, [role="dialog"] h3, ' +
        '[data-main-content-header] span, [data-main-content-body] span'
      );
      elements.forEach(el => {
        if (el.children.length > 0) return;
        if (el.closest('.monaco-editor, pre, code, .xterm, [data-markdown-root]')) return;
        const txt = el.textContent ? el.textContent.trim() : '';
        if (!txt) return;
        if (VI_DICT[txt]) {
          el.textContent = VI_DICT[txt];
        } else if (/^Ask anything, @ to mention/i.test(txt)) {
          el.textContent = 'Hỏi bất kỳ điều gì, @ để gắn thẻ, / cho hành động';
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
      const sampleBtn = buttons.find(b => /Browser|Trình duyệt|Models|Mô hình AI|Shortcuts|Phím tắt/i.test(b.textContent))
        || buttons.find(b => /General|Cài đặt chung|Application|Giao diện/i.test(b.textContent));
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
        customPanel.style.cssText = 'display:none; width:100%; height:100%; flex:1; background:#121622 !important; color:#EAE6D3; padding:24px 28px; border-radius:12px; overflow-y:auto; box-sizing:border-box; font-family:' + DEFAULT_FONT_STACK + '; z-index:10;';

        const currentPreset = localStorage.getItem('agy_selected_preset') || 'kanagawa-wave';
        const currentFont = localStorage.getItem('agy_font_family') || '';
        const currentWp = localStorage.getItem('agy_custom_wallpaper') || '';
        const currentDim = localStorage.getItem('agy_wallpaper_dim') || '35';
        const currentBlur = localStorage.getItem('agy_glass_blur') || '24';
        const currentAlpha = localStorage.getItem('agy_sidebar_alpha') || '44';
        const catEnabled = localStorage.getItem('antigravity_cat_enabled') !== 'false';
        const viEnabled = localStorage.getItem('agy_vietnamese_enabled') !== 'false';

        // Render Preset Grid HTML
        const presetCardsHtml = Object.entries(PRESETS).map(([id, p]) => {
          const isSelected = (id === currentPreset);
          const swatchesHtml = p.swatches.map(c =>
            `<span style="display:inline-block; width:14px; height:14px; border-radius:50%; background:${c}; border:1px solid rgba(255,255,255,0.2);"></span>`
          ).join('');

          const borderCol = isSelected ? '#E6C384' : 'rgba(122,168,159,0.2)';
          const bgCol = isSelected ? 'rgba(230,195,132,0.12)' : 'rgba(20,26,38,0.6)';
          const badgeHtml = isSelected
            ? '<span style="font-size:11px; font-weight:600; color:#E6C384; background:rgba(230,195,132,0.2); padding:2px 6px; border-radius:6px;">✓ Đang dùng</span>'
            : '';

          return `
<div class="agy-preset-card" data-preset-id="${id}" style="border:2px solid ${borderCol}; background:${bgCol}; border-radius:10px; padding:14px; cursor:pointer; transition:all 0.15s ease; display:flex; flex-direction:column; justify-content:space-between; min-height:88px;">
  <div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
      <span style="font-weight:600; font-size:14px; color:${isSelected ? '#E6C384' : '#EAE6D3'};">${p.name}</span>
      <div class="agy-card-badge">${badgeHtml}</div>
    </div>
    <div style="font-size:11px; color:#A6A69C; margin-bottom:10px;">${p.desc}</div>
  </div>
  <div style="display:flex; gap:6px; align-items:center;">
    ${swatchesHtml}
  </div>
</div>
`;
        }).join('');

        // Render Font Pills HTML
        const fontList = [
          { label: "Mặc định", val: "DEFAULT" },
          { label: "JetBrains Mono", val: "JetBrains Mono" },
          { label: "Fira Code", val: "Fira Code" },
          { label: "Cascadia Code", val: "Cascadia Code" },
          { label: "Inter", val: "Inter" },
          { label: "Consolas", val: "Consolas" }
        ];

        const fontPillsHtml = fontList.map(f => {
          const isAct = (currentFont === f.val) || (!currentFont && f.val === 'DEFAULT');
          const bg = isAct ? '#2D4F67' : 'rgba(255,255,255,0.06)';
          const border = isAct ? '#7AA89F' : 'rgba(255,255,255,0.12)';
          const col = isAct ? '#EAE6D3' : '#A6A69C';
          return `<button type="button" class="agy-font-pill" data-font="${f.val}" style="padding:6px 12px; border-radius:8px; font-size:12px; font-weight:500; cursor:pointer; background:${bg}; border:1px solid ${border}; color:${col}; transition:all 0.15s;">${f.label}</button>`;
        }).join('');

        const previewStyle = currentWp ? ('background-image:url(\"' + currentWp + '\");') : '';
        const previewText = currentWp ? '' : 'Mặc định';

        customPanel.innerHTML = [
          '<div style="border-bottom:1px solid rgba(122,168,159,0.25); padding-bottom:16px; margin-bottom:20px;">',
          '  <h2 style="margin:0; font-size:20px; font-weight:600; color:#E6C384; display:flex; align-items:center; gap:10px;">',
          '    <span>🎨</span> Antigravity Theme Studio <span style="font-size:11px; padding:2px 8px; background:rgba(122,168,159,0.2); border-radius:10px; color:#7AA89F;">v2.3.0</span>',
          '  </h2>',
          '  <p style="margin:6px 0 0; font-size:13px; color:#A6A69C;">Chọn bảng màu preset, font chữ, độ mờ kính Acrylic và hình nền trực tiếp — áp dụng ngay tức thì không cần khởi động lại.</p>',
          '</div>',

          '<!-- Mục 1: Bộ 9 Preset Màu Trực Quan -->',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:12px; padding:20px; margin-bottom:20px;">',
          '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">',
          '    <h3 style="margin:0; font-size:15px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:8px;">',
          '      <span>🎨</span> Bảng Preset Màu (Click chọn đổi màu ngay)',
          '    </h3>',
          '    <button type="button" id="agy-preset-reset-cli-btn" style="padding:4px 10px; font-size:11px; background:rgba(122,168,159,0.15); border:1px solid rgba(122,168,159,0.35); color:#EAE6D3; border-radius:6px; cursor:pointer;">🔄 Theo cấu hình CLI</button>',
          '  </div>',
          '  <div id="agy-preset-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:12px;">',
          '    ' + presetCardsHtml,
          '  </div>',
          '</div>',

          '<!-- Mục 2: Font chữ giao diện -->',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:12px; padding:20px; margin-bottom:20px;">',
          '  <h3 style="margin:0 0 12px; font-size:15px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:8px;">',
          '    <span>🔤</span> Font chữ giao diện (Font Family)',
          '  </h3>',
          '  <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:12px;">',
          '    ' + fontPillsHtml,
          '  </div>',
          '  <div style="display:flex; gap:10px; align-items:center;">',
          '    <input type="text" id="agy-custom-font-input" placeholder="Hoặc nhập tên font cài trên máy (vd: Roboto Mono, Consolas)..." value="' + (currentFont && currentFont !== 'DEFAULT' ? currentFont : '') + '" style="flex:1; background:rgba(0,0,0,0.3); border:1px solid rgba(122,168,159,0.3); color:#EAE6D3; padding:8px 12px; border-radius:8px; font-size:12px;" />',
          '    <button type="button" id="agy-custom-font-apply-btn" style="padding:8px 14px; font-size:12px; background:#2D4F67; border:none; color:#EAE6D3; border-radius:8px; cursor:pointer;">Áp dụng Font</button>',
          '  </div>',
          '</div>',

          '<!-- Mục 3: Acrylic Glassmorphism & Độ mờ UI -->',
          '<div style="background:rgba(20,26,38,0.7); border:1px solid rgba(122,168,159,0.18); border-radius:12px; padding:20px; margin-bottom:20px;">',
          '  <h3 style="margin:0 0 14px; font-size:15px; font-weight:600; color:#7AA89F; display:flex; align-items:center; gap:8px;">',
          '    <span>✨</span> Kính mờ Acrylic & Độ mờ Panel (Glassmorphism)',
          '  </h3>',
          '  <div style="display:flex; flex-direction:column; gap:16px; font-size:13px; color:#C5C9C5;">',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <span>Độ mờ kính Acrylic (Acrylic Blur):</span>',
          '      <div style="display:flex; align-items:center; gap:12px;">',
          '        <input type="range" id="agy-glass-blur-slider" min="0" max="50" value="' + currentBlur + '" style="width:160px; accent-color:#7AA89F; cursor:pointer;" />',
          '        <span id="agy-glass-blur-val" style="width:36px; text-align:right; font-family:monospace;">' + currentBlur + 'px</span>',
          '      </div>',
          '    </div>',
          '    <div style="display:flex; align-items:center; justify-content:space-between;">',
          '      <span>Độ trong suốt thanh bên (Sidebar Opacity):</span>',
          '      <div style="display:flex; align-items:center; gap:12px;">',
          '        <input type="range" id="agy-sidebar-alpha-slider" min="15" max="95" value="' + currentAlpha + '" style="width:160px; accent-color:#7AA89F; cursor:pointer;" />',
          '        <span id="agy-sidebar-alpha-val" style="width:36px; text-align:right; font-family:monospace;">' + currentAlpha + '%</span>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</div>',

          '<!-- Mục 4: Hình nền tùy chỉnh -->',
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
          '        <span>🗑️ Xóa ảnh nền (về màu preset)</span>',
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

          '<!-- Mục 5: Tiện ích -->',
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

      // 4. Bind Events for Presets, Fonts, Sliders, Wallpaper, Pet
      const presetCards = customPanel.querySelectorAll('.agy-preset-card');
      const presetResetCliBtn = customPanel.querySelector('#agy-preset-reset-cli-btn');

      if (presetResetCliBtn) {
        presetResetCliBtn.onclick = () => {
          localStorage.removeItem('agy_selected_preset');
          presetCards.forEach(c => {
            const isDef = (c.getAttribute('data-preset-id') === 'kanagawa-wave');
            c.style.border = isDef ? '2px solid #7AA89F' : '2px solid rgba(122,168,159,0.2)';
            c.style.background = isDef ? 'rgba(122,168,159,0.12)' : 'rgba(20,26,38,0.6)';
            const titleSpan = c.querySelector('span');
            if (titleSpan) titleSpan.style.color = isDef ? '#7AA89F' : '#EAE6D3';
            const badgeDiv = c.querySelector('.agy-card-badge');
            if (badgeDiv) {
              badgeDiv.innerHTML = isDef
                ? '<span style="font-size:11px; font-weight:600; color:#7AA89F; background:rgba(122,168,159,0.2); padding:2px 6px; border-radius:6px;">✓ Theo CLI</span>'
                : '';
            }
          });
          applyRuntimeTheme();
        };
      }

      presetCards.forEach(card => {
        card.onclick = () => {
          const id = card.getAttribute('data-preset-id');
          if (!id) return;
          localStorage.setItem('agy_selected_preset', id);

          // Update active card styling
          presetCards.forEach(c => {
            const isThis = (c === card);
            c.style.border = isThis ? '2px solid #E6C384' : '2px solid rgba(122,168,159,0.2)';
            c.style.background = isThis ? 'rgba(230,195,132,0.12)' : 'rgba(20,26,38,0.6)';
            const titleSpan = c.querySelector('span');
            if (titleSpan) titleSpan.style.color = isThis ? '#E6C384' : '#EAE6D3';
            const badgeDiv = c.querySelector('.agy-card-badge');
            if (badgeDiv) {
              badgeDiv.innerHTML = isThis
                ? '<span style="font-size:11px; font-weight:600; color:#E6C384; background:rgba(230,195,132,0.2); padding:2px 6px; border-radius:6px;">✓ Đang dùng</span>'
                : '';
            }
          });

          applyRuntimeTheme();
        };
      });

      // Bind Font Pills
      const fontPills = customPanel.querySelectorAll('.agy-font-pill');
      const fontInput = customPanel.querySelector('#agy-custom-font-input');
      const fontApplyBtn = customPanel.querySelector('#agy-custom-font-apply-btn');

      fontPills.forEach(pill => {
        pill.onclick = () => {
          const f = pill.getAttribute('data-font');
          localStorage.setItem('agy_font_family', f);
          fontPills.forEach(p => {
            const isThis = (p === pill);
            p.style.background = isThis ? '#2D4F67' : 'rgba(255,255,255,0.06)';
            p.style.borderColor = isThis ? '#7AA89F' : 'rgba(255,255,255,0.12)';
            p.style.color = isThis ? '#EAE6D3' : '#A6A69C';
          });
          if (fontInput) fontInput.value = (f === 'DEFAULT' ? '' : f);
          applyRuntimeTheme();
        };
      });

      if (fontApplyBtn && fontInput) {
        fontApplyBtn.onclick = () => {
          const customF = fontInput.value.trim();
          if (customF) {
            localStorage.setItem('agy_font_family', customF);
            fontPills.forEach(p => {
              p.style.background = 'rgba(255,255,255,0.06)';
              p.style.borderColor = 'rgba(255,255,255,0.12)';
              p.style.color = '#A6A69C';
            });
            applyRuntimeTheme();
          }
        };
      }

      // Wallpaper
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
            b.style.setProperty('background', 'transparent', 'important');
            b.style.setProperty('background-color', 'transparent', 'important');
            b.style.fontWeight = 'normal';
          });
          themeTab.style.setProperty('background', 'rgba(122,168,159,0.22)', 'important');
          themeTab.style.setProperty('background-color', 'rgba(122,168,159,0.22)', 'important');
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
          tabContainer.querySelectorAll('button, [role="tab"]').forEach(b => {
            if (b !== themeTab) {
              b.style.removeProperty('background');
              b.style.removeProperty('background-color');
            }
          });
          themeTab.style.setProperty('background', 'transparent', 'important');
          themeTab.style.setProperty('background-color', 'transparent', 'important');
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
  }

  runWhenAppReady();
  return 'installed';
})();
