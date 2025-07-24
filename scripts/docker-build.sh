#!/bin/bash
# scripts/docker-build.sh

echo "🐋 Construyendo imagen Docker para GesLab Frontend..."

# Construir la imagen
docker build -t geslab-frontend:latest .

echo "✅ Imagen construida exitosamente!"
echo "📦 Para ejecutar el contenedor, usa:"
echo "   docker run -p 3000:3000 geslab-frontend:latest"
echo ""
echo "🚀 O usa docker-compose:"
echo "   docker-compose up -d"
