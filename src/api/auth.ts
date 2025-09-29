import apiClient from "./axiosConfig";
import { RegisterUserRequest, RegisterUserResponse } from "../models/registerUser";
import { AuthRequest, AuthResponse } from "../models/authUser";
import { ForgotPasswordRequest } from "../types/forgotPasswordRequest";

/**
 * Registers a new user by sending their details to the backend API
 * @param data The registration details
 * @returns The response containing user detail
 */
export const registerUser = async (registerRequest: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const response = await apiClient.post<RegisterUserResponse>("/auth/register", registerRequest);
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

/**
 * Logs out the currently authenticated user by calling the backend API
 *
 * @returns A response indicating the logout status
 */
export const logout = async () => {
  const response = await apiClient.post("auth/logout");
  return response.data;
};

/**
 * Sends a password reset link to the user by email
 * @param email The email address of the user requesting a password reset
 * @returns A response confirming the request was submitted
 */
export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post(`auth/forgot-password?email=${email}`);
};

/**
 * Resets the password for a user using a reset token
 * @param token The token used to validate the password reset request
 * @param newPassword The new password to set for the user
 * @returns A response confirming the password has been reset
 */
export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await apiClient.post(`auth/reset-password?token=${token}&newPassword=${newPassword}`);
};
