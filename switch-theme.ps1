# ============================================================================
# Sync kanagawa-theme files into Antigravity resources and hot-reload via CDP
# Dong bo kanagawa-theme vao Antigravity va reload giao dien ngay qua CDP
# ============================================================================
param(
    [string]$Theme = "kanagawa"
)
$ErrorActionPreference = 'Stop'

$ThemeName = 'kanagawa-theme'
$AppDir    = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity'
$Resources = Join-Path $AppDir 'resources'

if (-not (Test-Path $Resources)) {
    Write-Host "[kanagawa] ERROR: Antigravity resources not found at $Resources / Khong tim thay thu muc resources." -ForegroundColor Red
    exit 1
}

$LocalSrc  = Join-Path $PSScriptRoot $ThemeName
$TargetDst = Join-Path $Resources $ThemeName

if (Test-Path $LocalSrc) {
    Write-Host "[kanagawa] Syncing $ThemeName / Dang dong bo $ThemeName..." -ForegroundColor Cyan
    if (-not (Test-Path $TargetDst)) {
        New-Item -ItemType Directory -Path $TargetDst -Force | Out-Null
    }
    Copy-Item "$LocalSrc\*" $TargetDst -Recurse -Force
}

$ActiveConfig = @{ theme = $ThemeName } | ConvertTo-Json
$ActiveConfigPath = Join-Path $Resources 'active-theme.json'
[System.IO.File]::WriteAllText($ActiveConfigPath, $ActiveConfig, (New-Object System.Text.UTF8Encoding($false)))

$PortFile = Join-Path $env:APPDATA 'Antigravity\DevToolsActivePort'
$Reloaded = $false

if (Test-Path $PortFile) {
    try {
        $Port = (Get-Content $PortFile)[0].Trim()
        $NodeScript = @"
const http = require('http');
http.get('http://127.0.0.1:$Port/json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const list = JSON.parse(data);
      const pages = list.filter(x => x.type === 'page' && x.url && /^https?:/i.test(x.url) && x.webSocketDebuggerUrl);
      if (pages.length > 0) {
        let left = pages.length;
        for (const page of pages) {
          const ws = new WebSocket(page.webSocketDebuggerUrl);
          ws.onopen = () => {
            ws.send(JSON.stringify({ id: 1, method: 'Page.reload' }));
            setTimeout(() => { try { ws.close(); } catch {} if (--left <= 0) process.exit(0); }, 150);
          };
          ws.onerror = () => { if (--left <= 0) process.exit(1); };
        }
      } else { process.exit(1); }
    } catch(e) { process.exit(1); }
  });
}).on('error', () => process.exit(1));
"@
        $TempJs = Join-Path $env:TEMP 'kanagawa_hot_reload.js'
        [System.IO.File]::WriteAllText($TempJs, $NodeScript, (New-Object System.Text.UTF8Encoding($false)))
        $jsExe = if (Get-Command 'node' -ErrorAction SilentlyContinue) { 'node' } elseif (Test-Path "$env:USERPROFILE\.bun\bin\bun.exe") { "$env:USERPROFILE\.bun\bin\bun.exe" } else { 'node' }
        $proc = Start-Process -FilePath $jsExe -ArgumentList "`"$TempJs`"" -NoNewWindow -Wait -PassThru -ErrorAction SilentlyContinue
        if ($proc.ExitCode -eq 0) { $Reloaded = $true }
        Remove-Item $TempJs -Force -ErrorAction SilentlyContinue
    } catch {}
}

if ($Reloaded) {
    Write-Host "[kanagawa] Synced & hot-reloaded Antigravity! / Da dong bo va reload giao dien thanh cong!" -ForegroundColor Green
}
else {
    Write-Host "[kanagawa] Synced. Press Ctrl+R in Antigravity (or restart) to apply. / Da dong bo, hay bam Ctrl+R trong Antigravity de ap dung." -ForegroundColor Yellow
}
