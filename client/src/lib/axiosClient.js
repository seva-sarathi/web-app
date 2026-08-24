import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Dynamic base URL with a fallback to port 5001
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial: Allows backend to set/receive HttpOnly Refresh Cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept every request to attach the access token
apiClient.interceptors.request.use(
  (config) => {
    // Read token directly from Zustand store
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
