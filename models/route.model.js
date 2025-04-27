const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: [
    {
      lat: Number,
      lng: Number,
    },
  ],
  stations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Station" }],
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;