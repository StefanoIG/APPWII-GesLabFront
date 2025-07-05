import { useReservas } from '../hooks/useReservas';

export const ReservasPage = () => {
  const { reservas, loading, error } = useReservas();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Mis Reservas</h1>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>{reserva.laboratorio.nombre} - {reserva.fecha}</li>
        ))}
      </ul>
    </div>
  );
};