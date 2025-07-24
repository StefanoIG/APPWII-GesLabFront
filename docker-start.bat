@echo off
echo GesLab Frontend - Docker Quick Start
echo.

echo Selecciona una opcion:
echo 1. Construir y ejecutar en produccion
echo 2. Ejecutar en modo desarrollo (hot-reload)
echo 3. Ver logs
echo 4. Parar contenedores
echo 5. Limpiar Docker
echo.

set /p choice="Ingresa tu opcion (1-5): "

if "%choice%"=="1" (
    echo.
    echo Construyendo y ejecutando en produccion...
    docker-compose down 2>nul
    docker build -t geslab-frontend:latest .
    docker-compose up -d
    echo.
    echo Aplicacion ejecutandose en http://localhost:3000
    pause
) else if "%choice%"=="2" (
    echo.
    echo Ejecutando en modo desarrollo...
    docker-compose -f docker-compose.dev.yml down 2>nul
    docker-compose -f docker-compose.dev.yml up -d
    echo.
    echo Aplicacion de desarrollo ejecutandose en http://localhost:3000
    echo Hot-reload habilitado!
    pause
) else if "%choice%"=="3" (
    echo.
    echo Mostrando logs (Ctrl+C para salir)...
    docker-compose logs -f frontend
) else if "%choice%"=="4" (
    echo.
    echo Parando contenedores...
    docker-compose down
    docker-compose -f docker-compose.dev.yml down 2>nul
    echo Contenedores parados!
    pause
) else if "%choice%"=="5" (
    echo.
    echo Limpiando Docker...
    docker-compose down --rmi all --volumes --remove-orphans 2>nul
    docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans 2>nul
    docker system prune -f
    echo Limpieza completada!
    pause
) else (
    echo.
    echo Opcion invalida
    pause
)
