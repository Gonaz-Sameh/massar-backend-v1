const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const ngrok = require('@ngrok/ngrok');
dotenv.config();
//dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');

const http = require("http");
const socketIo = require("socket.io");
// express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});
//npm install mongoose@5.13.14
//npm install  npm@6

// Routes
const mountRoutes = require('./routes');
const Bus = require('./models/bus.model');
const Trip = require('./models/trip.model');
//const { webhookCheckout } = require('./services/orderService');

// Connect with db
dbConnection();



// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

// Middlewares
//app.use(express.json()); 100kb
// Increase payload limit to 1MB
app.use(express.json({ limit: '1mb' }));

app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// WebSocket for real-time location
io.on("connection", (socket) => {
  console.log("Driver/viewer connected");

  socket.on("locationUpdate", async ({tripId,routeId, busId, lat, lng }) => {

      io.emit("busLocationUpdate", {
        tripId,
        routeId,
        busId,
        lat,
        lng
      }); 

      try{
       
        //we are need this becuse in case un-ended trips
        await Trip.findByIdAndUpdate(tripId, {
          latestLiveCoordinates: {lat,lng,timestamp:Date.now()}
        });
      }catch(e){
      console.log(e);
      }
  });
});

// Mount Routes
mountRoutes(app);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 5000;
const runningServer = server.listen(PORT, async() => {
  console.log(`App running running on port ${PORT}`);
  /*let listner = await ngrok.forward({authtoken: process.env.AUTHTOKEN,addr:PORT})
  console.log(`${listner.url()}`);*/
  
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  runningServer.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
