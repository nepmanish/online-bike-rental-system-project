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

router
  .route('/')
  .get(authController.protect, usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
