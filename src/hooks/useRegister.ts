import { useMutation } from "react-query";
import { registerUser } from "../api/auth";
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from "../models/registerUser";
import { useNavigate } from "react-router-dom";

/**
 * Handles user registration by sending users detail to the backend API
 * @returns The mutation result containing registration data, loading state, and error
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<RegisterUserResponse, Error, RegisterUserRequest>({
    mutationFn: (userData: RegisterUserRequest) => registerUser(userData),
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};
