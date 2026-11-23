@echo off
chcp 65001 >nul
echo =====================================================================
echo   DANG GO CAI DAT ANTIGRAVITY THEME ^& KHOI PHUC MAC DINH (v2.3.0)
echo =====================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0uninstall.ps1" -KillRunning %*
if errorlevel 1 (
    echo.
    echo [!] Co loi xay ra trong qua trinh go cai dat.
    pause
) else (
    echo.
    echo =====================================================================
    echo   GO CAI DAT HOAN TAT 100%%!
    echo   Antigravity da duoc khoi phuc ve giao dien mac dinh.
    echo =====================================================================
    timeout /t 5
)
