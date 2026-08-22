"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiMail, FiLock, FiArrowRight, FiActivity, FiInfo } from "react-icons/fi";
import { useAuthStore } from "../store/useAuthStore";
import apiClient from "../lib/axiosClient";

export default function HomeLoginMerge() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", { username, password });
      const { user, accessToken } = response.data.data;
      
      setAuth(user, accessToken);
      toast.success(`Welcome back, ${user.name || 'Staff'}!`);
      
      if (user.role_name === 'CONTROLLER' || user.role_name === 'ADMIN') {
        router.push("/admin"); 
      } else {
        router.push("/requests");
      }
      
    } catch (err:any) {
      toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      
      {/* Top Navbar */}
      <header className="w-full p-4 md:p-6 border-b-2 border-black flex justify-between items-center bg-gray-50 z-10 relative">
        <div className="flex items-center gap-3">
          <FiActivity className="text-3xl" />
          <span className="text-2xl font-bold uppercase tracking-wider">SevaSarathi</span>
        </div>
        <Link 
          href="/about" 
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold uppercase text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
        >
          <FiInfo className="text-lg" />
          <span className="hidden sm:inline">About</span>
        </Link>
      </header>

      {/* Main Content Area - Splits into columns on Desktop */}
      <main className="flex-grow flex flex-col lg:flex-row">
        
        {/* LEFT SIDE (Mobile Top) - Login Form */}
        <div className="w-full lg:w-5/12 xl:w-4/12 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-black z-0">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <h2 className="text-4xl font-bold uppercase tracking-wide border-b-4 border-black pb-2 inline-block">
                Staff Login
              </h2>
              <p className="mt-4 text-gray-600 font-semibold">Enter your credentials to access the logistics dashboard.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
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

        {/* RIGHT SIDE (Mobile Bottom) - Hero Content */}
        <div className="w-full lg:w-7/12 xl:w-8/12 flex items-center justify-center p-8 md:p-16 bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="max-w-2xl text-left lg:text-left">
            
            <div className="inline-block border-2 border-black px-4 py-1 mb-8 font-bold uppercase tracking-widest text-sm bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              v1.0 Internal Alpha
            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter uppercase leading-none mb-8">
              SevaSarathi <br /> Healthcare. <br /> Logistics. 
            </h1>
            
            <p className="text-lg md:text-xl font-semibold text-gray-700 mb-10 border-l-4 border-black pl-6 bg-white/80 py-2">
              Automated Guided Vehicle (AGV) management to securely and efficiently route medical supplies across the hospital floor.
            </p>

            <div className="flex gap-4 items-center font-bold uppercase text-sm">
              <span className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                System Online
              </span>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}