import { useQuery } from "react-query";
import { getBooks } from "../api/bookApi";
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
