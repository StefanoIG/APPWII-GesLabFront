# Docker Setup para GesLab Frontend

Esta aplicación React está configurada para ejecutarse en Docker con nginx en el puerto 3000.

## 🚀 Inicio Rápido

### Producción

```bash
# Construir y ejecutar con docker-compose
docker-compose up -d

# O construir la imagen manualmente
docker build -t geslab-frontend:latest .
docker run -p 3000:3000 geslab-frontend:latest
```

### Desarrollo (con hot-reload)

```bash
# Ejecutar en modo desarrollo
docker-compose -f docker-compose.dev.yml up -d
```

## 📋 Comandos Útiles

### PowerShell (Windows)
```powershell
# Construir imagen de producción
.\scripts\docker-build.ps1

# Ejecutar en producción
docker-compose up -d

# Ejecutar en desarrollo
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose logs -f frontend

# Parar contenedores
docker-compose down
```

### Bash (Linux/Mac)
```bash
# Construir imagen de producción
./scripts/docker-build.sh

# Ejecutar en producción
docker-compose up -d

# Ejecutar en desarrollo
docker-compose -f docker-compose.dev.yml up -d
```

## 🐳 Archivos Docker

- **Dockerfile**: Imagen de producción con nginx
- **Dockerfile.dev**: Imagen de desarrollo con Vite
- **docker-compose.yml**: Configuración de producción
- **docker-compose.dev.yml**: Configuración de desarrollo
- **nginx.conf**: Configuración de nginx para SPA
- **.dockerignore**: Archivos excluidos del build

## 🌐 Puertos

- **Producción**: http://localhost:3000
- **Desarrollo**: http://localhost:3000 (mapeado a puerto interno 5173)

## 🔧 Configuración

### Variables de Entorno

La aplicación usa las siguientes variables de entorno:

- `NODE_ENV`: production/development
- `VITE_API_BASE_URL`: URL del backend API

### Nginx

La configuración de nginx incluye:
- Soporte para SPA (Single Page Application)
- Gzip compression
- Cache para archivos estáticos
- Headers de seguridad
- Health check endpoint

## 🏥 Health Check

La aplicación incluye un endpoint de health check en `/health` que devuelve:
```
HTTP 200 OK
healthy
```

## 🔍 Troubleshooting

### Puerto ya en uso
```bash
# Verificar qué está usando el puerto 3000
netstat -ano | findstr :3000

# En Linux/Mac
lsof -i :3000
```

### Problemas de permisos (Windows)
```powershell
# Ejecutar PowerShell como administrador si hay problemas de permisos
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Logs del contenedor
```bash
# Ver logs en tiempo real
docker-compose logs -f frontend

# Ver logs de nginx
docker exec -it geslab-frontend tail -f /var/log/nginx/access.log
```

## 📁 Estructura de Archivos Docker

```
.
├── Dockerfile              # Imagen de producción
├── Dockerfile.dev          # Imagen de desarrollo
├── docker-compose.yml      # Compose de producción
├── docker-compose.dev.yml  # Compose de desarrollo
├── nginx.conf              # Configuración de nginx
├── .dockerignore           # Archivos excluidos
└── scripts/
    ├── docker-build.sh     # Script de build (Linux/Mac)
    └── docker-build.ps1    # Script de build (Windows)
```
