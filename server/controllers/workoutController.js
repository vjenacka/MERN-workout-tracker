const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });
  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ error: "No such workout" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) return res.status(404).json({ error: "No such workout" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });

  try {
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) return res.status(404).json({ error: "No such workout" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
