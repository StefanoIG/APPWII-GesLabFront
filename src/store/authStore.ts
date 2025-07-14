// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definimos la estructura del estado y sus acciones
interface AuthState {
  token: string | null;
  user: { nombre: string; email: string; rol: string } | null; // Guardaremos info básica del usuario
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

// Creamos el store
export const useAuthStore = create<AuthState>()(
  // `persist` envuelve nuestro store para guardarlo en localStorage
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Acción para guardar el token
      setToken: (token) => set({ token, isAuthenticated: true }),

      // Acción para guardar los datos del usuario
      setUser: (user) => set({ user }),

      // Acción para limpiar el estado al cerrar sesión
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
    }
  )
);