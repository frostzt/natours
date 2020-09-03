const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const { route } = require('./reviewRoutes');

const router = express.Router();

// Signup and login
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// Forgot and reset user password
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// Update user data or delete user
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

// Restrict the actions below to administrator only
router.use(authController.restrictTo('admin'));

// GET and POST req
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// GET, PATCH, and DELETE req
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
