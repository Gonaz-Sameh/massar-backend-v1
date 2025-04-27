const express = require('express');
/*const {
  getTripValidator,
  createTripValidator,
  updateTripValidator,
  deleteTripValidator,
} = require('../utils/validators/tripValidator');*/

const authService = require('../services/authService');

const { getActiveTrip } = require('../services/busService');

const router = express.Router();

router.get(
  '/:busId/current-trip',
  getActiveTrip
);


module.exports = router;
