#!/usr/bin/env node
/**
 * Builds and updates kanagawa-theme/kanagawa.css and kanagawa-theme/loading.html
 * from kanagawa-theme/kanagawa.config.json (plus optional CLI overrides).
 */
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const THEME_DIR = path.join(REPO_ROOT, "kanagawa-theme");
const CONFIG_PATH = path.join(THEME_DIR, "kanagawa.config.json");
const CSS_PATH = path.join(THEME_DIR, "kanagawa.css");
const LOADING_PATH = path.join(THEME_DIR, "loading.html");
const PROFILES_DIR = path.join(THEME_DIR, "profiles");

const PRESETS = {
  "kanagawa-wave": {
    agentAvatar: {
      bgStops: ["#FAF7E6", "#F6ECC9", "#EBE3CC"],
      iconStops: ["#1F6E97", "#285C84", "#0E3252"],
    },
    dark: {
      chromeBg: "#131720",
      chromeFg: "#EAE6D3",
      primary: "#E6C384",
      accentBlue: "#7E9CD8",
      accentAqua: "#7AA89F",
      accentGreen: "#98BB6C",
      accentPink: "#D27E99",
      accentViolet: "#957FB8",
      accentOrange: "#FFA066",
      text: "#EAE6D3",
      textMuted: "#CFC8A3",
      textSubtle: "#8A8980",
      surfaceBase: "#11161F",
      sidebarBase: "#0E121A",
      overlayBase: "#0F141D",
      scrimBase: "#0B0F17",
      selection: "#2D4F67",
    },
    light: {
      chromeBg: "#E5DDB0",
      chromeFg: "#3E3E4C",
      primary: "#43436C",
      text: "#3E3E4C",
      textMuted: "#625F53",
      paper0: "#D5CEA3",
      paper1: "#DCD5AC",
      paper2: "#E5DDB0",
      paper3: "#F2ECBC",
      surfaceBase: "#F7F3D6",
      sidebarBase: "#EBE5C2",
      overlayBase: "#F2ECBC",
      scrimBase: "#F2ECBC",
    },
  },
  "kanagawa-dragon": {
    agentAvatar: {
      bgStops: ["#F3ECD8", "#E6D9B8", "#D8C89E"],
      iconStops: ["#8EA4A2", "#625E5A", "#1D1C19"],
    },
    dark: {
      chromeBg: "#151412",
      chromeFg: "#C5C9C5",
      primary: "#C4B28A",
      accentBlue: "#8BA4B0",
      accentAqua: "#8EA4A2",
      accentGreen: "#87A987",
      accentPink: "#C4746E",
      accentViolet: "#8992A7",
      accentOrange: "#B6927B",
      text: "#C5C9C5",
      textMuted: "#A6A69C",
      textSubtle: "#737C73",
      surfaceBase: "#181614",
      sidebarBase: "#131210",
      overlayBase: "#1A1815",
      scrimBase: "#100F0E",
      selection: "#2D4F67",
    },
    light: {
      chromeBg: "#E6DEC8",
      chromeFg: "#3A3832",
      primary: "#4D699B",
      text: "#3A3832",
      textMuted: "#686459",
      paper0: "#D2C9AE",
      paper1: "#DCD4BC",
      paper2: "#E6DEC8",
      paper3: "#F3ECD8",
      surfaceBase: "#F5EFE0",
      sidebarBase: "#EAE2CE",
      overlayBase: "#F3ECD8",
      scrimBase: "#F3ECD8",
    },
  },
  "sakura-dusk": {
    agentAvatar: {
      bgStops: ["#FCECF2", "#F7D9E4", "#ECC3D3"],
      iconStops: ["#957FB8", "#7E5A88", "#4A2E56"],
    },
    dark: {
      chromeBg: "#171421",
      chromeFg: "#F1E8EE",
      primary: "#E6A9BD",
      accentBlue: "#A3B8EF",
      accentAqua: "#9CD5C9",
      accentGreen: "#A7C986",
      accentPink: "#D27E99",
      accentViolet: "#B69EE0",
      accentOrange: "#F3AE82",
      text: "#F1E8EE",
      textMuted: "#D4C3CF",
      textSubtle: "#8E7E8B",
      surfaceBase: "#1B1626",
      sidebarBase: "#14101D",
      overlayBase: "#1D1729",
      scrimBase: "#120E1A",
      selection: "#47325C",
    },
    light: {
      chromeBg: "#F3E4EA",
      chromeFg: "#3E3442",
      primary: "#7D486D",
      text: "#3E3442",
      textMuted: "#6F5F6D",
      paper0: "#E4CED7",
      paper1: "#ECD9E1",
      paper2: "#F3E4EA",
      paper3: "#FAF0F4",
      surfaceBase: "#FCF5F8",
      sidebarBase: "#F4E7EC",
      overlayBase: "#FAF0F4",
      scrimBase: "#FAF0F4",
    },
  },
  "midnight-aqua": {
    agentAvatar: {
      bgStops: ["#E6F7F5", "#CBECE8", "#B4DFDA"],
      iconStops: ["#1E7898", "#185978", "#0B354D"],
    },
    dark: {
      chromeBg: "#0D1520",
      chromeFg: "#E1EEF4",
      primary: "#73DACA",
      accentBlue: "#7AA2F7",
      accentAqua: "#7DCFFF",
      accentGreen: "#9ECE6A",
      accentPink: "#F7768E",
      accentViolet: "#BB9AF7",
      accentOrange: "#FF9E64",
      text: "#E1EEF4",
      textMuted: "#B7CBD9",
      textSubtle: "#6E8599",
      surfaceBase: "#0F1926",
      sidebarBase: "#0B121C",
      overlayBase: "#101B29",
      scrimBase: "#091019",
      selection: "#1E425E",
    },
    light: {
      chromeBg: "#DCECEF",
      chromeFg: "#243746",
      primary: "#1C6B78",
      text: "#243746",
      textMuted: "#516978",
      paper0: "#C5DDE2",
      paper1: "#D1E5E9",
      paper2: "#DCECEF",
      paper3: "#EDF6F8",
      surfaceBase: "#F3FAFB",
      sidebarBase: "#E3F0F3",
      overlayBase: "#EDF6F8",
      scrimBase: "#EDF6F8",
    },
  },
  "catppuccin-mocha": {
    agentAvatar: {
      bgStops: ["#EFF1F5", "#E6E9EF", "#DCE0E8"],
      iconStops: ["#CBA6F7", "#89B4FA", "#74C7EC"],
    },
    dark: {
      chromeBg: "#181825",
      chromeFg: "#CDD6F4",
      primary: "#CBA6F7",
      accentBlue: "#89B4FA",
      accentAqua: "#94E2D5",
      accentGreen: "#A6E3A1",
      accentPink: "#F5C2E7",
      accentViolet: "#CBA6F7",
      accentOrange: "#FAB387",
      text: "#CDD6F4",
      textMuted: "#A6ADC8",
      textSubtle: "#6C7086",
      surfaceBase: "#1E1E2E",
      sidebarBase: "#181825",
      overlayBase: "#313244",
      scrimBase: "#11111B",
      selection: "#45475A",
    },
    light: {
      chromeBg: "#E6E9EF",
      chromeFg: "#4C4F69",
      primary: "#8839EF",
      text: "#4C4F69",
      textMuted: "#6C6F85",
      paper0: "#CCD0DA",
      paper1: "#DCE0E8",
      paper2: "#E6E9EF",
      paper3: "#EFF1F5",
      surfaceBase: "#EFF1F5",
      sidebarBase: "#E6E9EF",
      overlayBase: "#FFFFFF",
      scrimBase: "#DCE0E8",
    },
  },
  "catppuccin": {
    agentAvatar: {
      bgStops: ["#EFF1F5", "#E6E9EF", "#DCE0E8"],
      iconStops: ["#CBA6F7", "#89B4FA", "#74C7EC"],
    },
    dark: {
      chromeBg: "#181825",
      chromeFg: "#CDD6F4",
      primary: "#CBA6F7",
      accentBlue: "#89B4FA",
      accentAqua: "#94E2D5",
      accentGreen: "#A6E3A1",
      accentPink: "#F5C2E7",
      accentViolet: "#CBA6F7",
      accentOrange: "#FAB387",
      text: "#CDD6F4",
      textMuted: "#A6ADC8",
      textSubtle: "#6C7086",
      surfaceBase: "#1E1E2E",
      sidebarBase: "#181825",
      overlayBase: "#313244",
      scrimBase: "#11111B",
      selection: "#45475A",
    },
    light: {
      chromeBg: "#E6E9EF",
      chromeFg: "#4C4F69",
      primary: "#8839EF",
      text: "#4C4F69",
      textMuted: "#6C6F85",
      paper0: "#CCD0DA",
      paper1: "#DCE0E8",
      paper2: "#E6E9EF",
      paper3: "#EFF1F5",
      surfaceBase: "#EFF1F5",
      sidebarBase: "#E6E9EF",
      overlayBase: "#FFFFFF",
      scrimBase: "#DCE0E8",
    },
  },
  "tokyo-night": {
    agentAvatar: {
      bgStops: ["#E9EBF0", "#DDE0EA", "#D0D5E3"],
      iconStops: ["#7AA2F7", "#BB9AF7", "#2E7DE9"],
    },
    dark: {
      chromeBg: "#16161E",
      chromeFg: "#C0CAF5",
      primary: "#7AA2F7",
      accentBlue: "#7AA2F7",
      accentAqua: "#73DACA",
      accentGreen: "#9ECE6A",
      accentPink: "#F7768E",
      accentViolet: "#BB9AF7",
      accentOrange: "#FF9E64",
      text: "#C0CAF5",
      textMuted: "#9AA5CE",
      textSubtle: "#565F89",
      surfaceBase: "#1A1B26",
      sidebarBase: "#16161E",
      overlayBase: "#1F2335",
      scrimBase: "#13141C",
      selection: "#283457",
    },
    light: {
      chromeBg: "#D5D6DB",
      chromeFg: "#343B58",
      primary: "#2E7DE9",
      text: "#343B58",
      textMuted: "#6172B0",
      paper0: "#C4C8D4",
      paper1: "#D0D5E3",
      paper2: "#DDE0EA",
      paper3: "#E9EBF0",
      surfaceBase: "#F2F3F7",
      sidebarBase: "#E1E2E7",
      overlayBase: "#E9EBF0",
      scrimBase: "#D0D5E3",
    },
  },
  "nord": {
    agentAvatar: {
      bgStops: ["#ECEFF4", "#E5E9F0", "#D8DEE9"],
      iconStops: ["#88C0D0", "#81A1C1", "#5E81AC"],
    },
    dark: {
      chromeBg: "#242933",
      chromeFg: "#ECEFF4",
      primary: "#88C0D0",
      accentBlue: "#81A1C1",
      accentAqua: "#8FBCBB",
      accentGreen: "#A3BE8C",
      accentPink: "#BF616A",
      accentViolet: "#B48EAD",
      accentOrange: "#D08770",
      text: "#ECEFF4",
      textMuted: "#D8DEE9",
      textSubtle: "#4C566A",
      surfaceBase: "#2E3440",
      sidebarBase: "#242933",
      overlayBase: "#3B4252",
      scrimBase: "#1F232A",
      selection: "#434C5E",
    },
    light: {
      chromeBg: "#D8DEE9",
      chromeFg: "#2E3440",
      primary: "#5E81AC",
      text: "#2E3440",
      textMuted: "#4C566A",
      paper0: "#C2D0DC",
      paper1: "#D8DEE9",
      paper2: "#E5E9F0",
      paper3: "#ECEFF4",
      surfaceBase: "#F2F4F8",
      sidebarBase: "#E5E9F0",
      overlayBase: "#ECEFF4",
      scrimBase: "#D8DEE9",
    },
  },
  "gruvbox-dark": {
    agentAvatar: {
      bgStops: ["#FBF1C7", "#EBDBB2", "#D5C4A1"],
      iconStops: ["#FABD2F", "#FE8019", "#AF3A03"],
    },
    dark: {
      chromeBg: "#1D2021",
      chromeFg: "#EBDBB2",
      primary: "#FABD2F",
      accentBlue: "#83A598",
      accentAqua: "#8EC07C",
      accentGreen: "#B8BB26",
      accentPink: "#D3869B",
      accentViolet: "#D3869B",
      accentOrange: "#FE8019",
      text: "#EBDBB2",
      textMuted: "#BDAE93",
      textSubtle: "#928374",
      surfaceBase: "#282828",
      sidebarBase: "#1D2021",
      overlayBase: "#3C3836",
      scrimBase: "#141617",
      selection: "#504945",
    },
    light: {
      chromeBg: "#E0D3A8",
      chromeFg: "#3C3836",
      primary: "#B57614",
      text: "#3C3836",
      textMuted: "#7C6F64",
      paper0: "#D5C4A1",
      paper1: "#EBDBB2",
      paper2: "#F2E5BC",
      paper3: "#FBF1C7",
      surfaceBase: "#F9F5D7",
      sidebarBase: "#EFE4B8",
      overlayBase: "#FBF1C7",
      scrimBase: "#D5C4A1",
    },
  },
  "gruvbox": {
    agentAvatar: {
      bgStops: ["#FBF1C7", "#EBDBB2", "#D5C4A1"],
      iconStops: ["#FABD2F", "#FE8019", "#AF3A03"],
    },
    dark: {
      chromeBg: "#1D2021",
      chromeFg: "#EBDBB2",
      primary: "#FABD2F",
      accentBlue: "#83A598",
      accentAqua: "#8EC07C",
      accentGreen: "#B8BB26",
      accentPink: "#D3869B",
      accentViolet: "#D3869B",
      accentOrange: "#FE8019",
      text: "#EBDBB2",
      textMuted: "#BDAE93",
      textSubtle: "#928374",
      surfaceBase: "#282828",
      sidebarBase: "#1D2021",
      overlayBase: "#3C3836",
      scrimBase: "#141617",
      selection: "#504945",
    },
    light: {
      chromeBg: "#E0D3A8",
      chromeFg: "#3C3836",
      primary: "#B57614",
      text: "#3C3836",
      textMuted: "#7C6F64",
      paper0: "#D5C4A1",
      paper1: "#EBDBB2",
      paper2: "#F2E5BC",
      paper3: "#FBF1C7",
      surfaceBase: "#F9F5D7",
      sidebarBase: "#EFE4B8",
      overlayBase: "#FBF1C7",
      scrimBase: "#D5C4A1",
    },
  },
  "dracula": {
    agentAvatar: {
      bgStops: ["#F8F8F2", "#ECECF0", "#E0E1E7"],
      iconStops: ["#FF79C6", "#BD93F9", "#8BE9FD"],
    },
    dark: {
      chromeBg: "#1E1F29",
      chromeFg: "#F8F8F2",
      primary: "#BD93F9",
      accentBlue: "#8BE9FD",
      accentAqua: "#8BE9FD",
      accentGreen: "#50FA7B",
      accentPink: "#FF79C6",
      accentViolet: "#BD93F9",
      accentOrange: "#FFB86C",
      text: "#F8F8F2",
      textMuted: "#BDC3D4",
      textSubtle: "#6272A4",
      surfaceBase: "#282A36",
      sidebarBase: "#21222C",
      overlayBase: "#343746",
      scrimBase: "#191A21",
      selection: "#44475A",
    },
    light: {
      chromeBg: "#EAE9E4",
      chromeFg: "#282A36",
      primary: "#7B5EA7",
      text: "#282A36",
      textMuted: "#6272A4",
      paper0: "#D2D3DA",
      paper1: "#E0E1E7",
      paper2: "#ECECF0",
      paper3: "#F8F8F2",
      surfaceBase: "#FFFFFF",
      sidebarBase: "#F0F0F4",
      overlayBase: "#F8F8F2",
      scrimBase: "#E4E5EA",
    },
  },
};

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function sanitizeProfileName(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Profile name must be a non-empty string");
  }
  const clean = name.trim().replace(/\.json$/i, "");
  if (!/^[a-zA-Z0-9_-]+$/.test(clean)) {
    throw new Error(`Invalid profile name "${name}". Use only letters, numbers, hyphens, and underscores.`);
  }
  return clean;
}

