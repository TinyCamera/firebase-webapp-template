import axios from "axios";
import { store } from "../store/store";
import { selectToken } from "../features/auth/store/authSelectors";

// API URL types for type safety
const API_URLS = {
  development:
    "http://127.0.0.1:5001/your-firebase-project-id-24121/us-central1/api",
  production: `${import.meta.env.VITE_API_URL}/api`,
} as const;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? API_URLS.development : API_URLS.production,
});

// Add auth token to requests
apiClient.interceptors.request.use(function (config) {
  // get auth from redux store
  const token = selectToken(store.getState());
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle common error cases
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Handle auth errors - could dispatch a redux action here if needed
      console.error("Authentication error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
