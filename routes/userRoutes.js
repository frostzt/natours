const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Signup and login
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// Forgot and reset
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

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
