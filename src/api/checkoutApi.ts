import { TotalCheckouts, CheckoutPerUser } from "../models/checkout";
import apiClient from "./axiosConfig";

/**
 * Allows an authenticated user to check out a book
 *
 * @param bookId The id of the book to check out
 * @returns The checked out book
 */
export const checkoutBook = async (bookId: string | undefined) => {
  const response = await apiClient.put(`/checkouts?bookId=${bookId}`);
  return response.data;
};

/**
 * Checks if a book is currently checked out by the authenticated user
 *
 * @param bookId The id of the book to check
 * @returns true if the book is checked out by the user, otherwise false
 */
export const isBookCheckedOutByUser = async (bookId: string | undefined): Promise<boolean> => {
  const response = await apiClient.get(`/checkouts/status?bookId=${bookId}`);
  return response.data;
};

/**
 * Fetches the current count of loans for the authenticated user
 *
 * @returns The number of books currently checked out by the user
 */
export const currentLoansCount = async (): Promise<number> => {
  const response = await apiClient.get("/checkouts/loan-count");

  return response.data;
};

/**
 * Fetches the total number of checkouts
 * @returns the total count of checkouts
 */
export const getCheckoutCounts = async (): Promise<TotalCheckouts> => {
  const response = await apiClient.get("/checkouts/admin/checkout-counts");

  return response.data;
};

/**
 * Fetches the number of checkouts per user
 *
 * @returns A list of users alongside their checkout statistics
 */
export const getCheckoutCountsPerUser = async (): Promise<CheckoutPerUser[]> => {
  const response = await apiClient.get("/checkouts/admin/checkout-counts-per-user");
  return response.data;
};
