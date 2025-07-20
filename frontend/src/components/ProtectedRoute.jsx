import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Debugging
    console.log('Current User:', currentUser);
    console.log('Required Role:', role);
  }, [currentUser, role]);

  if (loading) {
    return <div className="text-center py-8">Loading authorization...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;