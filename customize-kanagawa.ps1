<#
.SYNOPSIS
  Quickly customize Kanagawa wallpaper (or disable it), colors/preset, profiles, fonts, UI opacity, and avatars, then hot-reload Antigravity.
  Tuy bien nhanh hinh nen (hoac tat hinh nen), bang mau/preset, profile, font chu, do trong suot UI va ca 2 avatar cho Kanagawa theme roi hot-reload ngay.
#>
param(
    [string]$Preset,
    [string]$Wallpaper,
    [string]$WallpaperPosition,
    [string]$UserAvatar,
    [string]$AgentAvatar,
    [string]$DarkPrimary,
    [string]$DarkBlue,
    [string]$DarkAqua,
    [string]$DarkSurface,
    [string]$LightPrimary,
    [string]$Profile,
    [string]$SaveProfile,
    [string]$DeleteProfile,
    [switch]$ListProfiles,
    [string]$FontFamily,
    [string]$UiOpacity,
    [switch]$PickWallpaper,
    [switch]$NoWallpaper,
    [switch]$PickUserAvatar,
    [switch]$PickAgentAvatar,
    [switch]$Menu,
    [switch]$NoReload
)

$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot
$ApplyScript = Join-Path $RepoRoot "scripts\apply_kanagawa_config.js"
$SwitchScript = Join-Path $RepoRoot "switch-theme.ps1"

function Pick-ImageFile {
    param([string]$Title)
    Add-Type -AssemblyName System.Windows.Forms
    $dlg = New-Object System.Windows.Forms.OpenFileDialog
    $dlg.Title = $Title
    $dlg.Filter = "Images (*.png;*.jpg;*.jpeg;*.webp;*.gif;*.svg;*.bmp)|*.png;*.jpg;*.jpeg;*.webp;*.gif;*.svg;*.bmp|All files (*.*)|*.*"
    if ($dlg.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
        return $dlg.FileName
    }
    return $null
}

if ($PickWallpaper) {
    $picked = Pick-ImageFile "Choose Wallpaper / Chon hinh nen moi"
    if (-not $picked) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
    $Wallpaper = $picked
}
if ($PickUserAvatar) {
    $picked = Pick-ImageFile "Choose User Avatar / Chon Avatar User"
    if (-not $picked) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
    $UserAvatar = $picked
}
if ($PickAgentAvatar) {
    $picked = Pick-ImageFile "Choose Agent/Gemini Avatar / Chon Avatar Agent"
    if (-not $picked) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
    $AgentAvatar = $picked
}

