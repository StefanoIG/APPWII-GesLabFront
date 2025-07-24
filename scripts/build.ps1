# scripts/build.ps1
Write-Host "=== GesLab Frontend Docker Build ===" -ForegroundColor Green
Write-Host ""

Write-Host "Construyendo imagen Docker..." -ForegroundColor Cyan
docker build -t geslab-frontend:latest .

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS: Imagen construida correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para ejecutar:" -ForegroundColor Yellow
    Write-Host "  docker run -p 3000:3000 geslab-frontend:latest"
    Write-Host ""
    Write-Host "O con docker-compose:" -ForegroundColor Yellow
    Write-Host "  docker-compose up -d"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERROR: Fallo al construir la imagen" -ForegroundColor Red
    Write-Host ""
    exit 1
}
