import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaGasPump, FaWeight, FaCalendarAlt, FaStar, FaArrowLeft } from 'react-icons/fa';
import { getBikeById } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await getBikeById(id);
        setBike(response.bike);
      } catch (err) {
        setError('Failed to load bike details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate('/new-booking', { state: { selectedBike: bike } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bike Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/bikes')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Bikes
          </button>
        </div>
      </div>
    );
  }

  const isAvailable = !bike.isBooked;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/bikes')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Bikes
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src={bike.imageCover || 'https://via.placeholder.com/600x400'}
                alt={bike.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{bike.name}</h1>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isAvailable ? 'Available' : 'Booked'}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(bike.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {bike.ratingsAverage} ({bike.ratingsQuantity} reviews)
                </span>
              </div>

              <p className="text-gray-600 mb-6">{bike.description}</p>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FaGasPump className="text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Engine: {bike.engineCC} CC</span>
                </div>
                <div className="flex items-center">
                  <FaWeight className="text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Weight: {bike.weight} kg</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">NRs {bike.price}</span>
                <span className="text-gray-600 ml-2">/ day</span>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={!isAvailable}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  isAvailable
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAvailable ? 'Book Now' : 'Currently Unavailable'}
              </button>

              {!currentUser && isAvailable && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Please <button 
                    onClick={() => navigate('/login')} 
                    className="text-blue-600 hover:underline"
                  >
                    login
                  </button> to book this bike
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Bike</h2>
          <p className="text-gray-600 leading-relaxed">{bike.summary}</p>
          
          {bike.description && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{bike.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeDetail;