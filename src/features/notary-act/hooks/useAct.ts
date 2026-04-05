import { useContext } from "react";
import { ActContext } from "../context/ActContext";

export const useAct = () => {
  const context = useContext(ActContext);

  if (!context) {
    throw new Error("useAct must be used inside ActProvider");
  }

  return context;
};
