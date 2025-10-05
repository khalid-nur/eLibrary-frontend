import { useMutation, useQuery, useQueryClient } from "react-query";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Review } from "../models/review";
import { getAverageRatingByBookId, getBookReviewById, isBookReviewedByUser, postReview } from "../api/reviewApi";
import { ReviewRequest } from "../types/reviewRequest";

/**
 * Fetches a paginated list of reviews for a specific book by its id
 *
 * @param bookId The id of the book to retrieve reviews for
 * @param currentPage The current page number for pagination
 * @param booksPerPage The number of reviews per page
 * @returns The query result containing review data, loading state, and error
 */
export const useBookReviewById = (bookId: string | undefined, currentPage: number, booksPerPage: number) => {
  return useQuery<PaginatedResponse<Review>, any>({
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

/**
 * Fetches the average review rating of a specific book
 *
 * @param bookId The id of the book
 * @returns The query result containing the average rating, loading state, and error
 */
export const useBookAverageRating = (bookId: string | undefined) => {
  return useQuery<number>({
    queryKey: ["averageRating", bookId],
    queryFn: () => getAverageRatingByBookId(bookId),
  });
};

/**
 * Submits a new review for a book
 *
 * @returns A mutation object to post the review, including success and error handlers
 */
export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["postreview"],
    mutationFn: (reviewRequest: ReviewRequest) => postReview(reviewRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]); // Refresh all reviews
      queryClient.invalidateQueries(["bookReviewedByUser"]); // Refresh the review status for the user
      queryClient.invalidateQueries(["averageRating"]); // Refresh the average rating for the book
    },
  });
};
