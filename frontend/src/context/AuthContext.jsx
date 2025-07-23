// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ensure withCredentials is sent
        const { data } = await api.get('/users/me', { withCredentials: true });
        setCurrentUser(data.data.user);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post(
      '/users/login',
      { email, password },
      { withCredentials: true }
    );
    setCurrentUser(data.data.user);
  };

  const signup = async (userData) => {
    const { data } = await api.post(
      '/users/signup',
      userData,
      { withCredentials: true }
    );
    setCurrentUser(data.data.user);
  };

  const logout = async () => {
    await api.get('/users/logout', { withCredentials: true });
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}