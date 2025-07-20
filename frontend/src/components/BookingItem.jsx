import React, { useState } from 'react';
import { cancelBooking } from '../services/bookingService';
import { getBikeDetails } from '../services/bikeService';

const BookingItem = ({ booking, onCancel }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState('');
  const [bikeDetails, setBikeDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const { data } = await getBikeDetails(booking.bike._id);
        setBikeDetails(data.data.bike);
      } catch (err) {
        console.error('Failed to fetch bike details:', err);
      }
    };
    
    if (showDetails && !bikeDetails) {
      fetchBikeDetails();
    }
  }, [showDetails, booking.bike._id, bikeDetails]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    setIsCancelling(true);
    setError('');
    
    try {
      await cancelBooking(booking._id);
      onCancel(booking._id);
    } catch (err) {
      setError(err.message || 'Cancellation failed');
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">
            {booking.bike.model} • {booking.bike.color}
          </h3>
          <p className="text-sm text-gray-600">
            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
          </p>
          <p className={`text-sm font-medium mt-1 ${
            booking.status === 'active' ? 'text-green-600' : 'text-red-600'
          }`}>
            Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </p>
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Locations</h4>
              <p className="text-gray-600">
                <span className="font-medium">Pickup:</span> {booking.pickupLocation}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Drop-off:</span> {booking.dropLocation}
              </p>
            </div>
            
            {bikeDetails && (
              <div>
                <h4 className="font-medium text-gray-700">Bike Details</h4>
                <p className="text-gray-600">Type: {bikeDetails.type}</p>
                <p className="text-gray-600">Price: ${bikeDetails.price}/hr</p>
                <p className="text-gray-600">Rating: {bikeDetails.ratingsAverage} ({bikeDetails.ratingsQuantity} reviews)</p>
              </div>
            )}
          </div>
          
          {booking.status === 'active' && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300 disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="mt-3 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default BookingItem;