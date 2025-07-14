// src/pages/ReservasPage.tsx
import { useState } from 'react';
import { useReservas } from '../hooks/useReservas';
import { useLaboratorios } from '../hooks/useLaboratorios';
import type { Reserva } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { 
  Calendar, 
  Clock, 
  PlusCircle, 
  Building2, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Edit
} from 'lucide-react';

export const ReservasPage = () => {
  const { reservas, loading, createReserva, updateReserva } = useReservas();
  const { laboratorios } = useLaboratorios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [laboratorio_id, setLaboratorioId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora_inicio, setHoraInicio] = useState('');
  const [hora_fin, setHoraFin] = useState('');
  const [motivo, setMotivo] = useState('');
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReserva({
        laboratorio_id: parseInt(laboratorio_id),
        fecha,
        hora_inicio,
        hora_fin,
        motivo
      });
      resetModals();
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };

  const handleEdit = (reserva: Reserva) => {
    setEditingReserva(reserva);
    setLaboratorioId(reserva.laboratorio.id.toString());
    setFecha(reserva.fecha);
    setHoraInicio(reserva.hora_inicio);
    setHoraFin(reserva.hora_fin);
    setMotivo(reserva.motivo || '');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReserva) {
      try {
        await updateReserva(editingReserva.id, {
          estado: editingReserva.estado,
          observaciones_admin: motivo
        });
        resetModals();
      } catch (error) {
        console.error('Error al actualizar reserva:', error);
      }
    }
  };

  const resetModals = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setEditingReserva(null);
    setLaboratorioId('');
    setFecha('');
    setHoraInicio('');
    setHoraFin('');
    setMotivo('');
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

  // Calcular estadísticas
  const stats = {
    total: reservas.length,
    pendientes: reservas.filter(r => r.estado === 'pendiente').length,
    aprobadas: reservas.filter(r => r.estado === 'aprobada').length,
    rechazadas: reservas.filter(r => r.estado === 'rechazada').length,
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'aprobada':
        return 'bg-green-100 text-green-800';
      case 'rechazada':
        return 'bg-red-100 text-red-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'aprobada':
        return <CheckCircle className="h-4 w-4" />;
      case 'rechazada':
        return <XCircle className="h-4 w-4" />;
      case 'pendiente':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <PageHeader 
        title="Gestión de Reservas" 
        subtitle="Administra las reservas de laboratorios"
      >
        <Button size="lg" onClick={() => setIsModalOpen(true)} className="shadow-lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Reserva
        </Button>
      </PageHeader>

      {/* Estadísticas de reservas */}
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

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold">{stats.pendientes}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-200" />
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

        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Rechazadas</p>
              <p className="text-3xl font-bold">{stats.rechazadas}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-200" />
          </div>
        </div>
      </div>

      {/* Tabla de reservas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Lista de Reservas</h3>
        </div>
        
        <Table headers={["Laboratorio", "Fecha y Hora", "Usuario", "Estado", "Acciones"]}>
          {reservas.map((reserva) => (
            <tr key={reserva.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{reserva.laboratorio.nombre}</p>
                    <p className="text-sm text-gray-500">ID: {reserva.laboratorio.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{reserva.fecha}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{reserva.hora_inicio} - {reserva.hora_fin}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{reserva.usuario.nombre}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoBadge(reserva.estado)}`}>
                  {getEstadoIcon(reserva.estado)}
                  <span className="ml-1 capitalize">{reserva.estado}</span>
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(reserva)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Modal para crear reserva */}
      <Modal title="Nueva Reserva" isOpen={isModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Laboratorio
            </label>
            <select 
              value={laboratorio_id} 
              onChange={(e) => setLaboratorioId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Seleccionar laboratorio</option>
              {laboratorios.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.nombre} (Capacidad: {lab.capacidad})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input 
              type="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora Inicio
              </label>
              <input 
                type="time" 
                value={hora_inicio} 
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora Fin
              </label>
              <input 
                type="time" 
                value={hora_fin} 
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo de la Reserva
            </label>
            <textarea 
              value={motivo} 
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Describe el propósito de la reserva..."
              rows={3}
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
              <PlusCircle className="h-4 w-4 mr-2" />
              Crear Reserva
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal para editar reserva */}
      <Modal title="Editar Reserva" isOpen={isEditModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea 
              value={motivo} 
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Agregar observaciones administrativas..."
              rows={4}
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
              <Edit className="h-4 w-4 mr-2" />
              Actualizar Reserva
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};