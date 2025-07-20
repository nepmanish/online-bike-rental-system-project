import api from './api';

export const getAvailableBikes = () => api.get('/bikes?isBooked=false');
export const getBikeDetails = (id) => api.get(`/bikes/${id}`);