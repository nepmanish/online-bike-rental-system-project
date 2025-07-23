import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaCalendar, FaBicycle } from 'react-icons/fa';
import api from '../../services/api';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/bookings/admin/all');
      setBookings(response.data.data.bookings || []);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await api.patch(`/bookings/admin/${bookingId}/status`, { status });
      await fetchAllBookings();
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const filteredBookings = filter === 'all' 
    ? (bookings || []) 
    : (bookings || []).filter(booking => booking.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <div className="flex space-x-2">
          {['all', 'active', 'cancelled', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-md capitalize ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FaCalendar className="text-blue-600 text-xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-900">{bookings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FaCheck className="text-green-600 text-xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-900">
                  {bookings.filter(b => b.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FaBicycle className="text-yellow-600 text-xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FaTimes className="text-red-600 text-xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-900">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bike
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup/Drop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(filteredBookings || []).map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user?.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user?.email || 'No email'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.bike?.name || 'Unknown Bike'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.bike?.engineCC}cc
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>📍 {booking.pickupLocation}</div>
                        <div>🏁 {booking.dropLocation}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>Start: {new Date(booking.startDate).toLocaleDateString()}</div>
                        <div>End: {new Date(booking.endDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {booking.status === 'active' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'completed')}
                              className="text-green-600 hover:text-green-900 px-2 py-1 rounded bg-green-50 hover:bg-green-100"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                              className="text-red-600 hover:text-red-900 px-2 py-1 rounded bg-red-50 hover:bg-red-100"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status === 'cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(booking._id, 'active')}
                            className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100"
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No bookings found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;