if ($Menu) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "   Antigravity Theme Customizer v2.2.0 (Menu nhanh)" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "--- CHON PRESET MAU (Nhan 1-9 la doi ngay) ---" -ForegroundColor Yellow
    Write-Host "  [1]  Kanagawa Wave     (Mac dinh / Default Dark & Light)"
    Write-Host "  [2]  Kanagawa Dragon   (Toi am / Warm Dark)"
    Write-Host "  [3]  Sakura Dusk       (Hong tim hoang hon / Sunset Pink & Violet)"
    Write-Host "  [4]  Midnight Aqua     (Xanh bien dem / Deep Aqua & Cyan)"
    Write-Host "  [5]  Catppuccin Mocha  (Catppuccin tim pastel / Pastel Purple)"
    Write-Host "  [6]  Tokyo Night       (Tokyo neon xanh tim / Neon Blue & Violet)"
    Write-Host "  [7]  Nord              (Bac Au bang gia / Arctic Ice Blue)"
    Write-Host "  [8]  Gruvbox Dark      (Retro co dien / Retro Warm Brown)"
    Write-Host "  [9]  Dracula           (Gothic tim & hong / Vampire Purple & Pink)"
    Write-Host ""
    Write-Host "--- TUY BIEN HINH ANH & GIAO DIEN ---" -ForegroundColor Yellow
    Write-Host "  [10] Doi hinh nen / Change Wallpaper (Pick file)"
    Write-Host "  [11] Doi Avatar User / Change User Avatar (Pick file)"
    Write-Host "  [12] Doi Avatar Agent / Change Agent Avatar (Pick file)"
    Write-Host "  [13] Tat hinh nen / Disable Wallpaper (Nen mau tron theo Preset)"
    Write-Host "  [14] Chinh Font chu / Set Font Family"
    Write-Host "  [15] Chinh do trong suot UI / Set UI Opacity"
    Write-Host ""
    Write-Host "--- QUAN LY PROFILE (CAU HINH TRON GOI) ---" -ForegroundColor Yellow
    Write-Host "  [16] Tai Profile / Load saved Profile (Chon theo danh sach)"
    Write-Host "  [17] Luu Profile hien tai / Save current Profile"
    Write-Host "  [18] Danh sach Profile / List Profiles"
    Write-Host "  [19] Xoa Profile / Delete Profile"
    Write-Host ""
    Write-Host "--- KHAC ---" -ForegroundColor Yellow
    Write-Host "  [20] Ap dung tu kanagawa.config.json & Hot-Reload"
    Write-Host "  [0]  Thoat / Exit"
    Write-Host ""
    $choice = Read-Host "Select / Chon (0-20)"
    switch ($choice) {
        "1"  { $Preset = "kanagawa-wave" }
        "2"  { $Preset = "kanagawa-dragon" }
        "3"  { $Preset = "sakura-dusk" }
        "4"  { $Preset = "midnight-aqua" }
        "5"  { $Preset = "catppuccin-mocha" }
        "6"  { $Preset = "tokyo-night" }
        "7"  { $Preset = "nord" }
        "8"  { $Preset = "gruvbox-dark" }
        "9"  { $Preset = "dracula" }
        "10" {
            $Wallpaper = Pick-ImageFile "Choose Wallpaper / Chon hinh nen moi"
            if (-not $Wallpaper) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
        }
        "11" {
            $UserAvatar = Pick-ImageFile "Choose User Avatar / Chon Avatar User"
            if (-not $UserAvatar) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
        }
        "12" {
            $AgentAvatar = Pick-ImageFile "Choose Agent/Gemini Avatar / Chon Avatar Agent"
            if (-not $AgentAvatar) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
        }
        "13" { $NoWallpaper = $true }
        "14" {
            Write-Host ""
            Write-Host "--- Chon Font chu giao dien ---" -ForegroundColor Yellow
            Write-Host "  [1] JetBrains Mono"
            Write-Host "  [2] Fira Code"
            Write-Host "  [3] Cascadia Code"
            Write-Host "  [4] Consolas"
            Write-Host "  [5] Inter"
            Write-Host "  [6] Mac dinh he thong / System Default"
            Write-Host "  [7] Tu nhap ten font khac..."
            Write-Host ""
            $fChoice = Read-Host "Chon (1-7)"
            switch ($fChoice) {
                "1" { $FontFamily = "JetBrains Mono" }
                "2" { $FontFamily = "Fira Code" }
                "3" { $FontFamily = "Cascadia Code" }
                "4" { $FontFamily = "Consolas" }
                "5" { $FontFamily = "Inter" }
                "6" { $FontFamily = "DEFAULT" }
                "7" { $FontFamily = Read-Host "Nhap ten font (vd: Roboto Mono)" }
                default { if ($fChoice) { $FontFamily = $fChoice } else { exit 0 } }
            }
        }
        "15" {
            Write-Host ""
            Write-Host "--- Chon do trong suot UI (Glassmorphism) ---" -ForegroundColor Yellow
            Write-Host "  [1] 0.95 - Mac dinh / Nhe nhang"
            Write-Host "  [2] 0.85 - Trong suot vua / Glassy"
            Write-Host "  [3] 0.75 - Trong suot cao / Translucent"
            Write-Host "  [4] 0.60 - Sieu trong suot / Ultra Glass"
            Write-Host "  [5] Tu nhap gia tri (0.1 - 1.0)..."
            Write-Host ""
            $oChoice = Read-Host "Chon (1-5)"
            switch ($oChoice) {
                "1" { $UiOpacity = "0.95" }
                "2" { $UiOpacity = "0.85" }
                "3" { $UiOpacity = "0.75" }
                "4" { $UiOpacity = "0.60" }
                "5" { $UiOpacity = Read-Host "Nhap gia tri (vd: 0.8)" }
                default { if ($oChoice) { $UiOpacity = $oChoice } else { exit 0 } }
            }
        }
        "16" {
            $profilesDir = Join-Path $RepoRoot "kanagawa-theme\profiles"
            $pFiles = @(Get-ChildItem -Path $profilesDir -Filter "*.json" -ErrorAction SilentlyContinue)
            if ($pFiles.Count -gt 0) {
                Write-Host ""
                Write-Host "--- Danh sach Profile co san ---" -ForegroundColor Yellow
                for ($i = 0; $i -lt $pFiles.Count; $i++) {
                    $pName = [System.IO.Path]::GetFileNameWithoutExtension($pFiles[$i].Name)
                    Write-Host "  [$($i+1)] $pName"
                }
                Write-Host ""
                $pSel = Read-Host "Chon so profile (1-$($pFiles.Count)) hoac nhap ten"
                if ($pSel -match '^\d+$' -and [int]$pSel -ge 1 -and [int]$pSel -le $pFiles.Count) {
                    $Profile = [System.IO.Path]::GetFileNameWithoutExtension($pFiles[[int]$pSel - 1].Name)
                } elseif ($pSel) {
                    $Profile = $pSel
                } else {
                    Write-Host "[kanagawa] Cancelled / Da huy."; exit 0
                }
            } else {
                $Profile = Read-Host "Chua co profile luu san. Nhap ten profile can tai"
                if (-not $Profile) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
            }
        }
        "17" {
            $SaveProfile = Read-Host "Enter profile name to save / Nhap ten profile muon luu"
            if (-not $SaveProfile) { Write-Host "[kanagawa] Cancelled / Da huy."; exit 0 }
        }
        "18" {
            $ListProfiles = $true
        }
        "19" {
            $profilesDir = Join-Path $RepoRoot "kanagawa-theme\profiles"
            $pFiles = @(Get-ChildItem -Path $profilesDir -Filter "*.json" -ErrorAction SilentlyContinue)
            if ($pFiles.Count -gt 0) {
                Write-Host ""
                Write-Host "--- Danh sach Profile can xoa ---" -ForegroundColor Yellow
                for ($i = 0; $i -lt $pFiles.Count; $i++) {
                    $pName = [System.IO.Path]::GetFileNameWithoutExtension($pFiles[$i].Name)
                    Write-Host "  [$($i+1)] $pName"
                }
                Write-Host ""
                $pSel = Read-Host "Chon so profile can xoa (1-$($pFiles.Count)) hoac nhap ten"
                if ($pSel -match '^\d+$' -and [int]$pSel -ge 1 -and [int]$pSel -le $pFiles.Count) {
                    $DeleteProfile = [System.IO.Path]::GetFileNameWithoutExtension($pFiles[[int]$pSel - 1].Name)
                } elseif ($pSel) {
                    $DeleteProfile = $pSel
                } else {
                    Write-Host "[kanagawa] Cancelled / Da huy."; exit 0
                }
            } else {
                Write-Host "Chua co profile nao de xoa."
                exit 0
            }
        }
        "20" { }
        "0"  { exit 0 }
        default { Write-Host "Invalid choice / Lua chon khong hop le."; exit 1 }
    }
}

