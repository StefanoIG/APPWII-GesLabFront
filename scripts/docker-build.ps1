# scripts/docker-build.ps1
Write-Host "Construyendo imagen Docker para GesLab Frontend..." -ForegroundColor Cyan

# Construir la imagen
docker build -t geslab-frontend:latest .

if ($LASTEXITCODE -eq 0) {
    Write-Host "Imagen construida exitosamente!" -ForegroundColor Green
    Write-Host "Para ejecutar el contenedor, usa:" -ForegroundColor Yellow
    Write-Host "   docker run -p 3000:3000 geslab-frontend:latest" -ForegroundColor White
    Write-Host ""
    Write-Host "O usa docker-compose:" -ForegroundColor Yellow
    Write-Host "   docker-compose up -d" -ForegroundColor White
} else {
    Write-Host "Error al construir la imagen Docker" -ForegroundColor Red
    exit 1
}
