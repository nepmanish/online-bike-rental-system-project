import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BikeCard = ({ bike, onBookClick }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (onBookClick) {
      onBookClick(bike);
    } else {
      // Navigate to booking page with bike pre-selected
      navigate('/new-booking', { state: { selectedBike: bike } });
    }
  };

  const isAvailable = !bike.isBooked;

  return (
    <div className="bike-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={bike.imageCover || 'https://via.placeholder.com/300'} 
          alt={bike.name}
          className="w-full h-full object-cover"
        />
        {!isAvailable && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Booked
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{bike.name}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-blue-600">NRs{bike.price}/day</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {bike.engineCC} CC
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{bike.summary}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Weight:</span>
            <span className="font-medium">{bike.weight} kg</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Rating:</span>
            <span className="font-medium">⭐ {bike.ratingsAverage?.toFixed(1) || '4.5'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? 'Available' : 'Booked'}
            </span>
          </div>
        </div>

        <button
          onClick={handleBookClick}
          disabled={!isAvailable}
          className={`block w-full mt-4 py-2 rounded transition ${
            isAvailable
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default BikeCard;