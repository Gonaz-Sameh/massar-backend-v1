
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const routeRoute = require('./routeRoute');
const stationRoute = require('./stationRoute');
const tripRoute = require('./tripRoute');
const busRoute = require('./busRoute');
const mountRoutes = (app) => {
  app.use('/api/v1/routes', routeRoute);
  app.use('/api/v1/stations', stationRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/trips', tripRoute);
  app.use('/api/v1/buses', busRoute);
};

module.exports = mountRoutes;
