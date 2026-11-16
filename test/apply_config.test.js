const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const REPO_ROOT = path.resolve(__dirname, "..");
const SCRIPT_PATH = path.join(REPO_ROOT, "scripts", "apply_kanagawa_config.js");
const THEME_DIR = path.join(REPO_ROOT, "kanagawa-theme");
const CONFIG_PATH = path.join(THEME_DIR, "kanagawa.config.json");
const CSS_PATH = path.join(THEME_DIR, "kanagawa.css");
const PROFILES_DIR = path.join(THEME_DIR, "profiles");

const {
  PRESETS,
  sanitizeProfileName,
  buildSurfaceOverrideBlock,
  hexToRgb,
} = require(SCRIPT_PATH);

function runScript(args, options = {}) {
  return execFileSync(process.execPath, [SCRIPT_PATH, ...args], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    ...options,
  });
}

describe("Antigravity Kanagawa Theme - CI & Automation Tests", () => {
  describe("Presets Validity & CSS Brace Balance", () => {
    const HEX_REGEX = /^#[0-9a-fA-F]{3,8}$/;
    const REQUIRED_DARK_KEYS = [
      "chromeBg", "chromeFg", "primary",
      "accentBlue", "accentAqua", "accentGreen", "accentPink", "accentViolet", "accentOrange",
      "text", "textMuted", "textSubtle",
      "surfaceBase", "sidebarBase", "overlayBase", "scrimBase", "selection",
    ];
    const REQUIRED_LIGHT_KEYS = [
      "chromeBg", "chromeFg", "primary",
      "text", "textMuted",
      "paper0", "paper1", "paper2", "paper3",
      "surfaceBase", "sidebarBase", "overlayBase", "scrimBase",
    ];

    it("should export PRESETS with all expected presets", () => {
      assert.ok(PRESETS, "PRESETS should be exported");
      const expectedPresets = [
        "kanagawa-wave",
        "kanagawa-dragon",
        "sakura-dusk",
        "midnight-aqua",
        "catppuccin-mocha",
        "catppuccin",
        "tokyo-night",
        "nord",
        "gruvbox-dark",
        "gruvbox",
        "dracula",
      ];
      for (const presetName of expectedPresets) {
        assert.ok(
          PRESETS[presetName],
          `Expected preset "${presetName}" to exist in PRESETS`
        );
      }
    });

    it("should validate color structure and valid hex values for every preset", () => {
      for (const [presetName, preset] of Object.entries(PRESETS)) {
        assert.ok(preset.agentAvatar, `Preset ${presetName} must have agentAvatar`);
        assert.ok(Array.isArray(preset.agentAvatar.bgStops), `Preset ${presetName} agentAvatar.bgStops must be array`);
        assert.ok(Array.isArray(preset.agentAvatar.iconStops), `Preset ${presetName} agentAvatar.iconStops must be array`);
        for (const c of preset.agentAvatar.bgStops) {
          assert.match(c, HEX_REGEX, `Preset ${presetName} bgStop invalid: ${c}`);
        }
        for (const c of preset.agentAvatar.iconStops) {
          assert.match(c, HEX_REGEX, `Preset ${presetName} iconStop invalid: ${c}`);
        }

        assert.ok(preset.dark, `Preset ${presetName} must have dark palette`);
        for (const key of REQUIRED_DARK_KEYS) {
          assert.ok(preset.dark[key], `Preset ${presetName} dark missing ${key}`);
          assert.match(preset.dark[key], HEX_REGEX, `Preset ${presetName} dark.${key} must be valid hex`);
        }

        assert.ok(preset.light, `Preset ${presetName} must have light palette`);
        for (const key of REQUIRED_LIGHT_KEYS) {
          assert.ok(preset.light[key], `Preset ${presetName} light missing ${key}`);
          assert.match(preset.light[key], HEX_REGEX, `Preset ${presetName} light.${key} must be valid hex`);
        }
      }
    });

    it("should produce balanced CSS braces for every preset via dry-run", () => {
      const presetNames = Object.keys(PRESETS);
      for (const name of presetNames) {
        const stdout = runScript(["--preset", name, "--dry-run"]);
        const match = stdout.match(/braces:\s*(\d+)\s*\/\s*(\d+)/);
        assert.ok(match, `Dry-run for preset ${name} should report braces count`);
        const openBraces = parseInt(match[1], 10);
        const closeBraces = parseInt(match[2], 10);
        assert.strictEqual(
          openBraces,
          closeBraces,
          `Preset ${name} has unbalanced CSS braces: ${openBraces} open vs ${closeBraces} close`
        );
        assert.ok(openBraces > 0, `Preset ${name} should have > 0 braces`);
      }
    });
  });

  describe("Font & UI Opacity Injection", () => {
    it("should inject custom font-family into surface override CSS", () => {
      const fakeCfg = {
        fontFamily: "Fira Code, monospace",
        dark: PRESETS["kanagawa-wave"].dark,
        light: PRESETS["kanagawa-wave"].light,
      };
      const css = buildSurfaceOverrideBlock(fakeCfg);
      assert.ok(css.includes("--font-family: Fira Code, monospace !important;"));
      assert.ok(css.includes("font-family: Fira Code, monospace !important;"));
      assert.ok(css.includes(".monaco-workbench"));
    });

    it("should inject custom ui-opacity into surface override CSS", () => {
      const fakeCfg = {
        uiOpacity: 0.75,
        dark: PRESETS["kanagawa-wave"].dark,
        light: PRESETS["kanagawa-wave"].light,
      };
      const css = buildSurfaceOverrideBlock(fakeCfg);
      assert.ok(css.includes("--ui-opacity: 0.75 !important;"));
      assert.ok(css.includes("--agy-sidebar-alpha: 0.75 !important;"));
    });

    it("should support --font-family and --ui-opacity via CLI dry-run with balanced braces", () => {
      const stdout = runScript([
        "--preset", "tokyo-night",
        "--font-family", "JetBrains Mono",
        "--ui-opacity", "0.85",
        "--dry-run",
      ]);
      const match = stdout.match(/braces:\s*(\d+)\s*\/\s*(\d+)/);
      assert.ok(match, "Output should contain brace counts");
      const openBraces = parseInt(match[1], 10);
      const closeBraces = parseInt(match[2], 10);
      assert.strictEqual(openBraces, closeBraces, "CSS braces must be balanced with custom font and opacity");
    });

    it("should reject invalid --ui-opacity out of range (0.1 - 1.0)", () => {
      assert.throws(() => {
        runScript(["--ui-opacity", "1.5", "--dry-run"], { stdio: "pipe" });
      }, /Invalid --ui-opacity/);

      assert.throws(() => {
        runScript(["--ui-opacity", "0.05", "--dry-run"], { stdio: "pipe" });
      }, /Invalid --ui-opacity/);

      assert.throws(() => {
        runScript(["--ui-opacity", "not-a-number", "--dry-run"], { stdio: "pipe" });
      }, /Invalid --ui-opacity/);
    });
  });

  describe("Profiles Manager: Save, Load, List, Delete", () => {
    const testProfileName = "__citest_temp_profile__";
    const testProfilePath = path.join(PROFILES_DIR, `${testProfileName}.json`);

    before(() => {
      if (fs.existsSync(testProfilePath)) {
        fs.unlinkSync(testProfilePath);
      }
    });

    after(() => {
      if (fs.existsSync(testProfilePath)) {
        fs.unlinkSync(testProfilePath);
      }
    });

    it("should sanitize profile names correctly", () => {
      assert.strictEqual(sanitizeProfileName("my-custom-profile"), "my-custom-profile");
      assert.strictEqual(sanitizeProfileName("profile_backup.json"), "profile_backup");
      assert.strictEqual(sanitizeProfileName("  spaced-profile  "), "spaced-profile");
      assert.throws(() => sanitizeProfileName(""), /non-empty string/);
      assert.throws(() => sanitizeProfileName("   "), /Invalid profile name/);
      assert.throws(() => sanitizeProfileName("invalid name!"), /Invalid profile name/);
    });

    it("should save a profile to disk", () => {
      const stdout = runScript([
        "--preset", "nord",
        "--font-family", "Fira Code",
        "--ui-opacity", "0.80",
        "--save-profile", testProfileName,
        "--dry-run",
      ]);
      assert.ok(stdout.includes(`Would save profile "${testProfileName}"`));
      assert.ok(!fs.existsSync(testProfilePath), "dry-run should not write file to disk");

      // Save without dry-run
      const saveOut = runScript([
        "--preset", "nord",
        "--font-family", "Fira Code",
        "--ui-opacity", "0.80",
        "--save-profile", testProfileName,
      ]);
      assert.ok(saveOut.includes(`Saved profile "${testProfileName}"`));
      assert.ok(fs.existsSync(testProfilePath), "Profile file should exist on disk");

      const savedJson = JSON.parse(fs.readFileSync(testProfilePath, "utf8"));
      assert.strictEqual(savedJson.preset, "nord");
      assert.strictEqual(savedJson.fontFamily, "Fira Code");
      assert.strictEqual(savedJson.uiOpacity, 0.8);
    });

    it("should list available profiles", () => {
      const stdout = runScript(["--list-profiles"]);
      assert.ok(stdout.includes("Available profiles:"));
      assert.ok(stdout.includes(testProfileName));
    });

    it("should load an existing profile via --load-profile and --profile", () => {
      const loadOut1 = runScript(["--load-profile", testProfileName, "--dry-run"]);
      assert.ok(loadOut1.includes(`Loaded profile "${testProfileName}"`));
      assert.ok(loadOut1.includes("[dry-run]"));

      const loadOut2 = runScript(["--profile", testProfileName, "--dry-run"]);
      assert.ok(loadOut2.includes(`Loaded profile "${testProfileName}"`));
      assert.ok(loadOut2.includes("[dry-run]"));
    });

    it("should throw error when loading non-existent profile", () => {
      assert.throws(() => {
        runScript(["--load-profile", "__non_existent_profile_xyz__", "--dry-run"], { stdio: "pipe" });
      }, /Profile "__non_existent_profile_xyz__" not found/);
    });

    it("should delete profile via --delete-profile", () => {
      assert.ok(fs.existsSync(testProfilePath), "Profile file should exist before delete");
      const delOut = runScript(["--delete-profile", testProfileName]);
      assert.ok(delOut.includes(`Profile "${testProfileName}" deleted.`));
      assert.ok(!fs.existsSync(testProfilePath), "Profile file should be deleted from disk");

      // Deleting again should handle gracefully
      const delAgain = runScript(["--delete-profile", testProfileName]);
      assert.ok(delAgain.includes("does not exist"));
    });
  });

  describe("Dry-run Behavior", () => {
    it("should not modify config or CSS files when --dry-run is supplied", () => {
      const configBefore = fs.readFileSync(CONFIG_PATH, "utf8");
      const cssBefore = fs.readFileSync(CSS_PATH, "utf8");

      const stdout = runScript(["--preset", "dracula", "--dry-run"]);
      assert.ok(stdout.includes("[dry-run] CSS bytes:"));
      assert.ok(stdout.includes("[dry-run] loading.html bytes:"));

      const configAfter = fs.readFileSync(CONFIG_PATH, "utf8");
      const cssAfter = fs.readFileSync(CSS_PATH, "utf8");

      assert.strictEqual(configBefore, configAfter, "Config file must not change during dry-run");
      assert.strictEqual(cssBefore, cssAfter, "CSS file must not change during dry-run");
    });
  });
});
