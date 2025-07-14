// src/hooks/useIncidentes.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';
import type { Incidente } from '../types';

// --- Hook ---
export const useIncidentes = () => {
  const [incidentes, setIncidentes] = useState<Incidente[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidentes = useCallback(async () => {
    setLoading(true);
    const response = await apiClient.get('/v1/incidentes');
    setIncidentes(response.data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchIncidentes();
  }, [fetchIncidentes]);

  const createIncidente = async (data: { reserva_id: number; descripcion: string }) => {
    try {
      const response = await apiClient.post('/v1/incidentes', data);
      // Refrescamos la lista para obtener todos los datos anidados correctamente
      await fetchIncidentes();
      return response.data;
    } catch (error) {
      console.error("Error al crear el incidente", error);
      throw error;
    }
  };

  const updateIncidente = async (id: number, data: Partial<Omit<Incidente, 'id'>>) => {
    try {
      const response = await apiClient.put(`/v1/incidentes/${id}`, data);
      // Actualizamos el incidente específico en nuestro estado local
      setIncidentes(prev => prev.map(inc => (inc.id === id ? { ...inc, ...response.data } : inc)));
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el incidente", error);
      throw error;
    }
  };

  const resolveIncidente = async (id: number) => {
    try {
      const response = await apiClient.put(`/v1/incidentes/${id}`, { resuelto: true });
      // Actualizamos el estado local
      setIncidentes(prev => prev.map(inc => (inc.id === id ? { ...inc, resuelto: true } : inc)));
      return response.data;
    } catch (error) {
      console.error("Error al resolver el incidente", error);
      throw error;
    }
  };

  const deleteIncidente = async (id: number) => {
    try {
      await apiClient.delete(`/v1/incidentes/${id}`);
      // Filtramos el incidente eliminado del estado local
      setIncidentes(prev => prev.filter(inc => inc.id !== id));
    } catch (error) {
      console.error("Error al eliminar el incidente", error);
      throw error;
    }
  };

  return { 
    incidentes, 
    loading, 
    createIncidente, 
    updateIncidente, 
    resolveIncidente, 
    deleteIncidente, 
    refresh: fetchIncidentes 
  };
};