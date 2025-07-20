import React from 'react';
import { Link } from 'react-router-dom';

const BikeCard = ({ bike }) => {
  return (
    <div className="bike-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={bike.imageCover || 'https://via.placeholder.com/300'} 
          alt={bike.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{bike.name}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-blue-600">NRs{bike.price}</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {bike.engineCC} CC
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{bike.summary}</p>
        <Link 
          to={`/bikes/${bike._id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BikeCard;