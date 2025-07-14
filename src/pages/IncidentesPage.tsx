// src/pages/IncidentesPage.tsx
import { useState } from 'react';
import { useIncidentes } from '../hooks/useIncidentes';
import type { Incidente } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { AlertTriangle, CheckCircle, PlusCircle, Eye, Building2, Calendar } from 'lucide-react';

export const IncidentesPage = () => {
  const { incidentes, loading, createIncidente, resolveIncidente } = useIncidentes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [reservaId, setReservaId] = useState('');
  const [viewingIncidente, setViewingIncidente] = useState<Incidente | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createIncidente({ 
        reserva_id: parseInt(reservaId), 
        descripcion 
      });
      resetModals();
    } catch (error) {
      console.error('Error al crear incidente:', error);
    }
  };

  const handleView = (incidente: Incidente) => {
    setViewingIncidente(incidente);
    setIsViewModalOpen(true);
  };

  const handleResolve = async (id: number) => {
    try {
      await resolveIncidente(id);
    } catch (error) {
      console.error('Error al resolver incidente:', error);
    }
  };

  const resetModals = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setViewingIncidente(null);
    setDescripcion('');
    setReservaId('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando incidentes...</p>
        </div>
      </div>
    );
  }

  // Calcular estadísticas
  const stats = {
    total: incidentes.length,
    resueltos: incidentes.filter(i => i.resuelto).length,
    pendientes: incidentes.filter(i => !i.resuelto).length,
  };

  return (
    <>
      <PageHeader 
        title="Gestión de Incidentes" 
        subtitle="Administra y resuelve incidentes del sistema"
      >
        <Button size="lg" onClick={() => setIsModalOpen(true)} className="shadow-lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          Reportar Incidente
        </Button>
      </PageHeader>

      {/* Estadísticas de incidentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Incidentes</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold">{stats.pendientes}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Resueltos</p>
              <p className="text-3xl font-bold">{stats.resueltos}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* Tabla de incidentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Lista de Incidentes</h3>
        </div>
        
        <Table headers={["Incidente", "Laboratorio", "Estado", "Acciones"]}>
          {incidentes.map((incidente) => (
            <tr key={incidente.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${incidente.resuelto ? 'bg-green-100' : 'bg-red-100'}`}>
                    {incidente.resuelto ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Incidente #{incidente.id}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {incidente.descripcion}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {incidente.reserva?.laboratorio?.nombre || 'Laboratorio no disponible'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  incidente.resuelto 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {incidente.resuelto ? 'Resuelto' : 'Pendiente'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleView(incidente)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {!incidente.resuelto && (
                    <Button size="sm" variant="success" onClick={() => handleResolve(incidente.id)}>
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Modal para crear incidente */}
      <Modal title="Reportar Nuevo Incidente" isOpen={isModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID de Reserva
            </label>
            <input 
              type="number" 
              value={reservaId} 
              onChange={(e) => setReservaId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: 123"
              required
            />
            <p className="text-sm text-gray-500 mt-1">ID de la reserva relacionada</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Incidente
            </label>
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Describe detalladamente el incidente ocurrido..."
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => resetModals()}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Reportar Incidente
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal para ver detalles del incidente */}
      <Modal title="Detalles del Incidente" isOpen={isViewModalOpen} onClose={() => resetModals()}>
        {viewingIncidente && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-900">
                Incidente #{viewingIncidente.id}
              </h4>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                viewingIncidente.resuelto 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {viewingIncidente.resuelto ? 'Resuelto' : 'Pendiente'}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Laboratorio:</span>
                <span className="text-sm text-gray-900">
                  {viewingIncidente.reserva?.laboratorio?.nombre || 'Laboratorio no disponible'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Reserva ID:</span>
                <span className="text-sm text-gray-900">{viewingIncidente.reserva_id}</span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Descripción:</h5>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-900 leading-relaxed">
                  {viewingIncidente.descripcion}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => resetModals()}
              >
                Cerrar
              </Button>
              {!viewingIncidente.resuelto && (
                <Button 
                  variant="success" 
                  onClick={() => {
                    handleResolve(viewingIncidente.id);
                    resetModals();
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Resuelto
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
