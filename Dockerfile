# Dockerfile
# Etapa 1: Build de la aplicación
FROM node:18-alpine AS builder

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache git

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Instalar todas las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar el código fuente
COPY . .

# Build de la aplicación
RUN npm run build

# Etapa 2: Servidor nginx para servir la aplicación
FROM nginx:alpine

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
