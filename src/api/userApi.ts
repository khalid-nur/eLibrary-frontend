import { AdminUpdateUser, User, UserCounts } from "../models/user";
import { PaginatedResponse } from "../types/PaginatedResponse";
import apiClient from "./axiosConfig";

/**
 * Fetches a paginated list of user accounts
 * @param page The page number for pagination
 * @param size The number of users per page
 * @param sort Optional field name to sort by
 * @param direction Optional sort order, either asc or desc
 * @returns A PaginatedResponse containing user account data
 */
export const getUsers = async (
  page: number,
  size: number,
  sort: string = "",
  direction: string = ""
): Promise<PaginatedResponse<User>> => {
  const response = await apiClient.get(`/admin/users?page=${page}&size=${size}&sort=${sort},${direction}`);
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

/**
 * Updates a user account by userId
 * @param userId The id of the user to update
 * @param userData The updated user data
 * @returns The updated user account
 */
export const updateUser = async (userId: string, userData: AdminUpdateUser): Promise<User> => {
  const response = await apiClient.put(`/admin/users/${userId}`, userData);
  return response.data;
};

/**
 * Deletes a user account by userId
 * @param userId The id of the user to delete
 * @returns void
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`admin/users/${userId}`);
};
