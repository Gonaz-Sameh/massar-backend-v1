const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  number: { type: String, unique: true },
  status: {
    type: String,
    enum: ['on_route', 'off_route'],
    default: 'off_route',
  },
  currentTrip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    default: null,
  },

  isAvailable: { type: Boolean, default: true }
},
{ timestamps: true });

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
