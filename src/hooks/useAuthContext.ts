import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * A hook to access the authentication context
 * @returns The authentication context object
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context is not available");
  }

  return context;
};
