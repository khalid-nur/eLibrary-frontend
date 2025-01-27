import { useQuery } from "react-query";
import {
  getBookById,
  getBooks,
  getBooksByCategory,
  getBooksByTitle,
} from "../api/bookApi";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Book } from "../models/book";

/**
 * Fetches a paginated list of books based on the current page and page size
 * @param currentPage The current page number for pagination
 * @param booksPerPage The number of books per page
 * @returns The query result containing books data, loading state, and error
 */
export const useBooks = (currentPage: number, booksPerPage: number) => {
  return useQuery<PaginatedResponse<Book>, Error>({
    queryKey: ["books", currentPage],
    queryFn: () => getBooks(currentPage, booksPerPage),
  });
};

/**
 * Fetches details of a single book by its id
 * @param bookId The id of the book to retrieve
 * @returns A Book object containing the book's details
 */
export const useBookById = (bookId: string | undefined) => {
  return useQuery<Book, Error>({
    queryKey: ["bookId", bookId],
    queryFn: () => getBookById(bookId),
    onError: (error: any) => {
      console.error(
        "Failed to fetch current loans count:",
        error.response.data
      );
    },
  });
};

/**
 * Fetches a paginated list of books based on search inputs and category
 * If a category is provided, books are fetched by category, otherwise, books are fetched by title
 * @param currentPage The current page number for pagination
 * @param booksPerPage The number of books per page
 * @param search The search inputs for filtering books by title
 * @param category The category to filter books by
 * @returns The query result containing books data from search inputs and category, along with the loading state and error
 */
export const useSearch = (
  currentPage: number,
  booksPerPage: number,
  search: string,
  category: string
) => {
  return useQuery<PaginatedResponse<Book>, Error>({
    queryKey: ["bookSearch", currentPage, search, category],
    queryFn: async () => {
      if (category) {
        // If a category is provided, fetch books by category
        return await getBooksByCategory(currentPage, booksPerPage, category);
      } else {
        // If a search term is provided, fetch books by title
        return await getBooksByTitle(search, currentPage, booksPerPage);
      }
    },
  });
};