function resolveAssetPath(p) {
  if (!p || /^(KEEP_EMBEDDED|SVG_STAR|NONE|off|false)$/i.test(String(p).trim())) return null;
  if (/^data:|^url\(/i.test(p)) return p;
  return path.isAbsolute(p) ? p : path.resolve(THEME_DIR, p);
}

function fileToDataUrl(filePath) {
  if (/^data:/i.test(filePath)) return `url("${filePath}")`;
  if (/^url\(/i.test(filePath)) return filePath;
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image file not found: ${filePath}`);
  }
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_MAP[ext];
  if (!mime) {
    throw new Error(`Unsupported image extension "${ext}" for ${filePath}`);
  }
  const raw = fs.readFileSync(filePath);
  if (ext === ".svg") {
    return `url("data:image/svg+xml,${encodeURIComponent(raw.toString("utf8"))}")`;
  }
  return `url("data:${mime};base64,${raw.toString("base64")}")`;
}

function buildGeminiStarSvgUrl(bgStops, iconStops) {
  const [b0, b1, b2] = bgStops && bgStops.length >= 3 ? bgStops : ["#FAF7E6", "#F6ECC9", "#EBE3CC"];
  const [i0, i1, i2] = iconStops && iconStops.length >= 3 ? iconStops : ["#1F6E97", "#285C84", "#0E3252"];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36">` +
    `<defs>` +
    `<linearGradient id="kbg" x1="0%" y1="0%" x2="100%" y2="100%">` +
    `<stop offset="0%" stop-color="${b0}"/><stop offset="55%" stop-color="${b1}"/><stop offset="100%" stop-color="${b2}"/>` +
    `</linearGradient>` +
    `<linearGradient id="kgem" x1="15%" y1="15%" x2="85%" y2="85%">` +
    `<stop offset="0%" stop-color="${i0}"/><stop offset="52%" stop-color="${i1}"/><stop offset="100%" stop-color="${i2}"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width="36" height="36" fill="url(#kbg)"/>` +
    `<path d="M18 5.5 C18.35 13.6 22.4 17.65 30.5 18 C22.4 18.35 18.35 22.4 18 30.5 C17.65 22.4 13.6 18.35 5.5 18 C13.6 17.65 17.65 13.6 18 5.5 Z" fill="url(#kgem)"/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function replaceCssVar(css, varName, value) {
  const esc = varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^([ \\t]*${esc}\\s*:\\s*)(.+?)(;[ \\t]*)$`, "m");
  if (!re.test(css)) return css;
  return css.replace(re, (_, prefix, _old, suffix) => `${prefix}${value}${suffix}`);
}

const DEFAULT_FONT_STACK = '"Inter", "Google Sans", "Google Sans Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function formatFontStack(rawFont) {
  const clean = String(rawFont || "").trim();
  if (!clean || /^(DEFAULT|NONE|off|false)$/i.test(clean)) {
    return DEFAULT_FONT_STACK;
  }
  const primary = clean.includes(",") || clean.includes('"') || clean.includes("'")
    ? clean
    : `"${clean}"`;
  return `${primary}, ${DEFAULT_FONT_STACK}`;
}

