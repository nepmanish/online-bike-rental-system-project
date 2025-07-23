// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BikesPage from './pages/BikesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import RecommendationsPage from './pages/RecommendationsPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import NewBooking from './pages/NewBooking';
import MyBookings from './pages/MyBookings';
import UserPreferencesPage from './pages/UserPreferencesPage';
import BikeDetail from './pages/BikeDetail';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        {/* Removed Router wrapper */}
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow container mx-auto px-4 py-8">
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bikes" element={<BikesPage />} />
            <Route path="/bikes/:id" element={<BikeDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/recommendations" element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/new-booking" element={
              <ProtectedRoute>
                <NewBooking />
              </ProtectedRoute>
            } />
            <Route path="/my-bookings" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/preferences" element={
              <ProtectedRoute>
                <UserPreferencesPage />
              </ProtectedRoute>
            } />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;