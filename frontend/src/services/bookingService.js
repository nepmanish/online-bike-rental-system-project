import api from './api';

export const createBooking = async (data) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(`/bookings/cancel/${id}`);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};