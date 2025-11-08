@echo off
echo ========================================
echo    Code Quest 2 - Starting Server
echo ========================================
echo.

REM Check if node_modules exists, if not install dependencies
if not exist node_modules (
    echo Installing dependencies - this may take a few minutes...
    echo.
    npm install --legacy-peer-deps
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please make sure Node.js is installed from https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
    echo.
)

REM Start the development server in a new window
echo Starting development server...
echo.

REM Start npm dev in a new window
start "Code Quest 2 - Server" cmd /k "npm run dev"

REM Open the browser immediately (it will show error initially, then work once server starts)
echo Opening website in your browser instantly...
echo.
start http://localhost:3000

echo.
echo ========================================
echo    Website opened in browser!
echo ========================================
echo.
echo The server is starting in the other window.
echo.
echo NOTE: If you see a connection error:
echo    - Just wait 10-15 seconds for the server to start
echo    - Then click the Reload button in your browser
echo    - The page will load automatically once the server is ready
echo.
echo To stop the server, press Ctrl+C in the server window.
echo You can close this window - the server will keep running.
echo.
timeout /t 3 /nobreak >nul
