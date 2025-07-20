import api from './api';

export const createBooking = (data) => api.post('/bookings', data);
export const cancelBooking = (id) => api.patch(`/bookings/cancel/${id}`);
export const getUserBookings = () => api.get('/bookings/my-bookings');