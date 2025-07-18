# PowerShell script to start the frontend development server
# This avoids the && syntax issue in PowerShell

Write-Host "Starting Pounds Communication Frontend..." -ForegroundColor Green

# Change to frontend directory
Set-Location -Path "frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "Starting Next.js development server on http://localhost:3000" -ForegroundColor Cyan
npm run dev 