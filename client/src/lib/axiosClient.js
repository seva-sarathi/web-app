import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true, // Crucial: Allows backend to set the HttpOnly Refresh Cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept every request to attach the access token
apiClient.interceptors.request.use((config) => {
  // Read token directly from Zustand store
  const token = useAuthStore.getState().accessToken;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;