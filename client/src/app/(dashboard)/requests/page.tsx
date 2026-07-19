"use client";

import { useState } from "react";
import { FiSend, FiMap, FiPackage, FiInfo } from "react-icons/fi";
import { toast } from "react-toastify";
import LiveHospitalMap from "../../../components/ui/LiveHospitalMap";

export default function RequestsPage() {
  const [formData, setFormData] = useState({
    pickup: "PHARMACY",
    dropoff: "ICU",
    item: "",
  });
  const [isDispatching, setIsDispatching] = useState(false);
  
  // Track the user's active delivery to filter the map
  const [activeDelivery, setActiveDelivery] = useState(null);

  const validLocations = ["PHARMACY", "ICU", "GENERAL_WARD", "WARD_A", "CHARGING_STATION"];

  const handleDispatch = async (e) => {
    e.preventDefault();
    
    if (formData.pickup === formData.dropoff) {
      toast.error("Pickup and Drop-off locations cannot be the same.");
      return;
    }

    setIsDispatching(true);

    try {
      const res = await fetch("http://localhost:4000/api/v1/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Dispatched! ${data.agv} is en route.`);
        
        // Save the active job details and the assigned AGV ID
        setActiveDelivery({
          agvId: data.agv,
          pickup: formData.pickup,
          dropoff: formData.dropoff,
          item: formData.item
        });
        
        // Clear the item input for the next potential request
        setFormData({ ...formData, item: "" });
      } else {
        toast.error(data.error || "Failed to dispatch AGV.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Cannot connect to the dispatch engine. Ensure it is running.");
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-sans text-gray-800">
      
      {/* Soft, Modern Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Request Delivery
        </h1>
        <p className="mt-2 text-gray-500">
          Dispatch an automated vehicle and track your order in real-time.
        </p>
      </div>

      {/* Main Layout: Column on Mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT / TOP: Dispatch Form & Active Order */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <FiSend className="text-blue-500" /> New Dispatch
            </h2>
            
            <form onSubmit={handleDispatch} className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <select 
                  value={formData.pickup}
                  onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all cursor-pointer"
                >
                  {validLocations.map(loc => (
                    <option key={`pickup-${loc}`} value={loc}>{loc.replace("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
                <select 
                  value={formData.dropoff}
                  onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all cursor-pointer"
                >
                  {validLocations.map(loc => (
                    <option key={`dropoff-${loc}`} value={loc}>{loc.replace("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo Item</label>
                <input 
                  type="text" 
                  value={formData.item}
                  onChange={(e) => setFormData({...formData, item: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. Blood Samples, Syringes"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isDispatching}
                className="w-full mt-2 p-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isDispatching ? "Routing..." : "Confirm Dispatch"}
              </button>
            </form>
          </div>

          {/* Active Order Status Card (Only shows if they have requested something) */}
          {activeDelivery && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="text-blue-800 font-semibold mb-3 flex items-center gap-2">
                <FiPackage /> Active Order
              </h3>
              <div className="space-y-2 text-sm text-blue-900">
                <p><strong>Assigned To:</strong> {activeDelivery.agvId}</p>
                <p><strong>Route:</strong> {activeDelivery.pickup.replace("_", " ")} &rarr; {activeDelivery.dropoff.replace("_", " ")}</p>
                <p><strong>Cargo:</strong> {activeDelivery.item}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-3 text-sm text-gray-500 px-2">
            <FiInfo className="text-lg shrink-0 mt-0.5 text-gray-400" />
            <p>Routes are dynamically calculated to ensure the fastest delivery time.</p>
          </div>
        </div>

        {/* RIGHT / BOTTOM: Live Map Integration */}
        <div className="w-full lg:w-2/3 flex flex-col h-[600px] lg:h-auto">
          <div className="mb-4 flex items-center gap-2 px-2">
            <FiMap className="text-gray-500 text-xl" />
            <span className="font-semibold text-gray-700">Live Tracker</span>
          </div>
          
          {/* Renders the soft, modern SVG map we just built, filtering by the assigned AGV */}
          <LiveHospitalMap assignedAgvId={activeDelivery?.agvId} />
        </div>

      </div>
    </div>
  );
}