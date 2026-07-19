"use client";

import { useState, useEffect } from "react";
import { 
  FiActivity, 
  FiPieChart, 
  FiDownload, 
  FiFileText, 
  FiTrendingUp,
  FiClock,
  FiBatteryCharging,
  FiCheckCircle
} from "react-icons/fi";
import { toast } from "react-toastify";

// TypeScript Interfaces
interface Report {
  id: string;
  name: string;
  type: "PDF" | "CSV" | "XLSX";
  date: string;
  size: string;
  status: "READY" | "GENERATING";
}

interface Metric {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: any;
  color: string;
}

export default function SystemReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Realistic Dummy Data
  const fetchMockData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMetrics([
        { label: "Total Deliveries", value: "1,452", trend: "+12.5% this week", isPositive: true, icon: FiCheckCircle, color: "text-green-500 bg-green-50" },
        { label: "Avg Delivery Time", value: "4m 12s", trend: "-30s vs last month", isPositive: true, icon: FiClock, color: "text-blue-500 bg-blue-50" },
        { label: "Fleet Uptime", value: "99.98%", trend: "Stable", isPositive: true, icon: FiActivity, color: "text-purple-500 bg-purple-50" },
        { label: "Avg Battery Drain", value: "8.2%", trend: "+1.1% due to load", isPositive: false, icon: FiBatteryCharging, color: "text-amber-500 bg-amber-50" }
      ]);

      setReports([
        { id: "REP-9921", name: "Weekly Fleet Efficiency", type: "PDF", date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), size: "2.4 MB", status: "READY" },
        { id: "REP-9920", name: "Battery Degradation Analysis", type: "CSV", date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), size: "845 KB", status: "READY" },
        { id: "REP-9919", name: "Node Congestion Heatmap", type: "PDF", date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), size: "4.1 MB", status: "READY" },
        { id: "REP-9918", name: "Monthly Audit Summary", type: "XLSX", date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), size: "1.2 MB", status: "READY" },
      ]);
      setIsLoading(false);
    }, 600); // Fake network delay
  };

  useEffect(() => {
    fetchMockData();
  }, []);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    toast.info("Compiling latest telemetry data...");
    
    setTimeout(() => {
      const newReport: Report = {
        id: `REP-${Math.floor(Math.random() * 9000) + 1000}`,
        name: "Custom Real-time Snapshot",
        type: "PDF",
        date: new Date().toISOString(),
        size: "1.8 MB",
        status: "READY"
      };
      setReports([newReport, ...reports]);
      setIsGenerating(false);
      toast.success("New report generated successfully.");
    }, 2500);
  };

  const handleDownload = (name: string) => {
    toast.success(`Downloading: ${name}`);
  };

  const formatTime = (isoString: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"
    }).format(new Date(isoString));
  };

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto font-sans text-gray-800 p-4 md:p-8 overflow-hidden">
      
      {/* 3D Ambient Background Orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Modern Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 rounded-xl text-white shadow-lg shadow-orange-500/30">
              <FiPieChart className="text-2xl" />
            </div>
            Analytics & Reports
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Analyze historical performance, fleet efficiency, and routing metrics.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Compiling...</>
            ) : (
              <><FiFileText className="text-xl" /> Generate New Report</>
            )}
          </button>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white/50 border border-white rounded-3xl p-6 h-32 animate-pulse"></div>
          ))
        ) : (
          metrics.map((metric, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl shadow-gray-200/40 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${metric.color}`}>
                  <metric.icon className="text-xl" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${metric.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                  {metric.isPositive ? <FiTrendingUp /> : <FiTrendingUp className="rotate-180" />}
                  {metric.trend}
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900 tracking-tight">{metric.value}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{metric.label}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3D Glassmorphism Data Table Wrapper for Reports */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden relative">
        
        {/* Subtle inner highlight for depth */}
        <div className="absolute inset-0 border border-white rounded-3xl pointer-events-none"></div>

        <div className="p-6 border-b border-gray-100/80 bg-white/40 flex items-center gap-2">
          <FiFileText className="text-gray-400 text-lg" />
          <h2 className="font-bold text-gray-800">Generated Reports Archive</h2>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse min-w-[800px]">
            
            {/* Table Head */}
            <thead className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/80 text-gray-500">
              <tr>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-32 pl-8">Report ID</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider">Report Name</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-32">Format</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-48">Generated On</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-32 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100/80 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium animate-pulse">Loading archive...</span>
                    </div>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-gray-500 font-medium">
                    No reports generated yet.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr 
                    key={report.id} 
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="p-5 pl-8 font-medium text-gray-500">#{report.id.split('-')[1]}</td>
                    
                    <td className="p-5 font-semibold text-gray-900 flex items-center gap-3">
                      {report.name}
                      {report.status === 'GENERATING' && (
                        <span className="flex items-center gap-1 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase font-bold animate-pulse">
                          <div className="w-1 h-1 bg-amber-500 rounded-full"></div> Processing
                        </span>
                      )}
                    </td>

                    <td className="p-5">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border w-fit flex items-center justify-center ${
                        report.type === 'PDF' ? 'bg-red-50 text-red-600 border-red-200' :
                        report.type === 'CSV' ? 'bg-green-50 text-green-600 border-green-200' :
                        'bg-blue-50 text-blue-600 border-blue-200'
                      }`}>
                        {report.type} • {report.size}
                      </span>
                    </td>

                    <td className="p-5 text-gray-500 font-medium text-xs">
                      {formatTime(report.date)}
                    </td>

                    <td className="p-5 text-center">
                      <button 
                        onClick={() => handleDownload(report.name)}
                        disabled={report.status !== 'READY'}
                        className="p-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl shadow-sm hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex"
                        title="Download Report"
                      >
                        <FiDownload className="text-lg" />
                      </button>
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