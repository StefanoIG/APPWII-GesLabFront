// src/components/ReservaCard.tsx
import { Clock, Calendar, User, MapPin, Eye, X, Play } from 'lucide-react';
import type { Reserva } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface Props {
  reserva: Reserva;
}

export const ReservaCard = ({ reserva }: Props) => {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'aprobada': return 'bg-green-50 border-green-200';
      case 'en_uso': return 'bg-blue-50 border-blue-200';
      case 'pendiente_aprobacion': return 'bg-yellow-50 border-yellow-200';
      case 'rechazada': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${getStatusColor(reserva.estado)}`}>
      {/* Header con laboratorio y estado */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{reserva.laboratorio.nombre}</h3>
            <p className="text-sm text-gray-500">Laboratorio</p>
          </div>
        </div>
        <Badge status={reserva.estado} />
      </div>

      {/* Información de la reserva */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center space-x-3 text-gray-600">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">{reserva.fecha}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">{reserva.hora_inicio} - {reserva.hora_fin}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <User className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">{reserva.usuario.nombre}</span>
        </div>
      </div>
      
      {/* Motivo */}
      <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Motivo</p>
        <p className="text-sm text-gray-700 leading-relaxed">{reserva.motivo}</p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          Ver Detalles
        </Button>
        
        {reserva.estado === 'aprobada' && (
          <>
            <Button size="sm" variant="success">
              <Play className="h-4 w-4 mr-2" />
              Iniciar
            </Button>
            <Button size="sm" variant="danger">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </>
        )}
        
        {reserva.estado === 'pendiente_aprobacion' && (
          <Button size="sm" variant="secondary">
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
};