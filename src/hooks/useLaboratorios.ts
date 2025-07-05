// src/hooks/useLaboratorios.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

export interface Laboratorio {
  id: number;
  nombre: string;
  capacidad: number;
}

export const useLaboratorios = () => {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLaboratorios = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/v1/laboratorios');
      setLaboratorios(response.data);
    } catch (error) {
      console.error("Error al obtener laboratorios", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaboratorios();
  }, [fetchLaboratorios]);

  const createLaboratorio = async (data: Omit<Laboratorio, 'id'>) => {
    try {
      const response = await apiClient.post('/v1/laboratorios', data);
      // Añadimos el nuevo laboratorio a nuestro estado local para que la UI se actualice al instante
      setLaboratorios(prev => [...prev, response.data]);
      return response.data; // Devolvemos el nuevo lab por si es necesario
    } catch (error) {
      console.error("Error al crear el laboratorio", error);
      throw error; // Lanzamos el error para manejarlo en el componente si es necesario
    }
  };

  return { laboratorios, loading, createLaboratorio, refresh: fetchLaboratorios };
};