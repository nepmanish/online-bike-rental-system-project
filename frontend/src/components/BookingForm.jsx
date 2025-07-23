import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBooking } from '../services/bookingService';
import { getBikes } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const location = useLocation();
  const selectedBike = location.state?.selectedBike;
  
  const [formData, setFormData] = useState({
    bikeId: selectedBike?._id || '',
    pickupLocation: '',
    dropLocation: '',
    startDate: null,
    endDate: null
  });
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await getBikes();
        // Filter only available bikes
        const availableBikes = data.filter(bike => !bike.isBooked);
        setBikes(availableBikes);
      } catch (err) {
        setError(err.message || 'Failed to load bikes');
      }
    };
    fetchBikes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.bikeId || !formData.pickupLocation || !formData.dropLocation || 
        !formData.startDate || !formData.endDate) {
      setError('All fields are required');
      return;
    }
    
    if (formData.startDate >= formData.endDate) {
      setError('End date must be after start date');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        bikeId: formData.bikeId,
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString()
      };
      
      const response = await createBooking(bookingData);
      alert('Booking created successfully!');
      navigate('/my-bookings');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Booking creation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book a Bike</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Bike</label>
          <select
  name="bikeId"
  value={formData.bikeId}
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
>
  <option value="">Choose a bike</option>
  {bikes && bikes.length > 0 ? (
    bikes.map(bike => (
      <option key={bike._id} value={bike._id}>
        {bike.name} - {bike.engineCC}cc (NRs{bike.price}/day)
      </option>
    ))
  ) : (
    <option disabled>No bikes available</option>
  )}
</select>
          {selectedBike && (
            <p className="mt-2 text-sm text-green-600">
              Pre-selected: {selectedBike.name} - {selectedBike.engineCC}cc
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pickup address"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Drop Location</label>
            <input
              type="text"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter drop address"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Start Date & Time</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange('startDate', date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select start time"
              minDate={new Date()}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">End Date & Time</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange('endDate', date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select end time"
              minDate={formData.startDate || new Date()}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;