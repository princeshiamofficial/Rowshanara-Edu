# Dev Cleanup & Start Script
# Kills old processes, cleans cache, starts fresh

Write-Host "Cleaning up..." -ForegroundColor Yellow

# Kill ALL node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Clear .next cache
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Cleared .next cache" -ForegroundColor Green
}

# Set memory limit and start
$env:NODE_OPTIONS = "--max-old-space-size=2048"
Write-Host "Starting dev server (memory limited to 2GB)..." -ForegroundColor Cyan
npx next dev --turbopack -H 127.0.0.1
