const express = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);
router.patch('/updateMe', authController.protect, usersController.updateMe);
router.delete('/deleteMe', authController.protect, usersController.deleteMe);

router.get('/recommend', authController.protect, usersController.recommendBikes);
router.patch('/preferences', authController.protect, usersController.setPreferences);


router
  .route('/')
  .get(authController.protect, authController.restrictedTo('admin'), usersController.getAllUsers);
  
router
  .route('/:id')
  .get(authController.protect, authController.restrictedTo('admin'), usersController.getUser)
  .patch(authController.protect, authController.restrictedTo('admin'), usersController.updateUser)
  .delete(authController.protect, authController.restrictedTo('admin'), usersController.deleteUser);

module.exports = router;
