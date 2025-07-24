import { useMutation } from "react-query";
import { useAuthContext } from "./useAuthContext";
import { logout } from "../api/auth";

/**
 * Handles user logout by sending a logout request to the backend,
 * clearing user data from local storage, and updating the authentication context.
 *
 * @returns The mutation object for triggering logout and tracking its state
 */
export const useLogout = () => {
  const { updateAuth } = useAuthContext();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      // Remove user data from localStorage
      localStorage.removeItem("user");

      // Update the authentication context to mark the user as logged out
      updateAuth(false);
    },
  });
};
