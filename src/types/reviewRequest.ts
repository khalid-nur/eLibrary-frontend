/**
 * Represents a review request submitted by the user
 */
export interface ReviewRequest {
  rating: number;
  bookId: string;
  description?: string;
}
