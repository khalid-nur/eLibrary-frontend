import axios from "axios";

/**
 * Configuration to interact with the backend API
 */
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default apiClient;
