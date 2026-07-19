"use client";

import { useState, useEffect } from "react";
import { 
  FiShield, 
  FiRefreshCw, 
  FiClock, 
  FiUser, 
  FiActivity, 
  FiServer,
  FiTerminal,
  FiAlertOctagon
} from "react-icons/fi";

// TypeScript Interfaces matching your SQL schema
interface AuditLog {
  id: number;
  action: string;
  resource: string;
  ip_address: string;
  details: {
    method: string;
    url: string;
    status: number;
    body?: any;
  };
  created_at: string;
  username: string;
  role_name: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Realistic Dummy Data
  const fetchMockLogs = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLogs([
        {
          id: 1042,
          action: "EMERGENCY_STOP",
          resource: "AGV_FLEET",
          ip_address: "192.168.1.105",
          details: { method: "POST", url: "/api/v1/fleet/override", status: 200, body: { agv_id: "AGV-02", reason: "Obstacle collision imminent" } },
          created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
          username: "admin_krishna",
          role_name: "CONTROLLER"
        },
        {
          id: 1041,
          action: "DISPATCH_AGV",
          resource: "AGV_FLEET",
          ip_address: "192.168.1.42",
          details: { method: "POST", url: "/api/v1/dispatch", status: 200, body: { pickup: "PHARMACY", dropoff: "ICU", item: "Morphine" } },
          created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          username: "nurse_aditi",
          role_name: "USER"
        },
        {
          id: 1040,
          action: "CREATE_USER",
          resource: "SYSTEM_AUTH",
          ip_address: "192.168.1.105",
          details: { method: "POST", url: "/api/v1/auth/register", status: 201, body: { username: "dr_sharma", role: "USER" } },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          username: "admin_krishna",
          role_name: "CONTROLLER"
        },
        {
          id: 1039,
          action: "ROUTE_RECALCULATE",
          resource: "MEC_SERVER",
          ip_address: "10.0.0.1",
          details: { method: "PUT", url: "/api/v1/fleet/agv-04/route", status: 200, body: { bypass_node: "HALL_2" } },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          username: "system_auto",
          role_name: "SYSTEM"
        },
        {
          id: 1038,
          action: "LOGIN_SUCCESS",
          resource: "SYSTEM_AUTH",
          ip_address: "192.168.1.105",
          details: { method: "POST", url: "/api/v1/auth/login", status: 200 },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          username: "admin_krishna",
          role_name: "CONTROLLER"
        }
      ]);
      setIsLoading(false);
    }, 800); // Fake network delay
  };

  useEffect(() => {
    fetchMockLogs();
  }, []);

  // Helper to format timestamps beautifully
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).format(date);
  };

  // Helper for action badges
  const getActionBadge = (action: string) => {
    if (action.includes("STOP") || action.includes("FAIL") || action.includes("DELETE")) {
      return <span className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><FiAlertOctagon /> {action.replace(/_/g, " ")}</span>;
    }
    if (action.includes("CREATE") || action.includes("SUCCESS")) {
      return <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit">{action.replace(/_/g, " ")}</span>;
    }
    if (action.includes("DISPATCH") || action.includes("ROUTE")) {
      return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit">{action.replace(/_/g, " ")}</span>;
    }
    return <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit">{action.replace(/_/g, " ")}</span>;
  };

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto font-sans text-gray-800 p-4 md:p-8 overflow-hidden">
      
      {/* 3D Ambient Background Orbs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-red-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Modern Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 p-2.5 rounded-xl text-white shadow-lg shadow-red-500/30">
              <FiShield className="text-2xl" />
            </div>
            Security & Audit Logs
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Immutable record of all system overrides, dispatches, and access events.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Logger Active
          </div>
          <button 
            onClick={fetchMockLogs}
            className="p-3 bg-white text-gray-600 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:text-red-600 transition-all active:scale-95"
            title="Refresh Logs"
          >
            <FiRefreshCw className={`text-xl ${isLoading ? "animate-spin text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* 3D Glassmorphism Data Table Wrapper */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden relative">
        
        {/* Subtle inner highlight for depth */}
        <div className="absolute inset-0 border border-white rounded-3xl pointer-events-none"></div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            
            {/* Table Head */}
            <thead className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/80 text-gray-500">
              <tr>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-40 rounded-tl-3xl">Timestamp</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-48">Actor / User</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-48">Action</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-40">Target Resource</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider">Payload Details</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100/80 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                      <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium animate-pulse">Decrypting secure logs...</span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-gray-500 font-medium">
                    No log entries found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-red-50/30 transition-colors group"
                  >
                    {/* Timestamp */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
                        <FiClock className="text-gray-400" />
                        {formatTime(log.created_at)}
                      </div>
                    </td>

                    {/* Actor (User) */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${log.role_name === 'CONTROLLER' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                          {log.role_name === 'SYSTEM' ? <FiServer /> : <FiUser />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{log.username}</span>
                          <span className="text-[10px] font-medium text-gray-400 tracking-wider">IP: {log.ip_address}</span>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="p-5">
                      {getActionBadge(log.action)}
                    </td>

                    {/* Resource */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-700 font-medium text-xs">
                        <FiActivity className="text-gray-400" />
                        {log.resource.replace(/_/g, " ")}
                      </div>
                    </td>

                    {/* Details Payload */}
                    <td className="p-5">
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 font-mono text-[10px] text-gray-600 overflow-hidden relative group-hover:bg-white group-hover:shadow-sm transition-all">
                        <div className="flex items-center gap-2 mb-1 border-b border-gray-200 pb-1">
                          <FiTerminal className="text-gray-400" />
                          <span className={`font-bold ${log.details.method === 'POST' ? 'text-green-600' : 'text-blue-600'}`}>
                            {log.details.method}
                          </span>
                          <span className="text-gray-500 truncate">{log.details.url}</span>
                          <span className="ml-auto font-bold text-gray-400">[{log.details.status}]</span>
                        </div>
                        {log.details.body ? (
                          <div className="whitespace-pre-wrap pt-1 text-gray-500">
                            {JSON.stringify(log.details.body, null, 2)}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic pt-1 inline-block">No payload attached.</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}