"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiShield, 
  FiUsers, 
  FiActivity, 
  FiDatabase, 
  FiAlertTriangle,
  FiCommand,
  FiMap,
  FiSettings
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../store/useAuthStore";
import apiClient from "../../../lib/axiosClient";

// TypeScript Interfaces
interface DashboardMetrics {
  activeAgvs: number;
  idleAgvs: number;
  activeRequests: number;
  completedToday: number;
}

export default function MasterControllerDashboard() {
  const router = useRouter();
  const { user, isInitializing } = useAuthStore();
  const [sysHealth, setSysHealth] = useState<string>("VERIFYING...");
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeAgvs: 0,
    idleAgvs: 0,
    activeRequests: 0,
    completedToday: 0
  });

  // 1. Role Guard: Boot anyone who isn't a CONTROLLER
  useEffect(() => {
    if (!isInitializing && user?.role_name !== "CONTROLLER") {
      toast.error("UNAUTHORIZED: Master Controller clearance required.");
      router.replace("/admin");
    }
  }, [user, isInitializing, router]);

  // 2. Fetch System Health & Telemetry
  useEffect(() => {
    if (user?.role_name !== "CONTROLLER") return;

    const fetchSystemData = async () => {
      try {
        const healthRes = await apiClient.get("/health");
        setSysHealth(healthRes.data?.success ? "ONLINE" : "DEGRADED");

        const summaryRes = await apiClient.get("/dashboard/summary");
        setMetrics(summaryRes.data.data);
      } catch (error) {
        setSysHealth("OFFLINE");
        console.error("System telemetry failed to load.");
      }
    };

    fetchSystemData();
    const interval = setInterval(fetchSystemData, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [user]);

  if (isInitializing || user?.role_name !== "CONTROLLER") return null;

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto font-sans text-gray-800 p-4 md:p-8 overflow-hidden">
      
      {/* 3D Ambient Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* HEADER: Modern Command Console */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-500/5 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-4 text-gray-900">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-purple-500/30">
                <FiCommand className="text-2xl" />
              </div>
              Master Override
            </h1>
            <p className="mt-3 text-gray-500 font-medium tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Clearance Level: Controller // Session Active
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl w-full md:w-auto shadow-inner">
            <div className="text-xs font-semibold uppercase text-gray-400 mb-1 tracking-wider">Core Engine Status</div>
            <div className={`text-lg font-bold flex items-center gap-2 ${
              sysHealth === 'ONLINE' ? 'text-green-600' : 'text-red-500'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${sysHealth === 'ONLINE' ? 'bg-green-500 shadow-green-500/50 animate-pulse' : 'bg-red-500 shadow-red-500/50'}`}></div>
              {sysHealth}
            </div>
          </div>
        </div>
      </div>

      {/* METRICS BAR: Real-time Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        {[
          { label: "Active AGVs", value: metrics.activeAgvs, gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
          { label: "Idle / Charging", value: metrics.idleAgvs, gradient: "from-yellow-400 to-orange-400", shadow: "shadow-yellow-500/20" },
          { label: "Live Requests", value: metrics.activeRequests, gradient: "from-red-400 to-rose-500", shadow: "shadow-red-500/20" },
          { label: "Completed (24h)", value: metrics.completedToday, gradient: "from-green-400 to-emerald-500", shadow: "shadow-green-500/20" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-lg shadow-gray-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>
            <div className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">{stat.label}</div>
            <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* COMMAND GRID: Controller Tool Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Module 1: Admin Panel */}
        <Link href="/admin" className="group flex flex-col bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 p-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5 relative z-10">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <FiSettings className="text-3xl" />
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Core Access</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">Admin Panel</h2>
          <p className="font-medium text-gray-500 relative z-10">Manage system users, controller access, and hospital node configurations.</p>
        </Link>

        {/* Module 2: Telemetry & Spatial Map */}
        <Link href="/controller-dashboard/telemetry" className="group flex flex-col bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 p-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-50 rounded-full blur-2xl group-hover:bg-purple-100 transition-colors"></div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5 relative z-10">
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600 group-hover:scale-110 transition-transform duration-300">
              <FiMap className="text-3xl" />
            </div>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Live Tracking</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">Fleet Telemetry</h2>
          <p className="font-medium text-gray-500 relative z-10">Monitor real-time AGV spatial coordinates and execute manual overrides.</p>
        </Link>

        {/* Module 3: System Reports */}
        <Link href="/controller-dashboard/reports" className="group flex flex-col bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300 p-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-yellow-50 rounded-full blur-2xl group-hover:bg-yellow-100 transition-colors"></div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5 relative z-10">
            <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600 group-hover:scale-110 transition-transform duration-300">
              <FiActivity className="text-3xl" />
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Analytics</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">System Reports</h2>
          <p className="font-medium text-gray-500 relative z-10">Analyze historical performance, AGV efficiency, and route delivery metrics.</p>
        </Link>

        {/* Module 4: Audit Logs */}
        <Link href="/controller-dashboard/audit" className="group flex flex-col bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 transition-all duration-300 p-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-colors"></div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5 relative z-10">
            <div className="bg-rose-50 p-3 rounded-xl text-rose-600 group-hover:scale-110 transition-transform duration-300">
              <FiShield className="text-3xl" />
            </div>
            <span className="bg-rose-100 text-rose-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Security</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">Audit Logs</h2>
          <p className="font-medium text-gray-500 relative z-10">Track all critical system events, access logs, and administrative actions.</p>
        </Link>

      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-50/50 backdrop-blur-md border border-red-100 rounded-3xl p-6 md:p-8 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-xl font-bold text-red-700 flex items-center gap-2 mb-4 relative z-10">
          <FiAlertTriangle className="text-2xl" /> Restricted Actions
        </h2>
        <div className="flex flex-wrap gap-4 relative z-10">
          <button className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-lg shadow-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
            Halt All AGVs (Emergency Stop)
          </button>
          <button className="px-6 py-3.5 bg-white hover:bg-red-50 text-red-600 font-medium rounded-xl border border-red-200 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2">
            Flush Redis Queues
          </button>
        </div>
      </div>

    </div>
  );
}