import React from 'react';
import BookingForm from '../components/BookingForm';

const NewBooking = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Rent a Bike</h1>
          <p className="mt-2 text-gray-600">
            Book your perfect ride with our easy reservation system
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
};

export default NewBooking;