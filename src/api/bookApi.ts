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
