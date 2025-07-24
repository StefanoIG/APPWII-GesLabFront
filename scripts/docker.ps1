# scripts/docker.ps1
param([string]$Command = "help")

switch ($Command.ToLower()) {
    "build" {
        Write-Host "Construyendo imagen..." -ForegroundColor Cyan
        docker build -t geslab-frontend:latest .
    }
    
    "start" {
        Write-Host "Iniciando contenedores..." -ForegroundColor Cyan
        docker-compose up -d
        Write-Host "Aplicacion en: http://localhost:3000" -ForegroundColor Green
    }
    
    "dev" {
        Write-Host "Iniciando modo desarrollo..." -ForegroundColor Cyan
        docker-compose -f docker-compose.dev.yml up -d
        Write-Host "Desarrollo en: http://localhost:3000" -ForegroundColor Green
    }
    
    "stop" {
        Write-Host "Parando contenedores..." -ForegroundColor Cyan
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
    }
    
    "logs" {
        Write-Host "Mostrando logs..." -ForegroundColor Cyan
        docker-compose logs -f frontend
    }
    
    "clean" {
        Write-Host "Limpiando Docker..." -ForegroundColor Cyan
        docker-compose down --rmi all --volumes
        docker system prune -f
    }
    
    default {
        Write-Host ""
        Write-Host "=== Docker Scripts para GesLab Frontend ===" -ForegroundColor Green
        Write-Host ""
        Write-Host "Uso: .\scripts\docker.ps1 <comando>" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Comandos disponibles:" -ForegroundColor White
        Write-Host "  build  - Construir imagen"
        Write-Host "  start  - Iniciar produccion"
        Write-Host "  dev    - Iniciar desarrollo"
        Write-Host "  stop   - Parar contenedores"
        Write-Host "  logs   - Ver logs"
        Write-Host "  clean  - Limpiar todo"
        Write-Host ""
    }
}
