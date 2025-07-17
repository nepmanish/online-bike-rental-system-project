const express = require('express');
const bikesControllers = require('../controllers/bikesControllers');
const authControllers = require('../controllers/authController');

const router = express.Router();

//this will be part of middleware stack if we're into this router sub app
// router.param("id", bikesControllers.checkID);
router
  .route('/top-5-cheap')
  .get(bikesControllers.aliasTopBikes, bikesControllers.getAllBikes);

router.route('/bike-stats').get(bikesControllers.getBikeStats);

router.post('/recluster', authControllers.protect, authControllers.restrictedTo('admin'), bikesControllers.reclusterBikes);


router
  .route('/')
  .get(authControllers.protect, bikesControllers.getAllBikes)
  .post(bikesControllers.createBike);
router
  .route('/:id')
  .get(bikesControllers.getBike)
  .patch(bikesControllers.updateBike)
  .delete(
    authControllers.protect,
    authControllers.restrictedTo('admin'),
    bikesControllers.deleteBike,
  );

module.exports = router;
