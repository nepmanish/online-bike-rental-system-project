
const express = require('express');
const bookingController = require('../controllers/bookingsController');
const authController = require('../controllers/authController');

const router = express.Router();

// Only logged-in users can book or cancel
router.use(authController.protect);

router.post('/', bookingController.createBooking);
router.patch('/cancel/:id', bookingController.cancelBooking);
router.get('/', bookingController.getMyBookings);

// Admin routes
router.get('/admin/all', authController.restrictedTo('admin'), bookingController.getAllBookings);
router.patch('/admin/:id/status', authController.restrictedTo('admin'), bookingController.updateBookingStatus);

module.exports = router;

