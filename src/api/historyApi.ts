import { History } from "../models/history";
import { PaginatedResponse } from "../types/PaginatedResponse";
import apiClient from "./axiosConfig";

/**
 * Fetches a paginated list of a user's checkout history
 * @param page The page number for pagination
 * @param size The number of checkout history per page
 * @returns A PaginatedResponse object containing history data
 */
export const getUserHistory = async (currentPage: number, perPage: number): Promise<PaginatedResponse<History>> => {
  const response = await apiClient.get(`/history?page=${currentPage}&size=${perPage}`);
  return response.data;
};
