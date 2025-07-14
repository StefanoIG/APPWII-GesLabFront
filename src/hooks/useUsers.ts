// src/hooks/useUsers.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';
import type { User } from '../types';

// --- Hook ---
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const response = await apiClient.get('/v1/users');
    setUsers(response.data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id: number) => {
    await apiClient.delete(`/v1/users/${id}`);
    // Filtramos el usuario eliminado del estado local
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const createUser = async (userData: { nombre: string; email: string; password: string; rol_id: number }) => {
    try {
      const response = await apiClient.post('/v1/users', userData);
      // Añadimos el nuevo usuario a nuestro estado local
      setUsers(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error al crear el usuario", error);
      throw error;
    }
  };

  const updateUser = async (id: number, userData: { nombre: string; email: string; rol_id: number }) => {
    try {
      const response = await apiClient.put(`/v1/users/${id}`, userData);
      // Actualizamos el usuario específico en nuestro estado local
      setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...response.data } : user)));
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      throw error;
    }
  };
  
  // Aquí podrías añadir funciones para crear y actualizar usuarios...

  return { users, loading, deleteUser, createUser, updateUser, refresh: fetchUsers };
};