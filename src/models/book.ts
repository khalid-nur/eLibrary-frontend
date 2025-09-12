/**
 * Represents a book object
 */
export interface Book {
  id: string;
  title: string;
  author?: string;
  description?: string;
  copies?: number;
  copiesAvailable?: number;
  category?: string;
  img?: string;
}

// Represents the count of books
export interface BookCounts {
  // Total number of books
  totalBooks: number;
}

// Represents a admin request for creating or updating a book
export interface BookRequest {
  title: string;
  author: string;
  description: string;
  copies: number;
  copiesAvailable: number;
  category: string;
  img?: string | ArrayBuffer;
}
