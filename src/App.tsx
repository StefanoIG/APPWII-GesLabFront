import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-layout">
      {/* Aquí podrías tener un Navbar o un Sidebar que sea visible en todas las páginas */}
      <header>
        {/* <Navbar /> */}
      </header>
      <main className="p-4">
        <Outlet /> {/* Las páginas protegidas se renderizarán aquí */}
      </main>
    </div>
  );
}

export default App;