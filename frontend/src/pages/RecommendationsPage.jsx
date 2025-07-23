import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BikeCard from '../components/BikeCard';
import { getBikeRecommendations } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaExclamationTriangle } from 'react-icons/fa';

const RecommendationsPage = () => {
  const { currentUser } = useAuth();
  const [recommendedBikes, setRecommendedBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!currentUser) {
          throw new Error('You must be logged in to view recommendations');
        }
        
        const bikes = await getBikeRecommendations();
        
        // Ensure bikes is always an array
        if (!Array.isArray(bikes)) {
          throw new Error('Invalid response format from server');
        }
        
        setRecommendedBikes(bikes);
      } catch (err) {
        console.error('Recommendation error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
        <p className="mb-6 text-gray-600">
          Login to get bike recommendations tailored to your preferences
        </p>
        <a 
          href="/login" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Login Now
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Finding your perfect bikes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">Recommendations Unavailable</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="space-y-3">
            <Link 
              to="/preferences" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Set Your Preferences
            </Link>
            <p className="text-gray-600">
              Set your preferences to get personalized bike recommendations
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">Recommended for You</h1>
      
      {currentUser.preferences && (
        <p className="text-gray-600 mb-8">
          Based on your preferences: 
          <span className="font-semibold"> ${currentUser.preferences.price || '0'}</span> price, 
          <span className="font-semibold"> {currentUser.preferences.engineCC || '0'}cc</span> engine, 
          <span className="font-semibold"> {currentUser.preferences.weight || '0'}kg</span> weight
        </p>
      )}

      {recommendedBikes.length === 0 ? (
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No recommendations found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find bikes matching your preferences. Try updating your preferences or browse our full collection.
          </p>
          <a 
            href="/bikes" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Browse All Bikes
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedBikes.map(bike => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;