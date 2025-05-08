const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
},
{ timestamps: true });
const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
