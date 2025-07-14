import { Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span>© 2025 GesLab - Sistema de Gestión de Laboratorios</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Versión 1.0.0</span>
              <span>•</span>
              <span>Desarrollado con ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;