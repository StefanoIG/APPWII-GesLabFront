// src/pages/LaboratoriosPage.tsx
import { useState } from 'react';
import { useLaboratorios } from '../hooks/useLaboratorios';
import type { Laboratorio } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Edit, Trash2, PlusCircle, Building2, Users, MapPin } from 'lucide-react';

export const LaboratoriosPage = () => {
  const { laboratorios, loading, createLaboratorio, updateLaboratorio, deleteLaboratorio } = useLaboratorios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState(20);
  const [editingLab, setEditingLab] = useState<Laboratorio | null>(null);
  const [deletingLab, setDeletingLab] = useState<Laboratorio | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createLaboratorio({ nombre, capacidad });
    setIsModalOpen(false);
    setNombre('');
    setCapacidad(20);
  };

  const handleEdit = (lab: Laboratorio) => {
    setEditingLab(lab);
    setNombre(lab.nombre);
    setCapacidad(lab.capacidad);
    setIsEditModalOpen(true);
  };

  const handleDelete = (lab: Laboratorio) => {
    setDeletingLab(lab);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingLab) {
      try {
        await deleteLaboratorio(deletingLab.id);
        setIsDeleteModalOpen(false);
        setDeletingLab(null);
      } catch (error) {
        console.error('Error al eliminar laboratorio:', error);
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLab) {
      try {
        await updateLaboratorio(editingLab.id, { nombre, capacidad });
        setIsEditModalOpen(false);
        setEditingLab(null);
        setNombre('');
        setCapacidad(20);
      } catch (error) {
        console.error('Error al actualizar laboratorio:', error);
      }
    }
  };

  const resetModals = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingLab(null);
    setDeletingLab(null);
    setNombre('');
    setCapacidad(20);
  };

  // ...existing code...

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando laboratorios...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader 
        title="Gestión de Laboratorios" 
        subtitle="Administra los espacios y recursos de laboratorio"
      >
        <Button size="lg" onClick={() => setIsModalOpen(true)} className="shadow-lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          Nuevo Laboratorio
        </Button>
      </PageHeader>

      {/* Estadísticas de laboratorios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Total Laboratorios</p>
              <p className="text-3xl font-bold">{laboratorios.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-indigo-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Capacidad Total</p>
              <p className="text-3xl font-bold">{laboratorios.reduce((acc, lab) => acc + lab.capacidad, 0)}</p>
            </div>
            <Users className="h-8 w-8 text-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Disponibles</p>
              <p className="text-3xl font-bold">{laboratorios.length}</p>
            </div>
            <MapPin className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Tabla de laboratorios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Lista de Laboratorios</h3>
        </div>
        
        <Table headers={["Laboratorio", "Capacidad", "Estado", "Acciones"]}>
          {laboratorios.map((lab) => (
            <tr key={lab.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{lab.nombre}</p>
                    <p className="text-sm text-gray-500">ID: {lab.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{lab.capacidad} personas</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Disponible
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(lab)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(lab)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Modal para crear laboratorio */}
      <Modal title="Crear Nuevo Laboratorio" isOpen={isModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Laboratorio
            </label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: Laboratorio de Química"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad Máxima
            </label>
            <input 
              type="number" 
              value={capacidad} 
              onChange={(e) => setCapacidad(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="20"
              min="1"
              max="100"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Número máximo de estudiantes</p>
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
              Crear Laboratorio
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal para editar laboratorio */}
      <Modal title="Editar Laboratorio" isOpen={isEditModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Laboratorio
            </label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: Laboratorio de Química"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad Máxima
            </label>
            <input 
              type="number" 
              value={capacidad} 
              onChange={(e) => setCapacidad(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="20"
              min="1"
              max="100"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Número máximo de estudiantes</p>
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
              Actualizar Laboratorio
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal title="Confirmar Eliminación" isOpen={isDeleteModalOpen} onClose={() => resetModals()}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">¿Estás seguro?</h4>
              <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
            </div>
          </div>
          
          {deletingLab && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Se eliminará el laboratorio: <strong>{deletingLab.nombre}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Capacidad: {deletingLab.capacidad} personas
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => resetModals()}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Laboratorio
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};