"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import apiClient from "../../../lib/axiosClient";

function SetupPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extracts ?token=... from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing setup token. Please check your email link.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post("/auth/password-setup", { 
        token, 
        password
      });
      
      toast.success("Password set successfully! Redirecting to login...");
      
      // Give the toast a second to show before redirecting
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to set password. The link may have expired."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-black">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold uppercase tracking-wide border-b-4 border-black pb-2 inline-block">
            Set Password
          </h2>
          <p className="mt-4 text-gray-600 font-semibold leading-relaxed">
            Welcome to SevaSarathi. Please secure your account by creating a new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* New Password Input */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-xl text-black" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 p-4 border-2 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiCheckCircle className="text-xl text-black" />
              </div>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 p-4 border-2 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 p-4 bg-black text-white font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Secure Account'}
          </button>
        </form>
        
      </div>
    </div>
  );
}

// Next.js requires components reading URL parameters to be wrapped in Suspense
export default function SetupPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center font-bold text-2xl uppercase tracking-widest">
        Loading...
      </div>
    }>
      <SetupPasswordForm />
    </Suspense>
  );
}