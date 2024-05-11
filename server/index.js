const express = require("express");
const app = express();
const PORT = 5003;
const userRoutes = require("./routes/userRoute");
const theatreRoutes = require("./routes/theatreRoute");
const movieRoutes = require("./routes/movieRoute");
const showRoutes = require("./routes/showRoute");
const bookingRoutes = require("./routes/bookingRoute");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://basavarajkrbasavarajkr:PA0si6yryZ2I4B7i@cluster0.mbp7sbf.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", userRoutes);

app.use("/api/theatres", theatreRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
