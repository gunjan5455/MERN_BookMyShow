const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/Routes/auth.routes");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
var bodyParser = require("body-parser");
var cors = require("cors");
const moviesRoutes = require("./src/Routes/movies.routes");
const theaterRoutes = require("./src/Routes/theater.routes");
const showRoutes = require("./src/Routes/shows.routes");
const bookingRoutes = require("./src/Routes/booking.routes");
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Succsessfully connected to DB");
  })
  .catch((err) => {
    console.log("Unable to connect DB");
  });

authRoutes(app);
moviesRoutes(app);
theaterRoutes(app);
showRoutes(app);
bookingRoutes(app);
app.listen(port, () => {
  console.log(`Running on ${port}`);
});
