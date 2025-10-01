import { Book } from "./book";

// Represents the total number of all active checkouts
export interface TotalCheckouts {
  totalCheckouts: number;
}

// Represents the number of books checked out per user
export interface CheckoutPerUser {
  userId: string;
  userEmail: string;
  checkoutCount: number;
}

/**
 * Represents a book checkout for a user
 */
export interface Checkout {
  book: Book;
  daysLeft: number;
}

/**
 * Represents the statuses of a loan
 */
export enum LoanStatus {
  ACTIVE = "ACTIVE",
  DUE_SOON = "DUE_SOON",
  OVERDUE = "OVERDUE",
  RETURNED = "RETURNED",
}

/**
 * Represents a checkout overview for a user
 */
export interface LoanOverview {
  id: string;
  userEmail: string;
  userName: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  checkoutDate: string;
  returnDate: string;
  returnedDate: string;
  renewalCount: number;
  status: LoanStatus;
  remainingDays: number;
}
