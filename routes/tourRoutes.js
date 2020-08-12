const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

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
