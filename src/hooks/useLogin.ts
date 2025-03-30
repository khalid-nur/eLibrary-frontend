import { useMutation } from "react-query";
import { login } from "../api/auth";
import { AuthRequest } from "../models/authUser";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Handles user authentication by sending credentials to the backend API
 * @returns The mutation result containing login data, loading state, and error
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();

  return useMutation({
    mutationFn: (authRequest: AuthRequest) => login(authRequest),
    onSuccess: ({ data }) => {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Update global auth state to authenticated
      updateAuth(true);

      // Redirect to home page after successful login
      navigate("/");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || null;
      console.error("Login failed:", errorMessage);
    },
  });
};
