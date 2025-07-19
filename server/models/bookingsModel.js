// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bike: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bike',
    required: [true, 'Booking must belong to a bike'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user'],
  },
  pickupLocation: {
    type: String,
    required: [true, 'Please provide a pickup location'],
  },
  dropLocation: {
    type: String,
    required: [true, 'Please provide a drop location'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: String,
  bookedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active',
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('bike').populate('user', 'name email');
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
