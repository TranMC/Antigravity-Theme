@echo off
chcp 65001 >nul
echo =====================================================================
echo   DANG CAI DAT ANTIGRAVITY THEME STUDIO & VIET HOA (v2.1.0)
echo =====================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1" -KillRunning %*
if errorlevel 1 (
    echo.
    echo [!] Co loi xay ra trong qua trinh cai dat.
    pause
) else (
    echo.
    echo =====================================================================
    echo   CAI DAT HOAN TAT 100%!
    echo   Hay mo lai Antigravity de trai nghiem giao dien Acrylic moi & Viet hoa.
    echo =====================================================================
    timeout /t 5
)
