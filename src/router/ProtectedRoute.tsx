// src/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Si no está autenticado, lo redirigimos a la página de login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizamos la página solicitada (a través de Outlet)
  return <Outlet />;
};