function buildSurfaceOverrideBlock(cfg) {
  const def = PRESETS["kanagawa-wave"];
  const d = cfg.dark;
  const l = cfg.light;
  const hasCustomFont = Boolean(
    cfg.fontFamily &&
    cfg.fontFamily.trim() &&
    !/^(DEFAULT|NONE|off|false)$/i.test(cfg.fontFamily.trim())
  );
  const hasCustomOpacity = cfg.uiOpacity !== undefined && cfg.uiOpacity !== null;
  const changed =
    JSON.stringify(d) !== JSON.stringify(def.dark) ||
    JSON.stringify(l) !== JSON.stringify(def.light) ||
    hasCustomFont ||
    hasCustomOpacity;

  if (!changed) return "";

  const dSurf = hexToRgb(d.surfaceBase) || "17, 22, 31";
  const dSide = hexToRgb(d.sidebarBase) || "14, 18, 26";
  const dOver = hexToRgb(d.overlayBase) || "15, 20, 29";
  const dScrim = hexToRgb(d.scrimBase) || "11, 15, 23";
  const dBlue = hexToRgb(d.accentBlue) || "126, 156, 216";
  const dAqua = hexToRgb(d.accentAqua) || "122, 168, 159";
  const dSel = hexToRgb(d.selection) || "45, 79, 103";

  const lSurf = hexToRgb(l.surfaceBase) || "247, 243, 214";
  const lSide = hexToRgb(l.sidebarBase) || "235, 229, 194";
  const lOver = hexToRgb(l.overlayBase) || "242, 236, 188";
  const lScrim = hexToRgb(l.scrimBase) || "242, 236, 188";
  const lPri = hexToRgb(l.primary) || "67, 67, 108";

  let fontCss = "";
  if (hasCustomFont) {
    const fontStack = formatFontStack(cfg.fontFamily);
    fontCss = `
:root {
  --font-family: ${fontStack} !important;
  --agy-font-family: ${fontStack} !important;
}
body, input, textarea, select, button, [data-markdown-root] {
  font-family: ${fontStack} !important;
}
`;
  }

  let opacityCss = "";
  let dSideAlpha = "0.44";
  if (hasCustomOpacity) {
    const opVal = Number(cfg.uiOpacity).toFixed(2);
    dSideAlpha = opVal;
    opacityCss = `
:root {
  --ui-opacity: ${opVal} !important;
  --agy-sidebar-alpha: ${opVal} !important;
}
`;
  }

  return `/* === KANAGAWA-CUSTOM-SURFACE-START === */
html { background-color: ${d.chromeBg} !important; }
${fontCss}${opacityCss}
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
body:not(.theme-light)::before {
  background-image:
    radial-gradient(48% 46% at 86% 18%, rgba(${dScrim}, 0.14) 0%, rgba(${dScrim}, 0.54) 100%),
    linear-gradient(108deg, rgba(${dScrim}, 0.56) 0%, rgba(${dScrim}, 0.40) 56%, rgba(${dScrim}, 0.22) 100%) !important;
}
body:not(.theme-light):not([data-has-browser-hole="true"]) .browser-hole-ancestor[data-side-panel-focus-scope="true"]:not([data-has-browser-hole="true"]),
body:not(.theme-light) [data-main-content-body],
body:not(.theme-light) [role="navigation"][aria-label="Sidebar"],
body:not(.theme-light) [data-testid="conversation-list-sidebar"] {
  background-color: rgba(${dSide}, ${dSideAlpha}) !important;
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
  --glass: rgba(${lSurf}, 0.86) !important;
  --glass-border: rgba(${lPri}, 0.20) !important;
  --onyx-frame: rgba(${lOver}, 0.88) !important;
  --onyx-raised: rgba(${lSurf}, 0.92) !important;
}
body.theme-light::before {
  background-image:
    radial-gradient(52% 48% at 86% 18%, rgba(${lScrim}, 0.36) 0%, rgba(${lScrim}, 0.72) 100%),
    linear-gradient(180deg, rgba(${lScrim}, 0.56) 0%, rgba(${lScrim}, 0.72) 100%) !important;
}
body.theme-light .agy-overlay,
body.theme-light .surface-glass,
body.theme-light [role="dialog"],
body.theme-light [role="menu"],
body.theme-light [role="listbox"] {
  background-color: rgba(${lOver}, 0.97) !important;
  border-color: rgba(${lPri}, 0.24) !important;
}
/* === KANAGAWA-CUSTOM-SURFACE-END === */`;
}

