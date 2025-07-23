
const Booking = require('../models/bookingsModel');
const Bike = require('../models/bikesModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new booking
exports.createBooking = catchAsync(async (req, res, next) => {
  const {
    bikeId,
    pickupLocation,
    dropLocation,
    startDate,
    endDate,
    rating,
    comment,
  } = req.body;

  if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
    return next(new AppError('Invalid start or end date provided', 400));
  }

  const bike = await Bike.findById(bikeId);
  if (!bike) return next(new AppError('Bike not found', 404));

  if (bike.isBooked) return next(new AppError('Bike is already booked', 400));

  // Create booking
  const booking = await Booking.create({
    bike: bikeId,
    user: req.user._id,
    pickupLocation,
    dropLocation,
    startDate,
    endDate,
    rating,
    comment,
    status: 'active',
  });

  // Mark bike as booked
  bike.isBooked = true;

  // Recalculate ratings
  const allRatings = await Booking.find({
    bike: bikeId,
    status: 'active',
    rating: { $ne: null },
  });

  const ratingsQuantity = allRatings.length;
  const ratingsAverage =
    ratingsQuantity === 0
      ? 4.5
      : allRatings.reduce((acc, cur) => acc + cur.rating, 0) /
        ratingsQuantity;

  bike.ratingsQuantity = ratingsQuantity;
  bike.ratingsAverage = ratingsAverage;

  await bike.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

// Cancel an existing booking
exports.cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return next(new AppError('Booking not found', 404));

  if (booking.status === 'cancelled') {
    return next(new AppError('Booking already cancelled', 400));
  }

  // Only booking owner or admin can cancel
  if (
    req.user.role !== 'admin' &&
    booking.user.toString() !== req.user.id.toString()
  ) {
    return next(
      new AppError('You can only cancel your own bookings', 403)
    );
  }

  // Mark booking as cancelled
  booking.status = 'cancelled';
  await booking.save();

  const bike = await Bike.findById(booking.bike._id);
  if (bike) {
    bike.isBooked = false;

    // Recalculate ratings excluding cancelled bookings
    const validRatings = await Booking.find({
      bike: bike._id,
      status: 'active',
      rating: { $exists: true, $ne: null }
    });

    const ratingsQuantity = validRatings.length;
    const ratingsAverage =
      ratingsQuantity === 0
        ? 4.5
        : validRatings.reduce((acc, cur) => acc + cur.rating, 0) /
          ratingsQuantity;

    bike.ratingsQuantity = ratingsQuantity;
    bike.ratingsAverage = ratingsAverage;

    await bike.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: 'success',
    message: 'Booking cancelled successfully',
  });
});


exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

// Admin functions
exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find().sort({ bookedAt: -1 });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.updateBookingStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['active', 'cancelled', 'completed'].includes(status)) {
    return next(new AppError('Invalid booking status', 400));
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  booking.status = status;
  await booking.save();

  // Update bike availability based on booking status
  const bike = await Bike.findById(booking.bike._id);
  if (bike) {
    if (status === 'cancelled' || status === 'completed') {
      bike.isBooked = false;
    } else if (status === 'active') {
      bike.isBooked = true;
    }
    await bike.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

