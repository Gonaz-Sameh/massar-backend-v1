const express = require('express');
/*const {
  getRouteValidator,
  createRouteValidator,
  updateRouteValidator,
  deleteRouteValidator,
} = require('../utils/validators/rideValidator');*/

const authService = require('../services/authService');

const {
  getRoutes,
  getRoute,
  createRoute,
  updateRoute,
  deleteRoute,

} = require('../services/routeService');

const router = express.Router();

router
  .route('/')
  .get(getRoutes)
  .post(
   
    createRoute
  );
router
  .route('/:id')
  .get(/*getRouteValidator,*/ getRoute)
  .put(
 
    updateRoute
  )
  .delete(
  
    deleteRoute
  );

module.exports = router;
