import { Review } from "../models/review";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { ReviewRequest } from "../types/reviewRequest";
import apiClient from "./axiosConfig";

/**
 * Fetches a paginated list of reviews for a specific book by its id
 * @param bookId The id of the book to retrieve reviews for
 * @param page The page number for pagination
 * @param size The number of reviews per page
 * @returns A paginated response containing review data
 */
export const getBookReviewById = async (
  bookId: string | undefined,
  page: number,
  size: number
): Promise<PaginatedResponse<Review>> => {
  const response = await apiClient.get(
    `/reviews/book/${bookId}?page=${page}&size=${size}`
  );

  return response.data;
};

/**
 * Checks if a book has been reviewed by the authenticated user
 *
 * @param bookId The id of the book to check if it has been reviewed by the user
 * @returns true if the book has been reviewed by the user, otherwise false
 */
export const isBookReviewedByUser = async (
  bookId: string | undefined
): Promise<boolean> => {
  const response = await apiClient.get(`/reviews/book/status?bookId=${bookId}`);
  return response.data;
};

/**
 * Fetches the average review rating for a book by its id
 *
 * @param bookId The id of the book
 * @returns The average rating for the book, or 0.0 if no reviews exist
 */
export const getAverageRatingByBookId = async (
  bookId: string | undefined
): Promise<number> => {
  const response = await apiClient.get(
    `/reviews/book/${bookId}/average-rating`
  );
  return response.data;
};

/**
 * Submits a new review for a book
 *
 * @param reviewRequest The review request object holding the review details
 * @returns A response with a 201 status when the review is successfully created
 */
export const postReview = async (reviewRequest: ReviewRequest) => {
  const response = await apiClient.post(`/reviews`, reviewRequest);
  return response.data;
};
