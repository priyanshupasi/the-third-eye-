@echo off
title Third Eye Engine Startup
cls
echo =======================================================
echo          THIRD EYE ACCESSIBILITY SERVICE ENGINE
echo =======================================================
echo.
echo Checking dependencies...
if not exist node_modules (
    echo [System] Installing Node dependencies...
    call npm install
)

if not exist public\models\ssd_mobilenetv1_model.bin (
    echo [System] Downloading face-api AI models...
    call node download-models.js
)

echo.
echo =======================================================
echo [Ready] Starting local server...
echo.
echo To run this on your mobile device:
echo 1. Ensure your laptop and mobile are connected to the SAME Wi-Fi.
echo 2. Open the browser on your mobile and type: https://[YOUR-LAPTOP-IP]:5173
echo.
echo Your Laptop's Local IP Address(es):
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "ipv4"') do (
    for /f "tokens=1" %%b in ("%%a") do echo    https://%%b:5173
)
echo.
echo 3. NOTE: Since this uses a self-signed certificate, your browser
echo    will show a "Connection not private" warning.
echo    Click "Advanced" and choose "Proceed" or "Continue" 
echo    to allow the mobile browser to access your camera.
echo =======================================================
echo.
call npm run dev
pause
