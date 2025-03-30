import apiClient from "./axiosConfig";
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from "../models/registerUser";
import { AuthRequest, AuthResponse } from "../models/authUser";

/**
 * Registers a new user by sending their details to the backend API
 * @param data The registration details
 * @returns The response containing user detail
 */
export const registerUser = async (
  registerRequest: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  const response = await apiClient.post<RegisterUserResponse>(
    "/auth/register",
    registerRequest
  );
  return response.data;
};

/**
 * Authenticates a user by sending their credentials to the backend API
 * @param authRequest The authentication credentials
 * @returns The response containing authentication tokens and user details
 */
export const login = (authRequest: AuthRequest) => {
  return apiClient.post<AuthResponse>("/auth/login", authRequest);
};
