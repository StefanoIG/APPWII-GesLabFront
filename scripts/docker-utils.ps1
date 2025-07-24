# scripts/docker-utils.ps1
param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("build", "start", "stop", "restart", "logs", "clean", "dev")]
    [string]$Action
)

$PROJECT_NAME = "geslab-frontend"

function Show-Help {
    Write-Host ""
    Write-Host "Docker Utilities para GesLab Frontend" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Uso: .\scripts\docker-utils.ps1 <accion>" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Acciones disponibles:" -ForegroundColor Green
    Write-Host "  build    - Construir imagen de produccion" -ForegroundColor White
    Write-Host "  start    - Iniciar contenedores de produccion" -ForegroundColor White
    Write-Host "  stop     - Parar contenedores" -ForegroundColor White
    Write-Host "  restart  - Reiniciar contenedores" -ForegroundColor White
    Write-Host "  logs     - Ver logs en tiempo real" -ForegroundColor White
    Write-Host "  clean    - Limpiar imagenes y contenedores" -ForegroundColor White
    Write-Host "  dev      - Iniciar en modo desarrollo" -ForegroundColor White
    Write-Host ""
}

switch ($Action) {
    "build" {
        Write-Host "Construyendo imagen de produccion..." -ForegroundColor Cyan
        docker build -t $PROJECT_NAME:latest .
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Imagen construida exitosamente!" -ForegroundColor Green
        }
    }
    
    "start" {
        Write-Host "Iniciando contenedores de produccion..." -ForegroundColor Cyan
        docker-compose up -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Contenedores iniciados!" -ForegroundColor Green
            Write-Host "Aplicacion disponible en: http://localhost:3000" -ForegroundColor Yellow
        }
    }
    
    "stop" {
        Write-Host "Parando contenedores..." -ForegroundColor Cyan
        docker-compose down
        Write-Host "Contenedores parados!" -ForegroundColor Green
    }
    
    "restart" {
        Write-Host "Reiniciando contenedores..." -ForegroundColor Cyan
        docker-compose down
        docker-compose up -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Contenedores reiniciados!" -ForegroundColor Green
        }
    }
    
    "logs" {
        Write-Host "Mostrando logs en tiempo real (Ctrl+C para salir)..." -ForegroundColor Cyan
        docker-compose logs -f frontend
    }
    
    "clean" {
        Write-Host "Limpiando imagenes y contenedores..." -ForegroundColor Cyan
        docker-compose down --rmi all --volumes --remove-orphans
        docker system prune -f
        Write-Host "Limpieza completada!" -ForegroundColor Green
    }
    
    "dev" {
        Write-Host "Iniciando en modo desarrollo..." -ForegroundColor Cyan
        docker-compose -f docker-compose.dev.yml up -d
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Modo desarrollo iniciado!" -ForegroundColor Green
            Write-Host "Aplicacion disponible en: http://localhost:3000" -ForegroundColor Yellow
            Write-Host "Hot-reload habilitado!" -ForegroundColor Yellow
        }
    }
    
    default {
        Show-Help
    }
}
