// src/hooks/useReservas.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

// --- Interfaces ---
export interface Reserva {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
  motivo: string;
  laboratorio: { id: number; nombre: string; };
  usuario: { id: number; nombre: string; };
}

export interface NuevaReserva {
  laboratorio_id: number;
  materia_id?: number | null;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  motivo: string;
}

// --- Hook ---
export const useReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/v1/reservas');
      setReservas(response.data.data || []);
    } catch (err) {
      setError('No se pudieron cargar las reservas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservas();
  }, [fetchReservas]);

  const createReserva = async (data: NuevaReserva) => {
    try {
      const response = await apiClient.post('/v1/reservas', data);
      // Refrescamos la lista para mostrar la nueva reserva
      fetchReservas(); 
      return response.data;
    } catch (error) {
      // Pasamos el error para que el componente lo maneje (ej. mostrar un toast)
      throw error;
    }
  };

  const updateReserva = async (id: number, data: { estado: string; observaciones_admin?: string }) => {
    try {
      const response = await apiClient.put(`/v1/reservas/${id}`, data);
      // Actualizamos la reserva específica en nuestro estado local
      setReservas(prev => prev.map(r => (r.id === id ? { ...r, ...response.data } : r)));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const extendReserva = async (id: number, minutos: number) => {
    try {
      const response = await apiClient.post(`/v1/reservas/${id}/extender`, { minutos_extension: minutos });
       fetchReservas(); // Refrescamos para obtener la hora actualizada
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  return { reservas, loading, error, createReserva, updateReserva, extendReserva, refresh: fetchReservas };
};