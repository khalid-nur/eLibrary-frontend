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
