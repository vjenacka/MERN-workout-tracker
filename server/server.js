require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const workoutsRouter = require("./routes/workouts");
const usersRouter = require("./routes/user");

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port " + process.env.PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });

//middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.json("req from /");
});
app.use("/api/workouts", workoutsRouter);
app.use("/api/users", usersRouter);
