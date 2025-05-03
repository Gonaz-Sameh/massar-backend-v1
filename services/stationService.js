
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');

const Station = require('../models/station.model');



// @desc    Get list of rideTypes
// @route   GET /api/v1/rideTypes
// @access  Public
exports.getStations = asyncHandler( async (req, res) => {
  
    const routes = await Station.find();
    res.json(routes);

})

// @desc    Get specific rideType by id
// @route   GET /api/v1/rideTypes/:id
// @access  Public
exports.getStation= factory.getOne(Station);

// @desc   Add a station independently

// @route   POST  /api/v1/rideTypes
// @access  Private/Admin-Manager
exports.createStation=asyncHandler(async (req, res) => {
  
    const station = new Station(req.body);
    const saved = await station.save();
    res.status(201).json(saved);

})

// @desc    Update specific rideType
// @route   PUT /api/v1/rideTypes/:id
// @access  Private/Admin-Manager
exports.updateStation= factory.updateOne(Station);

// @desc    Delete specific rideType
// @route   DELETE /api/v1/rideTypes/:id
// @access  Private/Admin
exports.deleteStation= factory.deleteOne(Station);
