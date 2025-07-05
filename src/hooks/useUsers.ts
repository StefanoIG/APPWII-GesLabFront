// src/hooks/useUsers.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

// --- Interface ---
export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: { id: number; nombre: string; };
}

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
  
  // Aquí podrías añadir funciones para crear y actualizar usuarios...

  return { users, loading, deleteUser, refresh: fetchUsers };
};