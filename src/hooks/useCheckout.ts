import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  checkoutBook,
  currentLoansCount,
  getCheckoutCounts,
  isBookCheckedOutByUser,
} from "../api/checkoutApi";
import { CheckoutCounts } from "../models/checkout";

/**
 * Fetches the number of books currently checked out by the authenticated user
 *
 * @returns The query result containing the current loans count, loading state, and error
 */
export const useCurrentLoansCount = () => {
  return useQuery({
    queryKey: ["currentLoansCount"],
    queryFn: currentLoansCount,
  });
};

/**
 *  Checks if a book is currently checked out by the authenticated user
 *
 * @param bookId The id of the book to check if it is checked out by the user
 * @returns The query result containing the checked out status, loading state, and error
 */
export const useIsBookCheckoutByUser = (bookId: string | undefined) => {
  return useQuery({
    queryKey: ["isCheckedOut"],
    queryFn: () => isBookCheckedOutByUser(bookId),
  });
};

/**
 * Allows an authenticated user to check out a book
 *
 * @param bookId The id of the book to check out
 * @returns The mutation result after the book has been checked out
 */
export const useCheckOutBook = (bookId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["checkoutBook"],
    mutationFn: () => checkoutBook(bookId),
    // When successful, invalidate the queries to refresh the data
    onSuccess: () => {
      queryClient.invalidateQueries(["currentLoansCount"]); // Refresh the user's loan count
      queryClient.invalidateQueries(["isCheckedOut"]); // Refresh the checked out status of the book
      queryClient.invalidateQueries(["bookId"]); // Refresh the book details
    },
  });
};

/**
 * Fetches the total count of checkouts
 * @returns The query result containing checkout counts, loading state, and error
 */
export const useCheckoutCount = () => {
  return useQuery<CheckoutCounts, any>({
    queryKey: ["checkouts-count"],
    queryFn: getCheckoutCounts,
  });
};
