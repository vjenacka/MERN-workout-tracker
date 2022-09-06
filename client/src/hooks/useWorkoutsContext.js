import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context)
    throw Error("useWorkoutContext must be use inside WorkoutContextProvider");

  return context;
};
