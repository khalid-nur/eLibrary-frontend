import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  adminRenewBookLoanForUser,
  adminReturnBookLoanForUser,
  checkoutBook,
  currentLoansCount,
  getCheckoutCounts,
  getCheckoutCountsPerUser,
  adminGetAllCheckouts,
  isBookCheckedOutByUser,
  getUserCheckouts,
  renewUserBookLoan,
  returnUserBookLoan,
} from "../api/checkoutApi";
import { TotalCheckouts, CheckoutPerUser, LoanOverview, Checkout } from "../models/checkout";
import { PaginatedResponse } from "../types/PaginatedResponse";

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
  return useQuery<TotalCheckouts, any>({
    queryKey: ["checkouts-count"],
    queryFn: getCheckoutCounts,
  });
};

/**
 * Fetches the number of checkouts per user
 *
 * @returns The query result containing a list of users alongside their checkout statistics,
 *          loading state, and error
 */
export const useCheckoutCountsPerUser = () => {
  return useQuery<CheckoutPerUser[], any>({
    queryKey: ["checkouts-per-user"],
    queryFn: getCheckoutCountsPerUser,
  });
};

/**
 * Fetches the list of books currently checked out by the authenticated user
 *
 * @returns The query result containing the user's current loans, loading state, and error
 */
export const useUserCheckouts = () => {
  return useQuery<Checkout[], any>({
    queryKey: ["user-checkouts"],
    queryFn: getUserCheckouts,
  });
};

/**
 * Renew a book loan for the authenticated user
 *
 * @returns The mutation object including the mutate function, status, and error
 */
export const useRenewBookLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => renewUserBookLoan(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-checkouts"]);
    },
  });
};

/**
 * Return a book loan for the authenticated user
 *
 * @returns The mutation object including the mutate function, status, and error
 */
export const useReturnBookLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => returnUserBookLoan(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-checkouts"]);
    },
  });
};

/**
 * Fetches a list of all user checkouts
 *
 * @param currentPage the page number to fetch
 * @param perPage the number of items per page
 * @returns The query result containing checkout data, loading state, and error
 */
export const useAdminCheckouts = (currentPage: number, perPage: number) => {
  return useQuery<PaginatedResponse<LoanOverview>, any>({
    queryKey: ["loan-overview", currentPage, perPage],
    queryFn: () => adminGetAllCheckouts(currentPage, perPage),
  });
};

/**
 * Renews a book loan for a user
 *
 * @returns The mutation object for renewing a book loan, including the mutate function, status, and error
 */
export const useAdminRenewLoan = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, { userId: string; bookId: string }>({
    mutationKey: ["admin-renew-loan"],
    mutationFn: ({ userId, bookId }) => adminRenewBookLoanForUser(userId, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loan-overview"] });
    },
  });
};

/**
 * Returns a book loan for a user
 *
 * @returns The mutation object for returning a book loan, including the mutate function, status, and error
 */
export const useAdminReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation<void, any, { userId: string; bookId: string }>({
    mutationKey: ["admin-return-loan"],
    mutationFn: ({ userId, bookId }) => adminReturnBookLoanForUser(userId, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loan-overview"] });
    },
  });
};
