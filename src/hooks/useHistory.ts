import { useQuery } from "react-query";
import { getUserHistory } from "../api/historyApi";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { History } from "../models/history";

/**
 * Fetches a paginated list of a user's checkout history
 * @param page The page number for pagination
 * @param size The number of checkout history per page
 * @returns A PaginatedResponse object containing history data
 */
export const useUserHistory = (currentPage: number, perPage: number) => {
  return useQuery<PaginatedResponse<History>, any>({
    queryKey: ["books", currentPage, perPage],
    queryFn: () => getUserHistory(currentPage, perPage),
  });
};
