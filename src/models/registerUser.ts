/**
 * Represents request for users registration
 */
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Represents response for users registration
 */
export interface RegisterUserResponse {
  userId: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
