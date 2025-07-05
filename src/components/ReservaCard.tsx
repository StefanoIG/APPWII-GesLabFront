// src/components/ReservaCard.tsx
import { Clock, Building, Calendar, User } from 'lucide-react';
import { Reserva } from '../hooks/useReservas';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  reserva: Reserva;
}

export const ReservaCard = ({ reserva }: Props) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800">{reserva.laboratorio.nombre}</h3>
        <Badge status={reserva.estado} />
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{reserva.fecha}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{reserva.hora_inicio} - {reserva.hora_fin}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>Reservado por: {reserva.usuario.nombre}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
        <span className="font-semibold">Motivo:</span> {reserva.motivo}
      </p>

      <div className="mt-2 flex gap-2">
        <Button variant="primary">Ver Detalles</Button>
        {reserva.estado === 'aprobada' && <Button variant="danger">Cancelar</Button>}
      </div>
    </Card>
  );
};