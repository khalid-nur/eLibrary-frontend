import axios from "axios";

/**
 * Configuration to interact with the backend API
 */
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

/**
 * Request interceptor for handling JWT authentication
 */
apiClient.interceptors.request.use(
  (config) => {
    // Skip authentication headers for public endpoints
    if (!config.url?.includes("/login") && !config.url?.includes("/register")) {
      const authObject = localStorage.getItem("user");

      if (authObject) {
        try {
          // Convert the string data back to a JavaScript object
          const { token } = JSON.parse(authObject);
          if (token) {
            // Set the Authorization header with the JWT token
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          // Continue without token if auth object is invalid
          // This is a fallback in case the token is not available or invalid
          console.error(
            "Failed to retrieve auth object from localStorage:",
            error
          );
        }
      }
    }
    // Return the updated configuration
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
