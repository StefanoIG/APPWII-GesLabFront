// src/types/index.ts

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

export interface Laboratorio {
  id: number;
  nombre: string;
  capacidad: number;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: { id: number; nombre: string; };
}

export interface Incidente {
  id: number;
  reserva_id: number;
  descripcion: string;
  resuelto: boolean;
  reserva?: { laboratorio?: { nombre?: string } };
}
