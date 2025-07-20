// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">BikeRental</Link>
          
          <div className="flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/bikes" className="hover:text-blue-300 transition">Bikes</Link>
                <Link to="/recommendations" className="hover:text-blue-300 transition">Recommendations</Link>
                <Link to="/new-booking" className="hover:text-blue-300 transition">Book a Bike</Link>
                <Link to="/my-bookings" className="hover:text-blue-300 transition">My Bookings</Link>
                
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-300 transition">Admin</Link>
                )}
                
                <Link to="/profile" className="hover:text-blue-300 transition">Profile</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;