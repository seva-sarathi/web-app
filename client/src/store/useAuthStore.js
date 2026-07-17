import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  // Call this after a successful login
  setAuth: (user, accessToken) => set({ 
    user, 
    accessToken, 
    isAuthenticated: true 
  }),

  // Call this on logout
  clearAuth: () => set({ 
    user: null, 
    accessToken: null, 
    isAuthenticated: false 
  }),
}));