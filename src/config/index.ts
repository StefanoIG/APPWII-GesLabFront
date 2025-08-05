// src/config/index.ts

// Configuración de la API que puede ser sobrescrita por variables de entorno
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8443/api';

// Otras configuraciones de la aplicación
export const APP_CONFIG = {
  API_BASE_URL,
  APP_NAME: 'GesLab Frontend',
  VERSION: '1.0.0',
  
  // Configuración de desarrollo
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Timeouts
  API_TIMEOUT: 10000, // 10 segundos
  
  // Configuración de Docker
  DOCKER_PORT: 3000,
};