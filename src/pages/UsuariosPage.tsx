// src/pages/UsuariosPage.tsx
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Edit, Trash2, PlusCircle, Users, UserCheck, Shield, Mail } from 'lucide-react';

export const UsuariosPage = () => {
  const { users, loading, deleteUser, createUser, updateUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('estudiante');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mapeamos el nombre del rol a su ID correspondiente
      const rolId = rol === 'admin' ? 1 : 2; // 1 para admin, 2 para estudiante
      await createUser({ nombre, email, password, rol_id: rolId });
      resetModals();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setNombre(user.nombre);
    setEmail(user.email);
    setRol(user.rol.nombre);
    setPassword(''); // No mostramos la contraseña actual
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingUser) {
      try {
        await deleteUser(deletingUser.id);
        setIsDeleteModalOpen(false);
        setDeletingUser(null);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        // Mapeamos el nombre del rol a su ID correspondiente
        const rolId = rol === 'admin' ? 1 : 2; // 1 para admin, 2 para estudiante
        await updateUser(editingUser.id, { nombre, email, rol_id: rolId });
        resetModals();
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    }
  };

  const resetModals = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingUser(null);
    setDeletingUser(null);
    setNombre('');
    setEmail('');
    setPassword('');
    setRol('estudiante');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  // Calcular estadísticas
  const stats = {
    total: users.length,
    estudiantes: users.filter(u => u.rol.nombre === 'estudiante').length,
    profesores: users.filter(u => u.rol.nombre === 'profesor').length,
    administradores: users.filter(u => u.rol.nombre === 'administrador').length,
  };

  return (
    <>
      <PageHeader 
        title="Gestión de Usuarios" 
        subtitle="Administra los usuarios del sistema"
      >
        <Button size="lg" onClick={() => setIsModalOpen(true)} className="shadow-lg">
          <PlusCircle className="h-5 w-5 mr-2" />
          Nuevo Usuario
        </Button>
      </PageHeader>

      {/* Estadísticas de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Usuarios</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Estudiantes</p>
              <p className="text-3xl font-bold">{stats.estudiantes}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Profesores</p>
              <p className="text-3xl font-bold">{stats.profesores}</p>
            </div>
            <UserCheck className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Administradores</p>
              <p className="text-3xl font-bold">{stats.administradores}</p>
            </div>
            <Shield className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Lista de Usuarios</h3>
        </div>
        
        <Table headers={["Usuario", "Email", "Rol", "Acciones"]}>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.nombre}</p>
                    <p className="text-sm text-gray-500">ID: {user.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.rol.nombre === 'administrador' 
                    ? 'bg-red-100 text-red-800'
                    : user.rol.nombre === 'profesor'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.rol.nombre}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(user)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Modal para crear usuario */}
      <Modal title="Crear Nuevo Usuario" isOpen={isModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="juan@universidad.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              minLength={6}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Mínimo 6 caracteres</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select 
              value={rol} 
              onChange={(e) => setRol(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="estudiante">Estudiante</option>
              <option value="admin">Administrador</option>
            </select>
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
              Crear Usuario
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal title="Editar Usuario" isOpen={isEditModalOpen} onClose={() => resetModals()}>
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="juan@universidad.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select 
              value={rol} 
              onChange={(e) => setRol(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="estudiante">Estudiante</option>
              <option value="admin">Administrador</option>
            </select>
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
              Actualizar Usuario
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
          
          {deletingUser && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Se eliminará el usuario: <strong>{deletingUser.nombre}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Email: {deletingUser.email} • Rol: {deletingUser.rol.nombre}
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
              Eliminar Usuario
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
