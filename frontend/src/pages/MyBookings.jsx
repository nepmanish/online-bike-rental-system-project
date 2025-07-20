import React from 'react';
import BookingsList from '../components/BookingsList';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="mt-2 text-gray-600">
              Manage your current and past reservations
            </p>
          </div>
          <Link 
            to="/new-booking" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            + New Booking
          </Link>
        </div>
        <BookingsList />
      </div>
    </div>
  );
};

export default MyBookings;