# PowerShell script to start the backend server
# This avoids the && syntax issue in PowerShell

Write-Host "Starting Pounds Communication Backend Server..." -ForegroundColor Green

# Change to backend directory
Set-Location -Path "backend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the server
Write-Host "Starting server on http://localhost:5000" -ForegroundColor Cyan
npm start 