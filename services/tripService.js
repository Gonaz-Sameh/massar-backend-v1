
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const Trip = require('../models/trip.model');
const Bus = require('../models/bus.model');



// @desc    Get list of trips
// @route   GET /api/v1/trips
// @access  Public
exports.getTrips = factory.getAll(Trip);

// @desc    Get specific trip by id
// @route   GET /api/v1/trips/:id
// @access  Public
exports.getTrip = factory.getOne(Trip);

// @desc    Create trip
// @route   POST  /api/v1/trips
// @access  Private/Admin-Manager
exports.startTrip =asyncHandler( async (req, res) => {
    const { busId, routeId } = req.body;
    const trip = await Trip.create({ bus: busId, route: routeId });
    await Bus.findByIdAndUpdate(busId, {
      currentTrip: trip._id,
      isAvailable: false
    });
    res.json({ tripId: trip._id, message: "Trip started" });
  })


  exports.endTrip = asyncHandler(async (req, res) => {
    const { tripId, coordinates } = req.body;
  
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        status: "completed",
        coordinates,
        endedAt:Date.now()  //GMT
      },
      { new: true }
    );
  
    await Bus.findByIdAndUpdate(trip.bus, {
      currentTrip: null,
      isAvailable: true,
    });
  
    res.json({ message: "Trip ended and path saved" });
  });
  
// @desc    Update specific trip
// @route   PUT /api/v1/trips/:id
// @access  Private/Admin-Manager
exports.getTrip =asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
  })

// @desc    Delete specific trip
// @route   DELETE /api/v1/trips/:id
// @access  Private/Admin
// GET /api/v1/trips/by-route/:routeId
exports.getTripsByRoute = asyncHandler(async (req, res) => {
  const { routeId } = req.params;
  const trips = await Trip.find({ route: routeId }); // optional: populate bus
  res.json(trips);
});
