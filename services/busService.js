
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const Bus = require('../models/bus.model');


// @desc    Get Active Trip for a Bus
// @route   GET /api/v1/buses/:busId/current-trip
// @access  Private/Admin-Manager
exports.getActiveTrip =asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.busId).populate("currentTrip");
  res.json(bus.currentTrip);
})

