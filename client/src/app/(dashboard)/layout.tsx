"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FiLogOut, 
  FiActivity, 
  FiUser, 
  FiBox, 
  FiSettings, 
  FiInfo, 
  FiShield, 
  FiPieChart,
  FiMenu,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import apiClient from "../../lib/axiosClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // NEW: State to track if the desktop sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Session expired. Please log in again.");
      router.replace("/");
    } else {
      setIsVerifying(false);
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      clearAuth();
      router.replace("/");
    }
  };

  const navLinks = useMemo(() => {
    const role = user?.role_name || "USER";
    const links: Record<string, any[]> = {
      USER: [
        { name: "Deliveries", path: "/requests", icon: FiBox },
        { name: "About", path: "/about", icon: FiInfo },
      ],
      ADMIN: [
        { name: "Deliveries", path: "/requests", icon: FiBox },
        { name: "Admin Panel", path: "/admin", icon: FiSettings },
        { name: "Telemetry", path: "/controller-dashboard/telemetry", icon: FiActivity },
        { name: "About", path: "/about", icon: FiInfo },
      ],
      CONTROLLER: [
        { name: "Admin Panel", path: "/admin", icon: FiSettings },
        { name: "Telemetry", path: "/controller-dashboard/telemetry", icon: FiActivity },
        { name: "Audit Logs", path: "/controller-dashboard/audit", icon: FiShield },
        { name: "System Reports", path: "/controller-dashboard/reports", icon: FiPieChart },
        { name: "About", path: "/about", icon: FiInfo },
      ]
    };
    return links[role] || links.USER;
  }, [user]);

  if (isVerifying) {
    return (
      <div className="h-screen w-full flex flex-col gap-4 items-center justify-center bg-gray-50 text-gray-500 font-sans">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm font-medium tracking-wide">Verifying Session...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* SIDEBAR (Desktop) */}
      {/* Transition width smoothly between w-64 (expanded) and w-20 (collapsed) */}
      <aside 
        className={`hidden md:flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 bg-white z-10 shadow-sm ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        
        {/* Brand Header & Collapse Button */}
        <div className={`p-6 flex items-center ${isCollapsed ? "justify-center px-4" : "justify-between"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-blue-600 p-2 rounded-lg text-white shrink-0">
              <FiActivity className="text-xl" />
            </div>
            
            {/* Hide text when collapsed */}
            <span className={`text-xl font-bold tracking-tight text-gray-900 transition-opacity duration-300 ${isCollapsed ? "hidden" : "block whitespace-nowrap"}`}>
              SevaSarathi
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-2 overflow-y-auto overflow-x-hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || pathname.startsWith(`${link.path}/`);
            return (
              <Link 
                key={link.path}
                href={link.path} 
                title={isCollapsed ? link.name : ""} // Show tooltip when collapsed
                className={`flex items-center rounded-xl transition-all font-medium text-sm ${
                  isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
                } ${
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <link.icon className={`text-xl shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} /> 
                
                {/* Hide text when collapsed */}
                {!isCollapsed && <span className="whitespace-nowrap">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-3">
          
          {/* User Info */}
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-2"}`}>
            <div className="bg-gray-200 p-2 rounded-full text-gray-600 shrink-0">
              <FiUser className="text-lg" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="text-sm font-semibold text-gray-900 truncate">{user?.username || 'Staff'}</div>
                <div className="text-xs font-medium text-blue-600 truncate">{user?.role_name}</div>
              </div>
            )}
          </div>
          
          {/* Action Buttons Row */}
          <div className={`flex gap-2 ${isCollapsed ? "flex-col" : "flex-row"}`}>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              title={isCollapsed ? "Logout" : ""}
              className={`flex items-center justify-center gap-2 p-2.5 bg-white text-gray-700 text-sm font-medium border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors ${
                isCollapsed ? "w-full" : "flex-1"
              }`}
            >
              <FiLogOut className="text-lg shrink-0" /> 
              {!isCollapsed && <span>Logout</span>}
            </button>

            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex items-center justify-center p-2.5 bg-white text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                isCollapsed ? "w-full" : "w-10"
              }`}
            >
              {isCollapsed ? <FiChevronRight className="text-lg shrink-0" /> : <FiChevronLeft className="text-lg shrink-0" />}
            </button>
            
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header (Remains unchanged) */}
        <header className="md:hidden p-4 border-b border-gray-200 bg-white flex justify-between items-center z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <FiActivity className="text-blue-600 text-xl" />
            <span className="font-bold tracking-tight text-gray-900">SevaSarathi</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600 transition-colors">
              <FiLogOut className="text-xl" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 bg-gray-100 rounded-lg text-gray-700"
            >
              <FiMenu className="text-xl" />
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu (Remains unchanged) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[73px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-30 flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={`mobile-${link.path}`}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  pathname === link.path ? "bg-blue-50 text-blue-700" : "text-gray-600 active:bg-gray-50"
                }`}
              >
                <link.icon className="text-lg" /> {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </main>

    </div>
  );
}