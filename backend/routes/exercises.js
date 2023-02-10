import express from 'express'
import Exercise from "../models/exercise.model.js";
import verify from "./verifyToken.js"
const router = express.Router();

router.get("/", verify, async (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", verify, async (req, res) => {
  const exerciseName = req.body.exerciseName;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({
    exerciseName,
    description,
    duration,
    date,
  });
  
  try {
    const savedExercise = await newExercise.save()
    res.send({ data : savedExercise, status : "sucess" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }

});

router.get("/:id", verify, async (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", verify, async (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.exerciseName = req.body.exerciseName;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router;
