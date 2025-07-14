// src/components/layout/Navbar.tsx
import { LogOut, Calendar, Building2, Users, AlertTriangle, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/laboratorios', label: 'Laboratorios', icon: Building2 },
    { href: '/usuarios', label: 'Usuarios', icon: Users },
    { href: '/incidentes', label: 'Incidentes', icon: AlertTriangle },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GesLab</h1>
              <p className="text-blue-100 text-sm">Gestión de Laboratorios</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="bg-blue-700 rounded-lg px-4 py-2">
                <p className="text-white text-sm font-medium">Bienvenido, Admin</p>
                <p className="text-blue-200 text-xs">Administrador</p>
              </div>
            </div>
            <button 
              onClick={logout} 
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden md:block">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};