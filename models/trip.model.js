const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now, //GMT
  },
  endedAt: Date,
  coordinates: [
    {
      lat: Number,
      lng: Number,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  latestLiveCoordinates:     //we are need this becuse in case un-ended trips
  {
    lat: Number,
    lng: Number,
    timestamp: {
      type: Date,
      default: Date.now, //GMT
    },
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing',
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;