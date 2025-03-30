/**
 * Represents a user data model
 */
export interface User {
  name: string;
  email: string;
  role: string;
}

/**
 * Represents request for user authentication
 */
export interface AuthRequest {
  email: string;
  password: string;
}

/**
 * Represents response for user authentication
 */
export interface AuthResponse {
  name: string;
  email: string;
  token: string;
  role?: string;
}
