const express = require('express');
/*const {
  getTripValidator,
  createTripValidator,
  updateTripValidator,
  deleteTripValidator,
} = require('../utils/validators/tripValidator');*/

const authService = require('../services/authService');

const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  startTrip,
  endTrip,
  getTripsByRoute
} = require('../services/tripService');

const router = express.Router();

router.post(
  '/start',
  startTrip
);
router.post(
  '/end',
  endTrip
);

router
  .route('/:id')
  .get( getTrip)

router.get("/by-route/:routeId", getTripsByRoute);

module.exports = router;
