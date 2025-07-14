// src/hooks/useMaterias.ts
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';
import type { Materia } from '../types';

// --- Hook ---
export const useMaterias = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterias = useCallback(async () => {
    setLoading(true);
    const response = await apiClient.get('/v1/materias');
    setMaterias(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMaterias();
  }, [fetchMaterias]);

  const createMateria = async (data: Omit<Materia, 'id'>) => {
    const response = await apiClient.post('/v1/materias', data);
    setMaterias(prev => [...prev, response.data]);
  };

  return { materias, loading, createMateria, refresh: fetchMaterias };
};