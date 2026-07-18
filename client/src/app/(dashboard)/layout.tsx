"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut, FiActivity, FiUser, FiBox, FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import apiClient from "../../lib/axiosClient";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Basic Gatekeeper: If no user in memory, kick them back to login.
    if (!isAuthenticated) {
      toast.error("Session expired. Please log in again.");
      router.replace("/");
    } else {
      setIsVerifying(false);
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout"); // Call backend to clear HttpOnly cookie
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      clearAuth(); // Wipe Zustand memory
      router.replace("/");
    }
  };

  // Prevent flashing the dashboard before redirect kicks in
  if (isVerifying) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-black font-sans text-2xl font-bold uppercase tracking-widest">
        Verifying Session...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-black font-sans overflow-hidden">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r-2 border-black bg-white z-10">
        <div className="p-6 border-b-2 border-black flex items-center gap-3">
          <FiActivity className="text-2xl" />
          <span className="text-xl font-bold uppercase tracking-wider">SevaSarathi</span>
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Render links based on user role */}
          {(user?.role_name === 'CONTROLLER' || user?.role_name === 'ADMIN') && (
            <Link 
              href="/admin" 
              className={`flex items-center gap-3 p-3 font-bold uppercase border-2 transition-all ${
                pathname === "/admin" 
                  ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                  : "bg-white text-black border-transparent hover:border-black"
              }`}
            >
              <FiSettings className="text-lg" /> Control Panel
            </Link>
          )}

          <Link 
            href="/requests" 
            className={`flex items-center gap-3 p-3 font-bold uppercase border-2 transition-all ${
              pathname.includes("/requests") 
                ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                : "bg-white text-black border-transparent hover:border-black"
            }`}
          >
            <FiBox className="text-lg" /> Deliveries
          </Link>
        </nav>

        <div className="p-4 border-t-2 border-black bg-gray-100">
          <div className="flex items-center gap-3 mb-4 font-bold uppercase text-sm truncate">
            <FiUser className="text-xl shrink-0" />
            <div className="truncate">
              <div>{user?.username || 'Staff'}</div>
              <div className="text-xs text-gray-500">{user?.role_name}</div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 bg-white text-black font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden p-4 border-b-2 border-black bg-white flex justify-between items-center">
          <span className="font-bold uppercase tracking-widest">SevaSarathi</span>
          <button onClick={handleLogout} className="p-2 border-2 border-black bg-black text-white">
            <FiLogOut />
          </button>
        </header>

        {/* Dynamic Page Content goes here */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}