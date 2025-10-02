/**
 * Represents a history of a book checked out by a user
 */
export interface History {
  id: string;
  userId: number;
  userEmail: string;
  bookId: number;
  checkoutDate: string;
  returnDate: string;
  title: string;
  author: string;
  description: string;
  img: string;
}
