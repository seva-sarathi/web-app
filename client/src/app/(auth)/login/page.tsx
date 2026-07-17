"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiArrowRight, FiActivity } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore.js";
import apiClient from "../../../lib/axiosClient.js";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", { username, password });
      const { user, accessToken } = response.data.data;
      console.log(response);
      console.log(response.data.user);

      // Save to Zustand in-memory store
      setAuth(user, accessToken);
      
      toast.success(`Welcome back, ${user.username || 'Staff'}!`);
      
      // Redirect based on role
      if (user.role_name === 'CONTROLLER' || user.role_name === 'ADMIN') {
        router.push("/admin"); // Adjust to your actual dashboard route
      } else {
        router.push("/requests");
      }
      
    } catch (err:any) {
      // Show error via Toastify instead of inline text
      toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-white text-black">
      
      {/* LEFT SIDE (Desktop) / BOTTOM SIDE (Mobile) - Brand Messaging */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16 border-t-2 md:border-t-0 md:border-r-2 border-black bg-gray-50">
        <div className="max-w-md">
          <FiActivity className="text-6xl mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none mb-6">
            Automated <br /> Logistics for <br /> Modern Hospitals.
          </h1>
          <p className="text-lg font-semibold border-l-4 border-black pl-4">
            SevaSarathi AGV Management Platform.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Desktop) / TOP SIDE (Mobile) - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h2 className="text-4xl font-bold uppercase tracking-wide border-b-4 border-black pb-2 inline-block">
              Staff Login
            </h2>
            <p className="mt-4 text-gray-600 font-semibold">Enter your credentials to access the system.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* username Input */}
            <div>
              <label className="block text-sm font-bold uppercase mb-2">username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="text-xl text-black" />
                </div>
                <input 
                  type="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 p-4 border-2 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1"
                  placeholder="admin@sevasarathi.com"
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold uppercase mb-2">Password</label>
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

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-3 p-4 bg-black text-white font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <FiArrowRight className="text-xl" />}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}