// src/components/ui/Badge.tsx
import clsx from 'clsx';
import React from 'react';

interface Props {
  status: 'aprobada' | 'en_uso' | 'pendiente_aprobacion' | 'cancelada' | 'autocancelada' | 'rechazada' | string;
}

export const Badge = ({ status }: Props) => {
  const baseClasses = 'px-2 py-1 text-xs font-bold rounded-full inline-block';

  const statusClasses = {
    aprobada: 'bg-green-100 text-green-800',
    en_uso: 'bg-blue-100 text-blue-800',
    pendiente_aprobacion: 'bg-yellow-100 text-yellow-800',
    rechazada: 'bg-red-100 text-red-800',
    cancelada: 'bg-gray-100 text-gray-800',
    autocancelada: 'bg-gray-100 text-gray-800',
  };
  
  // Usamos `clsx` con un fallback para estados no definidos.
  return (
    <span className={clsx(baseClasses, statusClasses[status] || 'bg-gray-100 text-gray-800')}>
      {status.replace(/_/g, ' ').toUpperCase()}
    </span>
  );
};