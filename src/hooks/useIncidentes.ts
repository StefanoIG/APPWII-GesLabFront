// src/hooks/useIncidentes.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

// --- Interface ---
export interface Incidente {
    id: number;
    reserva_id: number;
    descripcion: string;
    resuelto: boolean;
    reserva: { laboratorio: { nombre: string } };
}

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
    const response = await apiClient.post('/v1/incidentes', data);
    fetchIncidentes(); // Refrescamos la lista
    return response.data;
  };

  const resolveIncidente = async (id: number) => {
    const response = await apiClient.put(`/v1/incidentes/${id}`, { resuelto: true });
    // Actualizamos el estado local
    setIncidentes(prev => prev.map(inc => (inc.id === id ? { ...inc, resuelto: true } : inc)));
    return response.data;
  };

  return { incidentes, loading, createIncidente, resolveIncidente, refresh: fetchIncidentes };
};