const express = require('express');
const bikesControllers = require('../controllers/bikesControllers');
const authControllers = require('../controllers/authController');

const router = express.Router();

//this will be part of middleware stack if we're into this router sub app
// router.param("id", bikesControllers.checkID);
router
  .route('/top-5-cheap')
  .get(authControllers.protect, bikesControllers.aliasTopBikes, bikesControllers.getAllBikes);

router.route('/bike-stats').get(authControllers.protect, bikesControllers.getBikeStats);

router.post('/recluster', authControllers.protect, authControllers.restrictedTo('admin'), bikesControllers.reclusterBikes);


router
  .route('/')
  .get(authControllers.protect, bikesControllers.getAllBikes)
  .post(authControllers.protect, authControllers.restrictedTo('admin'), bikesControllers.createBike);
router
  .route('/:id')
  .get(authControllers.protect, bikesControllers.getBike)
  .patch(authControllers.protect, authControllers.restrictedTo('admin'), bikesControllers.updateBike)
  .delete(
    authControllers.protect,
    authControllers.restrictedTo('admin'),
    bikesControllers.deleteBike,
  );

module.exports = router;
