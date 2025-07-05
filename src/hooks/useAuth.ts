// src/hooks/useAuth.ts
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { setToken, logout: logoutFromStore } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { access_token } = response.data;
      if (access_token) {
        setToken(access_token);
        navigate('/'); // Redirige al home después del login
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí podrías manejar el estado de error para mostrarlo en la UI
    }
  };

  const logout = () => {
    logoutFromStore();
    navigate('/login');
  };

  return { login, logout };
};