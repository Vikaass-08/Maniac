const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var path = require("path");

app.use(express.static(path.join(__dirname, "public/uploads")));

// dotenv stores environment variables
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// connect to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established successfully");
});

// Import Routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const postRoute = require("./routes/posts");

// Route Middleware
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
