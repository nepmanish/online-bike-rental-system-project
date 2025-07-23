import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../services/api';

const UserPreferencesPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [preferences, setPreferences] = useState({
    price: currentUser?.preferences?.price || 1000,
    engineCC: currentUser?.preferences?.engineCC || 150,
    weight: currentUser?.preferences?.weight || 140
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await updateUserPreferences(currentUser._id, preferences);
      setSuccess(true);
      setTimeout(() => {
        navigate('/recommendations');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Your Preferences</h1>
          <p className="text-gray-600 mb-8">
            Tell us what you're looking for in a bike so we can recommend the perfect match for you.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700">Preferences updated successfully! Redirecting to recommendations...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Daily Price Range (NRs)
              </label>
              <input
                type="range"
                name="price"
                min="500"
                max="5000"
                step="100"
                value={preferences.price}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>NRs 500</span>
                <span className="font-medium">NRs {preferences.price}</span>
                <span>NRs 5000</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Engine Size (CC)
              </label>
              <input
                type="range"
                name="engineCC"
                min="100"
                max="1000"
                step="50"
                value={preferences.engineCC}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>100 CC</span>
                <span className="font-medium">{preferences.engineCC} CC</span>
                <span>1000 CC</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Weight Range (kg)
              </label>
              <input
                type="range"
                name="weight"
                min="100"
                max="300"
                step="10"
                value={preferences.weight}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>100 kg</span>
                <span className="font-medium">{preferences.weight} kg</span>
                <span>300 kg</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-900 mb-2">Your Preferences Summary:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Daily budget: NRs {preferences.price}</li>
                <li>• Engine size: {preferences.engineCC} CC</li>
                <li>• Weight preference: {preferences.weight} kg</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/bikes')}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesPage;