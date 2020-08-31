const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Signup and login
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// Forgot and reset user password
router.post('/forgotPassword', authController.forgotPassword);
router.delete('/resetPassword/:token', authController.resetPassword);

// Update user data or delete user
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

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
