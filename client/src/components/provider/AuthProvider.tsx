"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import apiClient from "../../lib/axiosClient.js";

export default function AuthProvider({ children }) {
  const { setAuth, clearAuth, isInitializing, setInitializing } = useAuthStore();

  useEffect(() => {
    const silentRefresh = async () => {
      try {
        // The browser automatically attaches the HttpOnly refreshToken cookie here
        const response = await apiClient.post("/auth/refresh");
        const { user, accessToken } = response.data.data;
        
        // Restore memory state
        setAuth(user, accessToken);
      } catch (error) {
        // If the refresh token is missing, expired, or invalid, wipe state
        clearAuth();
      } finally {
        setInitializing(false);
      }
    };

    silentRefresh();
  }, [setAuth, clearAuth, setInitializing]);

  // Show a bold, boxy loading screen while verifying
  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-black font-sans">
        <div className="border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white text-center">
          <div className="text-2xl font-bold uppercase tracking-widest animate-pulse">
            Initializing System
          </div>
          <p className="mt-2 font-semibold text-gray-600">Verifying secure session...</p>
        </div>
      </div>
    );
  }

  return children;
}