if ($ListProfiles -or $DeleteProfile) {
    $NoReload = $true
}

$nodeArgs = @($ApplyScript)
if ($Preset)            { $nodeArgs += @("--preset", $Preset) }
if ($Profile)           { $nodeArgs += @("--load-profile", $Profile) }
if ($SaveProfile)       { $nodeArgs += @("--save-profile", $SaveProfile) }
if ($DeleteProfile)     { $nodeArgs += @("--delete-profile", $DeleteProfile) }
if ($ListProfiles)      { $nodeArgs += "--list-profiles" }
if ($FontFamily)        { $nodeArgs += @("--font-family", $FontFamily) }
if ($UiOpacity)         { $nodeArgs += @("--ui-opacity", $UiOpacity) }
if ($NoWallpaper)       { $nodeArgs += "--no-wallpaper" }
elseif ($Wallpaper)     { $nodeArgs += @("--wallpaper", $Wallpaper) }
if ($WallpaperPosition) { $nodeArgs += @("--wallpaper-pos", $WallpaperPosition) }
if ($UserAvatar)        { $nodeArgs += @("--user-avatar", $UserAvatar) }
if ($AgentAvatar)       { $nodeArgs += @("--agent-avatar", $AgentAvatar) }
if ($DarkPrimary)       { $nodeArgs += @("--dark-primary", $DarkPrimary) }
if ($DarkBlue)          { $nodeArgs += @("--dark-blue", $DarkBlue) }
if ($DarkAqua)          { $nodeArgs += @("--dark-aqua", $DarkAqua) }
if ($DarkSurface)       { $nodeArgs += @("--dark-surface", $DarkSurface) }
if ($LightPrimary)      { $nodeArgs += @("--light-primary", $LightPrimary) }

if (Get-Command 'node' -ErrorAction SilentlyContinue) {
    & node @nodeArgs
} elseif (Get-Command 'bun' -ErrorAction SilentlyContinue) {
    $env:BUN_TMPDIR = $env:TEMP
    & bun @nodeArgs
} elseif (Test-Path "$env:USERPROFILE\.bun\bin\bun.exe") {
    $env:BUN_TMPDIR = $env:TEMP
    & "$env:USERPROFILE\.bun\bin\bun.exe" @nodeArgs
} elseif (Test-Path "C:\Users\TranMC\AppData\Local\Programs\Python\Python312\Lib\site-packages\playwright\driver\node.exe") {
    & "C:\Users\TranMC\AppData\Local\Programs\Python\Python312\Lib\site-packages\playwright\driver\node.exe" @nodeArgs
} else {
    Write-Host "[kanagawa] Node.js or Bun not found!" -ForegroundColor Red
    exit 1
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not $NoReload) {
    & $SwitchScript kanagawa
}
