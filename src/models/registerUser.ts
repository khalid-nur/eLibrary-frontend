/**
 * Represents request for user registration
 */
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Represents response for user registration
 */
export interface RegisterUserResponse {
  userId: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
