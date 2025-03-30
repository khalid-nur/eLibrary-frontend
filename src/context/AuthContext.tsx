import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../models/authUser";

/**
 * Represents the authentication context
 */
interface AuthContextType {
  isAuthenticated: boolean;
  updateAuth: (flag: boolean) => void;
  isLoading: boolean;
  user: User;
}

/**
 * Default values for the authentication context when no provider is available
 */
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  updateAuth: () => {},
  isLoading: true,
  user: { name: "", email: "", role: "" },
};

/**
 * Context that provides authentication state to the application
 */
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

/**
 * Provider component that manages and shares authentication state across the application
 * @param children A component that will have access to the auth context
 * @returns Context provider wrapping the application
 */
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({ name: "", email: "", role: "" });

  /**
   * Updates the authentication status
   * @param status Set true when login succeeds
   */
  const updateAuth = (status: boolean) => {
    setAuthenticated(status);
  };

  /**
   * Retrieves and validates saved authentication data from localStorage
   * Updates user data and auth state if valid credentials exist
   */
  const fetchAuthData = () => {
    try {
      // Get stored user data from local storage if available
      const authObject = localStorage.getItem("user");

      if (authObject) {
        // Convert the string data back to a JavaScript object
        const authData = JSON.parse(authObject);

        // Update context with authenticated user data
        setUser(authData);

        // Confirm the user is logged in
        setAuthenticated(true);
      }
    } catch {
      // Clear authentication if data is invalid
      setAuthenticated(false);
    } finally {
      // Loading complete in all cases
      setIsLoading(false);
    }
  };

  /**
   * Check authentication state on initial render and when isAuthenticated changes
   */
  useEffect(() => {
    fetchAuthData();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, updateAuth, isLoading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
