# ============================================================================
# Kanagawa Theme installer for Antigravity 2.x (Windows) - v2.3.0
# Bộ cài đặt Kanagawa Theme cho Antigravity 2.x (Windows) - v2.3.0
# ============================================================================
param(
    [switch]$KillRunning,
    [string]$Theme = "kanagawa"
)
$ErrorActionPreference = 'Stop'

$ThemeName = 'kanagawa-theme'
$AppDir    = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity'
$Resources = Join-Path $AppDir 'resources'
$Asar      = Join-Path $Resources 'app.asar'
$Backup    = Join-Path $Resources 'app.asar.pixel-backup'
$Injector  = Join-Path $PSScriptRoot 'patch\pixelTheme.js'
$ThemeSrc  = Join-Path $PSScriptRoot $ThemeName
$Work      = Join-Path $env:TEMP ('kanagawa-theme-' + [guid]::NewGuid().ToString('N').Substring(0, 8))

function Write-Step($msg) { Write-Host "[kanagawa] $msg" -ForegroundColor Cyan }
function Fail($msg) { Write-Host "[kanagawa] ERROR / LOI: $msg" -ForegroundColor Red; exit 1 }

if (-not (Test-Path $Asar))     { Fail "app.asar not found at $Asar / Khong tim thay app.asar." }
if (-not (Test-Path $Injector)) { Fail "patch\pixelTheme.js not found / Khong tim thay patch\pixelTheme.js." }
if (-not (Test-Path $ThemeSrc)) { Fail "$ThemeName folder not found / Khong tim thay thu muc $ThemeName." }

