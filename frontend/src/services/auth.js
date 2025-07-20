import api from './api';

export const loginUser = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data.data.user;
};

export const registerUser = async (userData) => {
  const response = await api.post('/users/signup', userData);
  return response.data.data.user;
};

export const logoutUser = async () => {
  await api.get('/users/logout');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data.data.user;
  } catch (error) {
    return null;
  }
};