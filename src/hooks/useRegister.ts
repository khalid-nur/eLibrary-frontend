import { useMutation } from "react-query";
import { registerUser } from "../api/auth";
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from "../models/registerUser";

/**
 * Handles user registration by sending user details to the backend API
 * @returns The mutation result containing registration data, loading state, and error
 */
export const useRegister = () => {
  return useMutation<RegisterUserResponse, Error, RegisterUserRequest>({
    mutationFn: (userData: RegisterUserRequest) => registerUser(userData),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};
