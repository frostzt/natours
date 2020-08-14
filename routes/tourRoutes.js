const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// GET and POST req
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// GET, PATCH, and DELETE req
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
