// src/pages/HomePage.tsx
import { ReservaCard } from '../components/ReservaCard';
import { useReservas } from '../hooks/useReservas';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, Building2 } from 'lucide-react';

export const ReservasPage = () => {
  const { reservas, loading, error } = useReservas();

  // Calcular estadísticas
  const stats = {
    total: reservas.length,
    aprobadas: reservas.filter(r => r.estado === 'aprobada').length,
    pendientes: reservas.filter(r => r.estado === 'pendiente_aprobacion').length,
    enUso: reservas.filter(r => r.estado === 'en_uso').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reservas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-700 font-medium mb-2">Error al cargar las reservas</p>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader 
        title="Dashboard de Reservas" 
        subtitle="Gestiona y supervisa todas las reservas de laboratorios"
      >
        <Button size="lg" className="shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Nueva Reserva
        </Button>
      </PageHeader>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Reservas</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Aprobadas</p>
              <p className="text-3xl font-bold">{stats.aprobadas}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold">{stats.pendientes}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">En Uso</p>
              <p className="text-3xl font-bold">{stats.enUso}</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Lista de Reservas */}
      {reservas.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Reservas Recientes</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp className="h-4 w-4" />
              <span>{reservas.length} reservas encontradas</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservas.map(reserva => (
              <ReservaCard key={reserva.id} reserva={reserva} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No hay reservas</h3>
          <p className="text-gray-500 mb-6">Aún no se han creado reservas en el sistema</p>
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Crear Primera Reserva
          </Button>
        </div>
      )}
    </>
  );
};