// src/pages/HomePage.tsx
import { ReservaCard } from '../components/ReservaCard';
import { Navbar } from '../components/layout';
import { useReservas } from '../hooks/useReservas';

export const HomePage = () => {
  const { reservas, loading, error } = useReservas();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Reservas Recientes</h2>
        
        {loading && <p>Cargando reservas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservas.map(reserva => (
              <ReservaCard key={reserva.id} reserva={reserva} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};