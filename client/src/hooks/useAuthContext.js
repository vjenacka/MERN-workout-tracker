import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw Error("AuthContext must be use inside AuthContextProvider");

  return context;
};
