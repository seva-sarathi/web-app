"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiBox, FiPlus, FiRefreshCw, FiTruck, FiClock, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import apiClient from "../../../lib/axiosClient";
import NewRequestModal from "../.././../components/ui/NewRequestModel";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      // Adjust endpoint based on your backend. Fallback data used for visual structure if empty.
      const response = await apiClient.get("/requests");
      setRequests(response.data.data);
    } catch (error) {
      toast.error("Failed to load live requests.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    
    // Optional: Set up a polling mechanism to refresh the board every 10 seconds
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  // Helper to render status colors in a brutalist way
  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="bg-yellow-300 text-black border-2 border-black px-3 py-1 text-xs font-bold uppercase flex items-center gap-2"><FiClock /> Pending</span>;
      case "IN_TRANSIT":
        return <span className="bg-blue-300 text-black border-2 border-black px-3 py-1 text-xs font-bold uppercase flex items-center gap-2 animate-pulse"><FiTruck /> In Transit</span>;
      case "COMPLETED":
        return <span className="bg-green-300 text-black border-2 border-black px-3 py-1 text-xs font-bold uppercase flex items-center gap-2"><FiCheckCircle /> Completed</span>;
      default:
        return <span className="bg-gray-200 text-black border-2 border-black px-3 py-1 text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto font-sans text-black">
      
      <NewRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchRequests} 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
            <FiBox className="text-4xl" />
            Live Deliveries
          </h1>
          <p className="mt-2 text-gray-600 font-semibold border-l-4 border-black pl-3">
            Monitor and dispatch AGV logistics across the facility.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={fetchRequests} className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
            <FiRefreshCw className={`text-xl ${isLoading ? "animate-spin" : ""}`} />
          </button>
          
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-yellow-300 text-black font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
            <FiPlus className="text-xl" /> Dispatch AGV
          </button>
        </div>
      </div>

      {/* Grid Display for Dispatch Tickets */}
      {isLoading && requests.length === 0 ? (
        <div className="text-center p-12 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold uppercase text-xl animate-pulse">
          Connecting to Fleet...
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center p-12 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold uppercase text-xl">
          No active delivery requests. Floor is clear.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req.id} className={`flex flex-col bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 ${req.priority === 'URGENT' ? 'border-red-500' : ''}`}>
              
              {/* Card Header */}
              <div className="p-4 border-b-4 border-black bg-gray-50 flex justify-between items-center">
                <span className="font-bold font-mono text-lg">#{req.id.toString().padStart(4, '0')}</span>
                {renderStatus(req.status)}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1">
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase text-gray-500 mb-1">Route</div>
                  <div className="flex items-center gap-3 font-semibold text-lg">
                    <span className="truncate max-w-[120px]">{req.pickup_location}</span>
                    <FiArrowRight className="text-gray-400 shrink-0" />
                    <span className="truncate max-w-[120px]">{req.dropoff_location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t-2 border-dashed border-gray-300 pt-4 mt-auto">
                  <div>
                    <div className="text-xs font-bold uppercase text-gray-500 mb-1">Assigned AGV</div>
                    <div className="font-bold text-lg uppercase">{req.agv_id || "Unassigned"}</div>
                  </div>
                  {req.priority === 'URGENT' && (
                    <div className="bg-red-500 text-white border-2 border-black px-2 py-1 text-xs font-bold uppercase animate-bounce">
                      Urgent
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}