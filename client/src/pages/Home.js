import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getWorkouts = async () => {
      const response = await fetch(
        "https://workout-tracker-api-0nz8.onrender.com/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      getWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map(workout => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
            ></WorkoutDetails>
          ))}
      </div>
      <WorkoutForm></WorkoutForm>
    </div>
  );
};

export default Home;
