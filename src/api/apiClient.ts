// src/api/apiClient.ts
import axios from 'axios';
import { APP_CONFIG } from '../config';
import { useAuthStore } from '../store/authStore';

const apiClient = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores (como 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token no es válido, deslogueamos al usuario
      useAuthStore.getState().logout();
      // Y lo redirigimos a la página de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;