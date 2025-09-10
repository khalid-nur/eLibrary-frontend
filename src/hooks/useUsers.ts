import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, getUserCounts, getUsers, updateUser } from "../api/userApi";
import { AdminUpdateUser, User, UserCounts } from "../models/user";
import { PaginatedResponse } from "../types/PaginatedResponse";

/**
 * Fetches a paginated list of user accounts
 * @param currentPage The current page number for pagination
 * @param perPage The number of users per page
 * @param sort Optional field name to sort by
 * @param direction Optional sort order, either asc or desc
 * @returns The query result containing user account data, loading state, and error
 */
export const useUserAccounts = (currentPage: number, perPage: number, sort?: string, direction?: string) => {
  return useQuery<PaginatedResponse<User>, any>({
    queryKey: ["users", currentPage, perPage, sort, direction],
    queryFn: () => getUsers(currentPage, perPage, sort, direction),
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

/**
 * Updates a user account and refreshes the user list after a successful update
 * @returns The mutation result that contains mutate, isLoading and error
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, any, { userId: string; user: AdminUpdateUser }>({
    mutationFn: ({ userId, user }) => updateUser(userId, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

/**
 * Deletes a user account and refreshes the user list after a successful deletion
 * @returns The mutation result that contains mutate, isLoading and error
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
