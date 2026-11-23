# ============================================================================
# Kanagawa Theme uninstaller / Go cai dat Kanagawa Theme - v2.3.0
# ============================================================================
param(
    [switch]$KillRunning
)
$ErrorActionPreference = 'Stop'

$AppDir    = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity'
$Resources = Join-Path $AppDir 'resources'
$Asar      = Join-Path $Resources 'app.asar'
$Backup    = Join-Path $Resources 'app.asar.pixel-backup'

function Write-Step($msg) { Write-Host "[kanagawa] $msg" -ForegroundColor Cyan }
function Fail($msg) { Write-Host "[kanagawa] ERROR / LOI: $msg" -ForegroundColor Red; exit 1 }

$procs = @(Get-Process -Name 'Antigravity', 'language_server*' -ErrorAction SilentlyContinue)
if ($procs.Count -gt 0) {
    if ($KillRunning) {
        Write-Step "Stopping running Antigravity / Dang dong Antigravity..."
        $procs | Stop-Process -Force -Confirm:$false -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
    else {
        Fail "Antigravity is running. Close it or run: .\uninstall.ps1 -KillRunning | Antigravity dang chay, hay dong han hoac chay: .\uninstall.ps1 -KillRunning"
    }
}

if (Test-Path $Backup) {
    $isCurrentlyPatched = $false
    if (Test-Path $Asar) {
        try {
            # Kiem tra xem app.asar hien tai co chua patch pixelTheme khong
            # Neu Antigravity vua auto-update len ban moi, app.asar da la ban goc moi
            $asarText = [System.IO.File]::ReadAllText($Asar, [System.Text.Encoding]::ASCII)
            if ($asarText.Contains('pixelTheme')) {
                $isCurrentlyPatched = $true
            }
        }
        catch {
            $isCurrentlyPatched = $true
        }
    }

    if ($isCurrentlyPatched) {
        Write-Step "Restoring original app.asar / Dang khoi phuc app.asar goc..."
        Copy-Item $Backup $Asar -Force
    }
    else {
        Write-Step "Current app.asar is already stock (likely updated). Removing stale backup only. / app.asar hien tai da la ban goc, chi xoa file backup cu."
    }
    Remove-Item $Backup -Force -Confirm:$false
}
else {
    Write-Step "No backup found (app.asar.pixel-backup). Nothing to restore. / Khong co ban backup de khoi phuc."
}

$ThemeDst = Join-Path $Resources 'kanagawa-theme'
if (Test-Path $ThemeDst) {
    Write-Step "Removing kanagawa-theme assets / Dang xoa thu muc kanagawa-theme..."
    Remove-Item $ThemeDst -Recurse -Force -Confirm:$false
}

$ActiveConfigPath = Join-Path $Resources 'active-theme.json'
if (Test-Path $ActiveConfigPath) {
    Remove-Item $ActiveConfigPath -Force -Confirm:$false
}

Write-Step "Done! Antigravity restored to stock. / Hoan tat! Antigravity da tro ve mac dinh."
