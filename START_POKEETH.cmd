@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20.9+ is required. Install from https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules\next (
  echo Installing dependencies on first run...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)
echo Launching PokeETH website at http://localhost:3000
call npm run dev
pause
