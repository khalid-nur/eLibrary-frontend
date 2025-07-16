import { useQuery } from "react-query";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Review } from "../models/review";
import { getBookReviewById, isBookReviewedByUser } from "../api/reviewApi";

/**
 * Fetches a paginated list of reviews for a specific book by its id
 *
 * @param bookId The id of the book to retrieve reviews for
 * @param currentPage The current page number for pagination
 * @param booksPerPage The number of reviews per page
 * @returns The query result containing review data, loading state, and error
 */
export const useBookReviewById = (
  bookId: string | undefined,
  currentPage: number,
  booksPerPage: number
) => {
  return useQuery<PaginatedResponse<Review>, Error>({
    queryKey: ["reviews", bookId, currentPage],
    queryFn: () => getBookReviewById(bookId, currentPage, booksPerPage),
  });
};

/**
 * Fetches the review status of a specific book for the authenticated user
 *
 * @param bookId The id of the book to check
 * @returns The query result containing a boolean indicating whether the user has reviewed the book, loading state, and error
 */
export const useIsBookReviewedByUser = (bookId: string | undefined) => {
  return useQuery<Boolean>({
    queryKey: ["bookReviewedByUser", bookId],
    queryFn: () => isBookReviewedByUser(bookId),
  });
};
