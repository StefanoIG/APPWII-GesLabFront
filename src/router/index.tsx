// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { ReservasPage } from '../pages/ReservasPage';
import { LaboratoriosPage } from '../pages/LaboratoriosPage';
import { UsuariosPage } from '../pages/UsuariosPage';
import { IncidentesPage } from '../pages/IncidentesPage';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true, // Esta será la ruta principal "/"
            element: <ReservasPage />,
          },
          {
            path: '/laboratorios',
            element: <LaboratoriosPage />,
          },
          {
            path: '/usuarios',
            element: <UsuariosPage />,
          },
          {
            path: '/incidentes',
            element: <IncidentesPage />,
          },
        ],
      },
    ],
  },
]);