import apiClient from "./axiosConfig";
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from "../models/registerUser";

/**
 * Registers a new user by sending their details to the backend API
 * @param data The registration details
 * @returns The response containing user detail
 */
export const registerUser = async (
  data: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  const response = await apiClient.post<RegisterUserResponse>(
    "/auth/register",
    data
  );
  return response.data;
};
