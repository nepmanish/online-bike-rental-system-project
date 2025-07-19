const express = require('express');
const bookingController = require('../controllers/bookingsController');
const authController = require('../controllers/authController');

const router = express.Router();

// Only logged-in users can book or cancel
router.use(authController.protect);

router.post('/', bookingController.createBooking);
router.patch('/cancel/:id', bookingController.cancelBooking);

module.exports = router;
