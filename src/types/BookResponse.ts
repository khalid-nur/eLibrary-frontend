import { Book } from "../models/book";

/**
 * Represents the response structure for fetching books, including pagination details
 */
export interface BookResponse {
  content: Book[];
  totalElements: number;
  totalPages: number;
  number: number;
}