function buildLoadingHtml(cfg) {
  const d = cfg.dark;
  const l = cfg.light;
  const loading = cfg.loading || {};
  const title = String(loading.title || "Antigravity").replace(/[<>&]/g, "");
  const subtitle = String(loading.subtitle || "Preparing Kanagawa workspace...").replace(/[<>&]/g, "");
  const dWaveRgb = hexToRgb(d.selection) || "45, 79, 103";
  const dBlueRgb = hexToRgb(d.accentBlue) || "126, 156, 216";
  const lPaperRgb = hexToRgb(l.paper3) || "242, 236, 188";
  const lFgRgb = hexToRgb(l.chromeFg) || "62, 62, 76";

  return `<!DOCTYPE html>
<html data-mode="{{MODE}}">
<head>
<meta charset="utf-8">
<style>
  /* Generated by scripts/apply_kanagawa_config.js from kanagawa.config.json */
  :root, html[data-mode="dark"] {
    --bg: ${d.chromeBg};
    --fg: ${d.chromeFg};
    --muted: ${d.textMuted};
    --accent: ${d.primary};
    --wave1: ${d.selection};
    --wave2: ${d.accentBlue};
    --glow: rgba(${dWaveRgb}, 0.32);
    --track: rgba(${dBlueRgb}, 0.16);
  }
  html[data-mode="light"] {
    --bg: ${l.chromeBg};
    --fg: ${l.chromeFg};
    --muted: ${l.textMuted};
    --accent: ${l.primary};
    --wave1: ${l.primary};
    --wave2: ${l.textMuted};
    --glow: rgba(${lPaperRgb}, 0.72);
    --track: rgba(${lFgRgb}, 0.14);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 42%, var(--glow) 0%, var(--bg) 68%);
    background-color: var(--bg);
    color: var(--fg);
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }
  .emblem {
    width: 84px;
    height: 84px;
    margin-bottom: 20px;
    animation: float 3.2s ease-in-out infinite;
  }
  .wave-back { animation: drift 4.5s ease-in-out infinite; transform-origin: center; }
  .wave-front { animation: drift 3.4s ease-in-out infinite reverse; transform-origin: center; }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes drift {
    0%, 100% { transform: translateX(-2px); }
    50% { transform: translateX(2px); }
  }
  .title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.28em;
    color: var(--muted);
    margin-bottom: 14px;
    text-transform: uppercase;
  }
  .bar {
    width: 176px;
    height: 3px;
    border-radius: 999px;
    background: var(--track);
    overflow: hidden;
    margin-bottom: 12px;
  }
  .bar-fill {
    width: 48%;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--wave1), var(--wave2), var(--accent));
    animation: slide 1.7s ease-in-out infinite;
  }
  @keyframes slide {
    0% { transform: translateX(-110%); }
    100% { transform: translateX(220%); }
  }
  .sub {
    font-size: 12px;
    color: var(--muted);
    opacity: 0.85;
  }
</style>
</head>
<body>
  <svg class="emblem" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="42" r="24" fill="var(--accent)" fill-opacity="0.16" stroke="var(--accent)" stroke-opacity="0.55" stroke-width="1.25"/>
    <path d="M48 22C34 22 36.5 52 25.5 63.5C21.5 67.5 25.8 68.8 28.6 66.8C39.2 59.5 38.5 46.5 48 46.5C57.5 46.5 56.8 59.5 67.4 66.8C70.2 68.8 74.5 67.5 70.5 63.5C59.5 52 62 22 48 22Z" fill="var(--fg)" fill-opacity="0.92"/>
    <path class="wave-back" d="M12 68C22 61 32 61 42 67C52 73 64 73 84 65" stroke="var(--wave2)" stroke-width="2" stroke-linecap="round" stroke-opacity="0.65"/>
    <path class="wave-front" d="M16 74C28 68 38 75 50 71C62 67 71 70 80 74" stroke="var(--wave1)" stroke-width="2.2" stroke-linecap="round"/>
  </svg>
  <div class="title">${title}</div>
  <div class="bar"><div class="bar-fill"></div></div>
  <div class="sub">${subtitle}</div>
</body>
</html>
`;
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    if (key === "list-presets") { out.listPresets = true; continue; }
    if (key === "list-profiles") { out.listProfiles = true; continue; }
    if (key === "dry-run") { out.dryRun = true; continue; }
    if (key === "no-wallpaper") { out.noWallpaper = true; continue; }
    out[key] = argv[i + 1];
    i++;
  }
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.listPresets) {
    console.log("Available presets:", Object.keys(PRESETS).join(", "));
    return;
  }

  if (args.listProfiles) {
    if (!fs.existsSync(PROFILES_DIR)) {
      console.log("No profiles found.");
      return;
    }
    const profiles = fs
      .readdirSync(PROFILES_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
    if (profiles.length === 0) {
      console.log("No profiles found.");
    } else {
      console.log("Available profiles:", profiles.join(", "));
    }
    return;
  }

  if (args["delete-profile"]) {
    const name = sanitizeProfileName(args["delete-profile"]);
    const profilePath = path.join(PROFILES_DIR, `${name}.json`);
    if (!fs.existsSync(profilePath)) {
      console.log(`[kanagawa] Profile "${name}" does not exist.`);
    } else {
      fs.unlinkSync(profilePath);
      console.log(`[kanagawa] Profile "${name}" deleted.`);
    }
    return;
  }

  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

  const profileToLoad = args["load-profile"] || args.profile;
  if (profileToLoad) {
    const name = sanitizeProfileName(profileToLoad);
    const profilePath = path.join(PROFILES_DIR, `${name}.json`);
    if (!fs.existsSync(profilePath)) {
      throw new Error(`Profile "${name}" not found at ${profilePath}`);
    }
    const loaded = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    Object.assign(cfg, loaded);
    if (loaded.dark) cfg.dark = Object.assign({}, cfg.dark, loaded.dark);
    if (loaded.light) cfg.light = Object.assign({}, cfg.light, loaded.light);
    if (loaded.agentAvatar) cfg.agentAvatar = Object.assign({}, cfg.agentAvatar, loaded.agentAvatar);
    if (loaded.loading) cfg.loading = Object.assign({}, cfg.loading, loaded.loading);
    console.log(`[kanagawa] Loaded profile "${name}"`);
  }

  if (args.preset) {
    const p = PRESETS[args.preset];
    if (!p) throw new Error(`Unknown preset "${args.preset}". Valid: ${Object.keys(PRESETS).join(", ")}`);
    cfg.preset = args.preset;
    cfg.dark = Object.assign({}, cfg.dark, p.dark);
    cfg.light = Object.assign({}, cfg.light, p.light);
    cfg.agentAvatar = Object.assign({}, cfg.agentAvatar, {
      bgStops: p.agentAvatar.bgStops,
      iconStops: p.agentAvatar.iconStops,
    });
  }

  if (args["font-family"]) {
    const ff = String(args["font-family"]).trim();
    if (ff === "default" || ff === "none" || ff === "off") {
      delete cfg.fontFamily;
    } else {
      cfg.fontFamily = ff;
    }
  }

  if (args["ui-opacity"] !== undefined) {
    const rawOp = String(args["ui-opacity"]).trim();
    if (rawOp === "default" || rawOp === "none" || rawOp === "off") {
      delete cfg.uiOpacity;
    } else {
      const val = parseFloat(rawOp);
      if (isNaN(val) || val < 0.1 || val > 1.0) {
        throw new Error(`Invalid --ui-opacity "${args["ui-opacity"]}". Must be a number between 0.1 and 1.0.`);
      }
      cfg.uiOpacity = val;
    }
  }

  if (args.noWallpaper) cfg.wallpaper = "NONE";
  else if (args.wallpaper !== undefined) cfg.wallpaper = args.wallpaper;
  if (args["wallpaper-pos"]) cfg.wallpaperPosition = args["wallpaper-pos"];
  if (args["user-avatar"]) cfg.userAvatar = args["user-avatar"];
  if (args["agent-avatar"]) {
    cfg.agentAvatar = Object.assign({}, cfg.agentAvatar, { image: args["agent-avatar"] });
  }
  if (args["dark-primary"]) cfg.dark.primary = args["dark-primary"];
  if (args["dark-blue"]) cfg.dark.accentBlue = args["dark-blue"];
  if (args["dark-aqua"]) cfg.dark.accentAqua = args["dark-aqua"];
  if (args["dark-surface"]) cfg.dark.surfaceBase = args["dark-surface"];
  if (args["light-primary"]) cfg.light.primary = args["light-primary"];

  if (args["save-profile"]) {
    const name = sanitizeProfileName(args["save-profile"]);
    const profilePath = path.join(PROFILES_DIR, `${name}.json`);
    if (!args.dryRun) {
      if (!fs.existsSync(PROFILES_DIR)) {
        fs.mkdirSync(PROFILES_DIR, { recursive: true });
      }
      fs.writeFileSync(profilePath, JSON.stringify(cfg, null, 2) + "\n", "utf8");
      console.log(`[kanagawa] Saved profile "${name}" to ${profilePath}`);
    } else {
      console.log(`[dry-run] Would save profile "${name}" to ${profilePath}`);
    }
  }

  let css = fs.readFileSync(CSS_PATH, "utf8");

  // 1. Update :root palette & chrome vars
  const varUpdates = {
    "--kw-fujiWhite": cfg.dark.text,
    "--kw-oldWhite": cfg.dark.textMuted,
    "--kw-fujiGray": cfg.dark.textSubtle,
    "--kw-waveBlue2": cfg.dark.selection,
    "--kw-crystalBlue": cfg.dark.accentBlue,
    "--kw-carpYellow": cfg.dark.primary,
    "--kw-waveAqua": cfg.dark.accentAqua,
    "--kw-springGreen": cfg.dark.accentGreen,
    "--kw-sakuraPink": cfg.dark.accentPink,
    "--kw-oniViolet": cfg.dark.accentViolet,
    "--kw-surimiOrange": cfg.dark.accentOrange,
    "--kl-white0": cfg.light.paper0,
    "--kl-white1": cfg.light.paper1,
    "--kl-white2": cfg.light.paper2,
    "--kl-white3": cfg.light.paper3,
    "--kl-ink1": cfg.light.text,
    "--kl-ink2": cfg.light.primary,
    "--kl-gray2": cfg.light.textMuted,
    "--px-chrome-dark-bg": cfg.dark.chromeBg,
    "--px-chrome-dark-fg": cfg.dark.chromeFg,
    "--px-chrome-light-bg": cfg.light.chromeBg,
    "--px-chrome-light-fg": cfg.light.chromeFg,
  };
  for (const [k, v] of Object.entries(varUpdates)) {
    if (v) css = replaceCssVar(css, k, v);
  }

  // 2. Read existing embedded assets (from either new direct rules or legacy --kn-* vars)
  const extractUrl = (patterns) => {
    for (const re of patterns) {
      const m = css.match(re);
      if (m && m[1]) return m[1];
    }
    return null;
  };
  let wpUrl = extractUrl([
    /\/\* === KANAGAWA-EMBEDDED-ASSETS-START === \*\/[\s\S]*?html::before\s*\{[\s\S]*?background-image:\s*(url\("[^"]+"\))/,
    /^[ \t]*--kn-wallpaper\s*:\s*(url\("[^"]+"\))\s*;/m,
  ]);
  let uaUrl = extractUrl([
    /\.agy-user-bubble-frame:has\(> \[data-testid="user-message-bubble"\]\)::before\s*\{\s*background-image:\s*(url\("[^"]+"\))\s*!important;/,
    /^[ \t]*--kn-user-avatar\s*:\s*(url\("[^"]+"\))\s*;/m,
  ]);
  let aaUrl = extractUrl([
    /\[data-testid="agent-response"\][^\{]*\{\s*background-image:\s*(url\("[^"]+"\))\s*!important;/,
    /^[ \t]*--kn-gemini-avatar\s*:\s*(url\("[^"]+"\))\s*;/m,
  ]);

  const disableWallpaper = !cfg.wallpaper || /^(NONE|off|false)$/i.test(String(cfg.wallpaper).trim());
  if (disableWallpaper) {
    cfg.wallpaper = "NONE";
    wpUrl = null;
  } else {
    const wpPath = resolveAssetPath(cfg.wallpaper);
    if (wpPath) {
      wpUrl = fileToDataUrl(wpPath);
      if (!wpPath.startsWith(THEME_DIR + path.sep)) cfg.wallpaper = "KEEP_EMBEDDED";
    }
  }

  const uaPath = resolveAssetPath(cfg.userAvatar);
  if (uaPath) {
    uaUrl = fileToDataUrl(uaPath);
    if (!uaPath.startsWith(THEME_DIR + path.sep)) cfg.userAvatar = "KEEP_EMBEDDED";
  }

  const aa = cfg.agentAvatar || {};
  const aaPath = resolveAssetPath(aa.image);
  if (aaPath) {
    aaUrl = fileToDataUrl(aaPath);
    if (!aaPath.startsWith(THEME_DIR + path.sep)) cfg.agentAvatar.image = "KEEP_EMBEDDED";
  } else if (aa.image === "SVG_STAR") {
    aaUrl = buildGeminiStarSvgUrl(aa.bgStops, aa.iconStops);
  }

  // Strip old :root { --kn-* } asset block or prior KANAGAWA-EMBEDDED-ASSETS block
  css = css.replace(/\n?\/\* Embedded wallpaper[^\n]*\*\/\s*:root\s*\{[\s\S]*?\}\s*$/, "");
  css = css.replace(/\n?\/\* === KANAGAWA-EMBEDDED-ASSETS-START === \*\/[\s\S]*?\/\* === KANAGAWA-EMBEDDED-ASSETS-END === \*\/\s*/g, "");

  // 3. Optional managed surface override block (empty when using default kanagawa-wave without font/opacity overrides)
  const surfaceBlock = buildSurfaceOverrideBlock(cfg);
  const blockRe = /\n?\/\* === KANAGAWA-CUSTOM-SURFACE-START === \*\/[\s\S]*?\/\* === KANAGAWA-CUSTOM-SURFACE-END === \*\/\n?/;
  css = css.replace(blockRe, "\n");
  if (surfaceBlock) {
    css = css.trimEnd() + "\n\n" + surfaceBlock;
  }

  // 4. Write direct asset rules (avoids Chromium's ~2MB CSS custom property limit for large wallpapers)
  const wpPos = cfg.wallpaperPosition || "right top";
  const assetRules = ["/* === KANAGAWA-EMBEDDED-ASSETS-START === */"];
  if (wpUrl) {
    assetRules.push(
      `html::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  z-index: 0 !important;\n  pointer-events: none;\n  will-change: transform;\n  transform: translateZ(0);\n  background-image: ${wpUrl};\n  background-size: cover;\n  background-position: ${wpPos};\n  background-repeat: no-repeat;\n}`
    );
  } else {
    const dBg = (cfg.dark && cfg.dark.chromeBg) || "#121720";
    const lBg = (cfg.light && cfg.light.chromeBg) || "#ECE5BE";
    assetRules.push(
      `body:not(.theme-light)::before { background-color: ${dBg} !important; }\nbody.theme-light::before { background-color: ${lBg} !important; }`
    );
  }
  if (aaUrl) {
    assetRules.push(
      `[data-testid="agent-response"] div[class~="px-2"][class~="py-1"]:has(> [data-markdown-root])::before {\n  background-image: ${aaUrl} !important;\n}`
    );
  }
  if (uaUrl) {
    assetRules.push(
      `body .agy-user-bubble-frame:has(> [data-testid="user-message-bubble"])::before {\n  background-image: ${uaUrl} !important;\n}`
    );
  }
  assetRules.push("/* === KANAGAWA-EMBEDDED-ASSETS-END === */");
  css = css.trimEnd() + "\n\n" + assetRules.join("\n\n") + "\n";

  // Sanity check balanced braces before writing
  const openCount = (css.match(/\{/g) || []).length;
  const closeCount = (css.match(/\}/g) || []).length;
  if (openCount !== closeCount) {
    throw new Error(`Refusing to write unbalanced CSS: open=${openCount} close=${closeCount}`);
  }

  const loadingHtml = buildLoadingHtml(cfg);

  if (args.dryRun) {
    console.log("[dry-run] CSS bytes:", Buffer.byteLength(css, "utf8"), "braces:", openCount, "/", closeCount);
    console.log("[dry-run] loading.html bytes:", Buffer.byteLength(loadingHtml, "utf8"));
    return;
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + "\n", "utf8");
  fs.writeFileSync(CSS_PATH, css, "utf8");
  fs.writeFileSync(LOADING_PATH, loadingHtml, "utf8");
  console.log("[kanagawa] Applied config -> kanagawa.css (" + openCount + "/" + closeCount + " braces) & loading.html");
}

if (require.main === module) {
  main();
}

module.exports = {
  PRESETS,
  PROFILES_DIR,
  DEFAULT_FONT_STACK,
  formatFontStack,
  parseArgs,
  sanitizeProfileName,
  buildSurfaceOverrideBlock,
  buildLoadingHtml,
  buildGeminiStarSvgUrl,
  hexToRgb,
  main,
};
