// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import App from '../App'; // El layout principal de la aplicación
import { HomePage } from '../pages/HomePage'; // Página de ejemplo

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />, // Este elemento protege todas las rutas anidadas
    children: [
      {
        element: <App />, // App.tsx actúa como un layout (con navbar, sidebar, etc.)
        children: [
          // Aquí van todas tus páginas protegidas
          {
            path: '/',
            element: <HomePage />,
          },
          // Ejemplo de otras rutas
          // {
          //   path: '/reservas',
          //   element: <ReservasPage />,
          // },
          // {
          //   path: '/laboratorios',
          //   element: <LaboratoriosPage />,
          // },
        ],
      },
    ],
  },
]);