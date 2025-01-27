/**
 * Represents a review object
 */
export interface Review {
  id: string;
  userEmail: string;
  date: string;
  rating: number;
  bookId: number;
  reviewDescription: string;
}
