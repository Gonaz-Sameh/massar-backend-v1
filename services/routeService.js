
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const Route = require('../models/route.model');
const Station = require('../models/station.model');

// @desc    Get all routes
// @route   GET /api/v1/rides
// @access  Public
exports.getRoutes = asyncHandler( async (req, res) => {
  
    const routes = await Route.find({}, "_id name");
    res.json(routes);

})

// @desc    Get one route with its stations
// @route   GET /api/v1/rides/:id
// @access  Public
exports.getRoute =asyncHandler( async (req, res) => {

    const route = await Route.findById(req.params.id).populate("stations");
    if (!route) return res.status(404).json({ error: "Route not found" });
    res.json(route);
  
})

// @desc     1. Add a route with its stations
// @route   POST  /api/v1/rides
// @access  Private/Admin-Manager
exports.createRoute =asyncHandler( async (req, res) => {
  
    const { name, coordinates, stations } = req.body;

    const savedStations = await Station.insertMany(stations);
    const stationIds = savedStations.map((s) => s._id);

    const route = new Route({ name, coordinates, stations: stationIds });
    const savedRoute = await route.save();

    res.status(201).json(savedRoute);
  
})

// @desc    Update specific Route
// @route   PUT /api/v1/rides/:id
// @access  Private/Admin-Manager
exports.updateRoute = factory.updateOne(Route);

// @desc    Delete specific Route
// @route   DELETE /api/v1/rides/:id
// @access  Private/Admin
exports.deleteRoute = factory.deleteOne(Route);