# --- 1. Ensure Antigravity is closed before touching app.asar ---
$procs = @(Get-Process -Name 'Antigravity', 'language_server*' -ErrorAction SilentlyContinue)
if ($procs.Count -gt 0) {
    if ($KillRunning) {
        Write-Step "Stopping running Antigravity / Dang dong Antigravity..."
        $procs | Stop-Process -Force -Confirm:$false -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
    else {
        Fail "Antigravity is running (check system tray). Close it or run: .\install.ps1 -KillRunning | Antigravity dang chay, hay dong han hoac chay: .\install.ps1 -KillRunning"
    }
}

function Extract-AsarArchive($src, $dst) {
    $localAsar = Join-Path $PSScriptRoot 'node_modules\.bin\asar.cmd'
    if (Test-Path $localAsar) {
        Write-Step "Extracting via local @electron/asar..."
        & $localAsar extract "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    $pyScript = Join-Path $PSScriptRoot 'scripts\asar.py'
    if ((Test-Path $pyScript) -and (Get-Command 'python' -ErrorAction SilentlyContinue)) {
        Write-Step "Extracting via Python asar tool (offline)..."
        python "$pyScript" extract "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    if (Get-Command 'npx' -ErrorAction SilentlyContinue) {
        Write-Step "Extracting via npx @electron/asar..."
        npx --yes @electron/asar extract "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    $bunPath = Join-Path $env:USERPROFILE '.bun\bin\bun.exe'
    if (Test-Path $bunPath) {
        Write-Step "Extracting via Bun @electron/asar..."
        $env:BUN_TMPDIR = $env:TEMP
        & $bunPath x @electron/asar extract "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    Fail "Cannot extract asar (please ensure Python, Bun or Node.js is installed)."
}

function Pack-AsarArchive($src, $dst) {
    $localAsar = Join-Path $PSScriptRoot 'node_modules\.bin\asar.cmd'
    if (Test-Path $localAsar) {
        Write-Step "Repacking via local @electron/asar..."
        & $localAsar pack "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    $pyScript = Join-Path $PSScriptRoot 'scripts\asar.py'
    if ((Test-Path $pyScript) -and (Get-Command 'python' -ErrorAction SilentlyContinue)) {
        Write-Step "Repacking via Python asar tool (offline)..."
        python "$pyScript" pack "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    if (Get-Command 'npx' -ErrorAction SilentlyContinue) {
        Write-Step "Repacking via npx @electron/asar..."
        npx --yes @electron/asar pack "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    $bunPath = Join-Path $env:USERPROFILE '.bun\bin\bun.exe'
    if (Test-Path $bunPath) {
        Write-Step "Repacking via Bun @electron/asar..."
        $env:BUN_TMPDIR = $env:TEMP
        & $bunPath x @electron/asar pack "$src" "$dst"
        if ($LASTEXITCODE -eq 0) { return }
    }
    Fail "Cannot pack asar (please ensure Python, Bun or Node.js is installed)."
}

try {
    # --- 2. Extract and patch app.asar if needed ---
    Write-Step "Extracting app.asar / Dang giai nen app.asar..."
    Extract-AsarArchive $Asar $Work

    $UtilsPath = Join-Path $Work 'dist\utils.js'
    if (-not (Test-Path $UtilsPath)) { Fail "dist/utils.js not found inside app.asar / Khong tim thay dist/utils.js." }
    $Utils = [System.IO.File]::ReadAllText($UtilsPath)

    $PackedInjector = Join-Path $Work 'dist\pixelTheme.js'
    $AlreadyPatched = $Utils.Contains('pixelTheme')
    $NeedsRepack = $false

    if ($AlreadyPatched) {
        $packedHash = if (Test-Path $PackedInjector) { (Get-FileHash $PackedInjector).Hash } else { '' }
        if ($packedHash -ne (Get-FileHash $Injector).Hash) {
            Write-Step "Updating injector inside app.asar / Dang cap nhat injector trong app.asar..."
            Copy-Item $Injector $PackedInjector -Force
            $NeedsRepack = $true
        }
        else {
            Write-Step "app.asar up to date - refreshing theme assets / app.asar da moi nhat, chi dong bo theme..."
        }
    }
    else {
        $A1 = 'const loadingOverlay_1 = require("./loadingOverlay");'
        $A2 = '(0, loadingOverlay_1.attachLoadingOverlay)(win, foregroundColor, backgroundColor);'

        # Ho tro ca Antigravity v44.9.1+ (loadHubWindowUrl) va cac ban cu (win.loadURL)
        $A3_candidates = @(
            'void loadHubWindowUrl(win, url, { skipBootstrapMint });',
            'void loadHubWindowUrl(win, url',
            'void win.loadURL(url);'
        )
        $A3 = $null
        foreach ($cand in $A3_candidates) {
            if ($Utils.Contains($cand)) {
                $A3 = $cand
                break
            }
        }
        if (-not $A3) {
            Fail "Patch anchor not found in utils.js (loadURL / loadHubWindowUrl)."
        }

        $A4 = "const backgroundColor = isLight ? '#FAFAFA' : '#131313';"
        $A5 = "const foregroundColor = isLight ? '#383A42' : '#FAFAFA';"
        $A6 = 'titleBarOverlay: isMacOS()'

        foreach ($a in @($A1, $A2, $A4, $A5, $A6)) {
            if (-not $Utils.Contains($a)) {
                Fail "Patch anchor not found in utils.js ($a)."
            }
        }

        Write-Step "Patching dist/utils.js..."
        $Utils = $Utils.Replace($A1, $A1 + "`nconst pixelTheme_1 = require(`"./pixelTheme`");")
        $Utils = $Utils.Replace($A2, '(0, pixelTheme_1.attachPixelLoadingOverlay)(win, foregroundColor, backgroundColor);')
        $Utils = $Utils.Replace($A3, "(0, pixelTheme_1.attachPixelTheme)(win);`n    " + $A3)
        $Utils = $Utils.Replace($A4, "const pixelChrome_1 = (0, pixelTheme_1.chromeColors)(isLight);`n    const backgroundColor = pixelChrome_1.background;")
        $Utils = $Utils.Replace($A5, 'const foregroundColor = pixelChrome_1.foreground;')
        $Utils = $Utils.Replace($A6, 'titleBarOverlay: !(0, pixelTheme_1.wantsNativeCaption)() || isMacOS()')
        [System.IO.File]::WriteAllText($UtilsPath, $Utils, (New-Object System.Text.UTF8Encoding($false)))

        $HandlersPath = Join-Path $Work 'dist\ipcHandlers.js'
        if (Test-Path $HandlersPath) {
            $Handlers = [System.IO.File]::ReadAllText($HandlersPath)
            $H1_new = "if (win && !(0, utils_1.isMacOS)()) {"
            $H1_old = "if (win && process.platform === 'win32') {"
            if ($Handlers.Contains($H1_new)) {
                $Handlers = $Handlers.Replace($H1_new, "if (win && !(0, utils_1.isMacOS)() && !win.__pixelNoNativeCaption) {")
                [System.IO.File]::WriteAllText($HandlersPath, $Handlers, (New-Object System.Text.UTF8Encoding($false)))
            }
            elseif ($Handlers.Contains($H1_old)) {
                $Handlers = $Handlers.Replace($H1_old, "if (win && process.platform === 'win32' && !win.__pixelNoNativeCaption) {")
                [System.IO.File]::WriteAllText($HandlersPath, $Handlers, (New-Object System.Text.UTF8Encoding($false)))
            }
        }

        Copy-Item $Injector $PackedInjector -Force
        Write-Step "Backing up app.asar -> app.asar.pixel-backup"
        Copy-Item $Asar $Backup -Force
        $NeedsRepack = $true
    }

    if ($NeedsRepack) {
        Write-Step "Repacking app.asar / Dang dong goi lai app.asar..."
        $NewAsar = Join-Path $Work 'app.asar.pixel-new'
        Pack-AsarArchive $Work $NewAsar
        Move-Item $NewAsar $Asar -Force
    }

    # --- 3. Deploy kanagawa-theme assets ---
    $ThemeDst = Join-Path $Resources $ThemeName
    Write-Step "Deploying $ThemeName to $ThemeDst..."
    if (Test-Path $ThemeDst) { Remove-Item $ThemeDst -Recurse -Force -Confirm:$false }
    Copy-Item $ThemeSrc $ThemeDst -Recurse -Force

    $ActiveConfig = @{ theme = $ThemeName } | ConvertTo-Json
    $ActiveConfigPath = Join-Path $Resources 'active-theme.json'
    [System.IO.File]::WriteAllText($ActiveConfigPath, $ActiveConfig, (New-Object System.Text.UTF8Encoding($false)))
}
finally {
    if (Test-Path $Work) {
        Remove-Item $Work -Recurse -Force -Confirm:$false -ErrorAction SilentlyContinue
    }
}

Write-Host ""
Write-Host "  Kanagawa Theme v2.3.0 installed! / Da cai dat Kanagawa Theme v2.3.0 xong!" -ForegroundColor Green
Write-Host "  - Open Antigravity to enjoy the theme & loading screen. / Mo lai Antigravity de su dung." -ForegroundColor White
Write-Host "  - Customize wallpaper, colors & avatars / Tuy bien anh nen, mau, avatar: .\customize-kanagawa.ps1 -Menu" -ForegroundColor Cyan
Write-Host ""
