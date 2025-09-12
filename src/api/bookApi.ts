import { Book, BookCounts, BookRequest } from "../models/book";
import { PaginatedResponse } from "../types/PaginatedResponse";
import apiClient from "./axiosConfig";

/**
 * Fetches a paginated list of books from the backend API
 * @param page The page number
 * @param size The number of books per page
 * @param sort Optional field name to sort by
 * @param direction Optional sort order, either asc or desc
 * @returns A book response object containing book data
 */
export const getBooks = async (
  page: number,
  size: number,
  sort: string = "",
  direction: string = ""
): Promise<PaginatedResponse<Book>> => {
  const response = await apiClient.get(`/books?page=${page}&size=${size}&sort=${sort},${direction}`);

  return response.data;
};

/**
 * Fetches details of a single book by its id
 * @param bookId The id of the book to retrieve
 * @returns A Book object containing the book's details
 */
export const getBookById = async (bookId: string | undefined): Promise<Book> => {
  const response = await apiClient.get(`/books/${bookId}`);
  return response.data;
};

/**
 * Fetches a paginated list of books filtered by title
 * @param title The title of the books to search for
 * @param page The page number for pagination
 * @param size The number of books per page
 * @returns A BookResponse object containing book data
 */
export const getBooksByTitle = async (title: string, page: number, size: number): Promise<PaginatedResponse<Book>> => {
  const response = await apiClient.get(`/books/search?title=${title}&page=${page}&size=${size}`);

  return response.data;
};

/**
 * Fetches a paginated list of books filtered by category
 * @param page The page number for pagination
 * @param size The number of books per page
 * @param category The category of books to search for
 * @returns A BookResponse object containing book data
 */
export const getBooksByCategory = async (
  page: number,
  size: number,
  category: string
): Promise<PaginatedResponse<Book>> => {
  const response = await apiClient.get(`/books/search/category?category=${category}&page=${page}&size=${size}`);

  return response.data;
};

/**
 * Fetches the total number of books
 * @returns the total count of books
 */
export const getBookCounts = async (): Promise<BookCounts> => {
  const response = await apiClient.get("/books/admin/book-counts");

  return response.data;
};

/**
 * Creates a new book
 * @param book The book data
 * @returns The created Book object
 */
export const createBook = async (BookRequest: BookRequest): Promise<Book> => {
  const response = await apiClient.post("/books", BookRequest);
  return response.data;
};

/**
 * Updates an existing book by its id
 * @param bookId The id of the book to update
 * @param bookRequest The updated book data
 * @returns The updated Book object
 */
export const updateBook = async (bookId: string, bookRequest: BookRequest): Promise<Book> => {
  const response = await apiClient.put(`/books/${bookId}`, bookRequest);
  return response.data;
};

/**
 * Deletes a book by its id
 * @param id The ID of the book to delete
 * @returns void
 */
export const deleteBook = async (bookId: string): Promise<void> => {
  await apiClient.delete(`/books/${bookId}`);
};
