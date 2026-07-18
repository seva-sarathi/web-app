import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true, // App starts in a loading state

  setAuth: (user, accessToken) => set({ 
    user, 
    accessToken, 
    isAuthenticated: true,
    isInitializing: false // Stop loading once auth is set
  }),

  clearAuth: () => set({ 
    user: null, 
    accessToken: null, 
    isAuthenticated: false,
    isInitializing: false // Stop loading if auth fails
  }),
  
  setInitializing: (status) => set({ isInitializing: status })
}));