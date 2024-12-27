import { useQuery } from "react-query";
import { getBooks, getBooksByCategory, getBooksByTitle } from "../api/bookApi";
import { BookResponse } from "../types/BookResponse";

/**
 * Fetches a paginated list of books based on the current page and page size
 * @param currentPage The current page number for pagination
 * @param booksPerPage The number of books per page
 * @returns The query result containing books data, loading state, and error
 */
export const useBooks = (currentPage: number, booksPerPage: number) => {
  return useQuery<BookResponse, Error>({
    queryKey: ["books", currentPage],
    queryFn: () => getBooks(currentPage, booksPerPage),
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
  return useQuery<BookResponse, Error>({
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
