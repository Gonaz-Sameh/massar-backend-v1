const express = require('express');
/*const {
  getStationValidator,
  createStationValidator,
  updateStationValidator,
  deleteStationValidator,
} = require('../utils/validators/rideTypeValidator');*/

const authService = require('../services/authService');

const {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,

} = require('../services/stationService');

const router = express.Router();

router
  .route('/')
  .get(getStations)
  .post(
   
    createStation
  );
router
  .route('/:id')
  .get(/*getStationValidator,*/ getStation)
  .put(
  
    updateStation
  )
  .delete(

    deleteStation
  );

module.exports = router;
