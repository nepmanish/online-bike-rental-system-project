import React, { useState, useEffect } from 'react';
import BookingItem from './BookingItem';
import { getUserBookings } from '../services/bookingService';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBookings();
        setBookings(response.data.bookings || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  const handleCancelSuccess = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ));
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md ${
              filter === 'active' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1 rounded-md ${
              filter === 'cancelled' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">
            {filter === 'all' 
              ? "You don't have any bookings yet" 
              : filter === 'active'
                ? "No active bookings"
                : "No cancelled bookings"}
          </p>
          {filter === 'all' && (
            <a 
              href="/new-booking" 
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Book your first bike
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <BookingItem 
              key={booking._id} 
              booking={booking} 
              onCancel={handleCancelSuccess} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsList;