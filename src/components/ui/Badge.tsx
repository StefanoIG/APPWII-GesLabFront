// src/components/ui/Badge.tsx
import clsx from 'clsx';

interface Props {
  status: 'aprobada' | 'en_uso' | 'pendiente_aprobacion' | 'cancelada' | 'autocancelada' | 'rechazada' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = ({ status, size = 'md' }: Props) => {
  const baseClasses = 'inline-flex items-center font-bold rounded-full border';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const statusClasses: Record<string, string> = {
    aprobada: 'bg-green-50 text-green-700 border-green-200',
    en_uso: 'bg-blue-50 text-blue-700 border-blue-200',
    pendiente_aprobacion: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    rechazada: 'bg-red-50 text-red-700 border-red-200',
    cancelada: 'bg-gray-50 text-gray-700 border-gray-200',
    autocancelada: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      aprobada: 'Aprobada',
      en_uso: 'En Uso',
      pendiente_aprobacion: 'Pendiente',
      rechazada: 'Rechazada',
      cancelada: 'Cancelada',
      autocancelada: 'Cancelada',
    };
    return statusMap[status] || status.replace(/_/g, ' ').toUpperCase();
  };
  
  return (
    <span className={clsx(
      baseClasses, 
      sizeClasses[size],
      statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200'
    )}>
      {getStatusText(status)}
    </span>
  );
};