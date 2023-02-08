import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv  from "dotenv"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
console.log("vikas", __dirname)
app.use(express.static(path.join(__dirname, "public/uploads")));

// dotenv stores environment variables
dotenv.config();
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
import exercisesRouter from "./routes/exercises.js";
import usersRouter from "./routes/users.js";
import postRoute from "./routes/posts.js"

// Route Middleware
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
