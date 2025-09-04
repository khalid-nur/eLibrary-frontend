/**
 * Represents a user object
 */
export interface User {
  id: string;
  userId: string;
  email: string;
  name: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Represents the count of users
export interface UserCounts {
  // Total number of registered users
  totalUsers: number;
}
