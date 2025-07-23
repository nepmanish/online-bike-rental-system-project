import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ==============================
// Interceptors
// ==============================
api.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject({
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status
    });
  }
);

// ==============================
// 🚲 Bike API
// ==============================

export const getBikes = async () => {
  const response = await api.get('/bikes');
  return response.data.data;
};

export const getBikeById = async (id) => {
  const response = await api.get(`/bikes/${id}`);
  return response.data.data;
};

export const createBike = async (bikeData) => {
  const response = await api.post('/bikes', bikeData);
  return response.data.data;
};

export const updateBike = async (id, bikeData) => {
  const response = await api.patch(`/bikes/${id}`, bikeData);
  return response.data.data;
};

export const deleteBike = async (bikeId) => {
  await api.delete(`/bikes/${bikeId}`);
};

export const getBikeRecommendations = async () => {
  try {
    const response = await api.get('/users/recommend');
    // Ensure we always return an array
    return response.data.data || [];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return []; // Return empty array on error
  }
};
export const reclusterBikes = async (k = 3) => {
  const response = await api.post('/bikes/recluster', { k });
  return response.data;
};

export const getBikeStats = async () => {
  const response = await api.get('/bikes/bike-stats');
  return response.data.data;
};

// ==============================
// 👤 User API
// ==============================

export const updateUserPreferences = async (userId, preferences) => {
  const response = await api.patch('/users/preferences', { preferences });
  return response.data.data.user;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data;
};

export const updateUser = async (userId, data) => {
  const response = await api.patch(`/users/${userId}`, data);
  return response.data.data.user;
};

export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
};

// ==============================
// 🧠 Clustering API (Admin)
// ==============================

export const getCentroids = async () => {
  const response = await api.get('/centroids');
  return response.data;
};

// ==============================
// Export Axios Instance (Optional use)
// ==============================

export default api;
