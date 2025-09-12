import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createBook,
  deleteBook,
  getBookById,
  getBookCounts,
  getBooks,
  getBooksByCategory,
  getBooksByTitle,
  updateBook,
} from "../api/bookApi";
import { PaginatedResponse } from "../types/PaginatedResponse";
import { Book, BookCounts, BookRequest } from "../models/book";

/**
 * Fetches a paginated list of books based on the current page and page size
 * @param currentPage The current page number for pagination
 * @param booksPerPage The number of books per page
 * @param sort Optional field name to sort by
 * @param direction Optional sort order, either asc or desc
 * @returns The query result containing books data, loading state, and error
 */
export const useBooks = (currentPage: number, booksPerPage: number, sort?: string, direction?: string) => {
  return useQuery<PaginatedResponse<Book>, any>({
    queryKey: ["books", currentPage, booksPerPage, sort, direction],
    queryFn: () => getBooks(currentPage, booksPerPage, sort, direction),
  });
};

/**
 * Fetches details of a single book by its id
 * @param bookId The id of the book to retrieve
 * @returns A Book object containing the book's details
 */
export const useBookById = (bookId: string | undefined) => {
  return useQuery<Book, any>({
    queryKey: ["bookId", bookId],
    queryFn: () => getBookById(bookId),
    onError: (error: any) => {
      console.error("Failed to fetch current loans count:", error.response.data);
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
export const useSearch = (currentPage: number, booksPerPage: number, search: string, category: string) => {
  return useQuery<PaginatedResponse<Book>, any>({
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

/**
 * Fetches the total count of books
 * @returns The query result containing book counts, loading state, and error
 */
export const useBookCount = () => {
  return useQuery<BookCounts, any>({
    queryKey: ["books-count"],
    queryFn: getBookCounts,
  });
};

/**
 * Creates a new book
 * @returns The mutation object for creating a book, including the mutate function, status, and error
 */
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-book"],
    mutationFn: (addBookRequest: BookRequest) => createBook(addBookRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });
};

/**
 * Updates an existing book and refreshes the books list after a successful deletion
 * @returns The mutation object for updating a book, including the mutate function, status, and error
 */
export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, any, { id: string; data: BookRequest }>({
    mutationKey: ["update-book"],
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });
};

/**
 * Deletes a book and refreshes the books list after a successful deletion
 * @returns The mutation result that contains mutate, isLoading and error
 */
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-book"],
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });
};
