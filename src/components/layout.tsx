// src/components/layout/Navbar.tsx
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  // Aquí podríamos obtener el nombre del usuario desde el store si lo guardamos al hacer login
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Gestión de Laboratorios</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Bienvenido, Admin</span>
        <button onClick={logout} className="text-gray-500 hover:text-red-600 transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};