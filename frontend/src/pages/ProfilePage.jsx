import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UserPreferencesForm from '../components/UserPreferencesForm';
import { updateUserPreferences } from '../services/api';

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  const [preferences, setPreferences] = useState({
    price: 0,
    engineCC: 0,
    weight: 0
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    if (currentUser?.preferences) {
      setPreferences(currentUser.preferences);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserPreferences(currentUser._id, preferences);
      updateUser(updatedUser);
      setMessage({
        type: 'success',
        content: 'Preferences updated successfully!'
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', content: '' });
      }, 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        content: 'Failed to update preferences. Please try again.'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <p className="font-medium">{currentUser?.name}</p>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <p className="font-medium">{currentUser?.email}</p>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Account Type</label>
            <p className="font-medium capitalize">{currentUser?.role || 'user'}</p>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Member Since</label>
            <p className="font-medium">
              {new Date(currentUser?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Riding Preferences</h2>
        
        {message.content && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.content}
          </div>
        )}
        
        <UserPreferencesForm 
          preferences={preferences} 
          setPreferences={setPreferences} 
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProfilePage;