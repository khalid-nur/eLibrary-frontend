/**
 * Represents a paginated response from the api
 * @template T The type of data contained in the response
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}
