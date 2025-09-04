import { useQuery } from "react-query";
import { getUserCounts, getUsers } from "../api/userApi";
import { User, UserCounts } from "../models/user";
import { PaginatedResponse } from "../types/PaginatedResponse";

/**
 * Fetches a paginated list of user accounts
 * @param currentPage The current page number for pagination
 * @param perPage The number of users per page
 * @returns The query result containing user account data, loading state, and error
 */
export const useUserAccounts = (currentPage: number, perPage: number) => {
  return useQuery<PaginatedResponse<User>, any>({
    queryKey: ["users", currentPage, perPage],
    queryFn: () => getUsers(currentPage, perPage),
  });
};

/**
 * Fetches the total number of user accounts
 * @returns The query result containing the total user count, loading state, and error
 */
export const useUserAccountCount = () => {
  return useQuery<UserCounts, any>({
    queryKey: ["users-count"],
    queryFn: getUserCounts,
  });
};
