import { Book } from "../models/book";
import { BookResponse } from "../types/BookResponse";
import apiClient from "./axiosConfig";

/**
 * Fetches a paginated list of books from the backend API
 * @param page The page number
 * @param size The number of books per page
 * @returns A book response object containing book data
 */
export const getBooks = async (
  page: number,
  size: number
): Promise<BookResponse> => {
  const response = await apiClient.get(`/books?page=${page}&size=${size}`);

  return response.data;
};

/**
 * Fetches details of a single book by its id
 * @param bookId The id of the book to retrieve
 * @returns A Book object containing the book's details
 */
export const getBookById = async (
  bookId: string | undefined
): Promise<Book> => {
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
export const getBooksByTitle = async (
  title: string,
  page: number,
  size: number
): Promise<BookResponse> => {
  const response = await apiClient.get(
    `/books/search?title=${title}&page=${page}&size=${size}`
  );

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
): Promise<BookResponse> => {
  const response = await apiClient.get(
    `/books/search/category?category=${category}&page=${page}&size=${size}`
  );

  return response.data;
};
