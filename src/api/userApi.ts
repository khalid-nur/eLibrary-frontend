import { User, UserCounts } from "../models/user";
import { PaginatedResponse } from "../types/PaginatedResponse";
import apiClient from "./axiosConfig";

/**
 * Fetches a paginated list of user accounts
 * @param page The page number for pagination
 * @param size The number of users per page
 * @returns A PaginatedResponse containing user account data
 */
export const getUsers = async (
  page: number,
  size: number
): Promise<PaginatedResponse<User>> => {
  const response = await apiClient.get(
    `/admin/users?page=${page}&size=${size}`
  );
  return response.data;
};

/**
 * Fetches the total number of user accounts
 * @returns The total count of registered users
 */
export const getUserCounts = async (): Promise<UserCounts> => {
  const response = await apiClient.get("/admin/users/stats");

  return response.data;
};
