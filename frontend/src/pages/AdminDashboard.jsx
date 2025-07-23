import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import BikeManagement from '../components/admin/BikeManagement';
import UserManagement from '../components/admin/UserManagement';
import ClusterManagement from '../components/admin/ClusterManagement';
import SystemAnalytics from '../components/admin/SystemAnalytics';
import BookingManagement from '../components/admin/BookingManagement';
import { FaBicycle, FaUsers, FaChartPie, FaChartBar, FaCalendarAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');

  // Redirect non-admin users
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bikes':
        return <BikeManagement />;
      case 'users':
        return <UserManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'clusters':
        return <ClusterManagement />;
      case 'analytics':
        return <SystemAnalytics />;
      default:
        return <SystemAnalytics />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your bike rental system efficiently
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap border-b">
          <button
            className={`px-6 py-4 flex items-center ${
              activeTab === 'analytics'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <FaChartBar className="mr-2" /> Analytics
          </button>
          
          <button
            className={`px-6 py-4 flex items-center ${
              activeTab === 'bikes'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('bikes')}
          >
            <FaBicycle className="mr-2" /> Bike Management
          </button>
          
          <button
            className={`px-6 py-4 flex items-center ${
              activeTab === 'users'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers className="mr-2" /> User Management
          </button>
          
          <button
            className={`px-6 py-4 flex items-center ${
              activeTab === 'bookings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt className="mr-2" /> Booking Management
          </button>
          
          <button
            className={`px-6 py-4 flex items-center ${
              activeTab === 'clusters'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('clusters')}
          >
            <FaChartPie className="mr-2" /> Clustering
          </button>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;