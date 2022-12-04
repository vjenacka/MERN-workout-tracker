import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workout = { title, load, reps };

    const response = await fetch(
      "https://workout-tracker-api-0nz8.onrender.com/api/workouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
    } else {
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("new workout added", json);
    }
  };

  return (
    <form className="create" onSubmit={e => handleSubmit(e)}>
      <h3>Add a Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label>Load in kg:</label>
      <input
        type="number"
        value={load}
        onChange={e => setLoad(e.target.value)}
      />

      <label>Number of reps:</label>
      <input
        type="number"
        value={reps}
        onChange={e => setReps(e.target.value)}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
