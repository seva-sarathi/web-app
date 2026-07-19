"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { 
  FiTerminal, 
  FiActivity, 
  FiBatteryCharging, 
  FiAlertOctagon, 
  FiRotateCcw,
  FiMap,
  FiCpu
} from "react-icons/fi";
import { toast } from "react-toastify";
import FullscreenLiveMap from "../../../../components/ui/FullScreenLiveMap";
import { MapData, FleetAGV } from "../../../../types/agv";
import FleetStatusTable from "@/components/ui/FleetStatusTable";


export default function AdvancedTelemetryDashboard() {
  const [fleet, setFleet] = useState<FleetAGV[]>([]);
  const [mapData, setMapData] = useState<MapData>({ nodes: {}, edges: {} });
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedAgvId, setSelectedAgvId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/map")
      .then((res) => res.json())
      .then((data: MapData) => setMapData(data))
      .catch((err) => console.error("Failed to load map topology:", err));

    const socket: Socket = io("http://localhost:4000");

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    
    socket.on("fleet-update", (liveData: FleetAGV[]) => {
      setFleet(liveData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEmergencyStop = (agvId: string) => {
    toast.error(`Emergency Stop triggered for ${agvId}.`);
  };

  const handleReroute = (agvId: string) => {
    toast.info(`Recalculating path for ${agvId}.`);
  };

  const handleReturnToBase = (agvId: string) => {
    toast.success(`${agvId} returning to charging station.`);
  };

  const selectedAgv = fleet.find(a => a.id === selectedAgvId);

  return (
    <div className="max-w-7xl mx-auto font-sans text-gray-800 p-4 md:p-8">
      
      {/* Map Modal Overlay */}
      <FullscreenLiveMap 
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        fleet={fleet}
        mapData={mapData}
        isConnected={isConnected}
        selectedAgvId={selectedAgvId}
        onSelectAgv={setSelectedAgvId}
      />

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 flex items-center gap-3">
            <FiTerminal className="text-blue-600" />
            System Telemetry
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time fleet monitoring and override controls.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm font-medium">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
            {isConnected ? "Engine Connected" : "Connecting..."}
          </div>
          
          <button 
            onClick={() => setIsMapOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            <FiMap /> Launch Spatial Map
          </button>
        </div>
      </div>

      {/* Main Dashboard Area (Without the map taking up space) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Stats Column */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Active Fleet Size</h3>
            <p className="text-4xl font-bold text-gray-900">{fleet.length} <span className="text-lg text-gray-400 font-normal">Units</span></p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Units In Transit</h3>
            <p className="text-4xl font-bold text-blue-600">{fleet.filter(a => a.status !== 'IDLE').length}</p>
          </div>
          
          <div className="sm:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-200 flex flex-col items-center justify-center text-center mt-4">
            <FiMap className="text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Visual Mapping Minimized</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              The spatial map is currently hidden to conserve dashboard space. Launch the map to view live coordinates and select specific AGVs.
            </p>
            <button 
              onClick={() => setIsMapOpen(true)}
              className="mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Open Fullscreen Map &rarr;
            </button>
          </div>
          
        </div>
        

        {/* Command Panel */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="bg-gray-50 border-b border-gray-200 p-5 flex items-center justify-between">
              <span className="font-semibold text-gray-800">Target Focus</span>
              {selectedAgvId ? (
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md font-bold">{selectedAgvId}</span>
              ) : (
                <span className="text-xs text-gray-400">NONE SELECTED</span>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              {!selectedAgv ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <FiCpu className="text-5xl opacity-50" />
                  <p className="text-sm text-center">Open the map and select an AGV to initialize controls.</p>
                </div>
              ) : (
                <div className="space-y-6 flex-1 flex flex-col">
                  
                  {/* Status & Battery */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-1">Status</div>
                      <div className="font-semibold text-sm text-gray-900 truncate">
                        {selectedAgv.status.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-1">Battery</div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        <FiBatteryCharging className={selectedAgv.battery < 20 ? "text-red-500" : "text-green-500"} />
                        {selectedAgv.battery.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Active Job Details */}
                  {selectedAgv.job && (
                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <div className="text-xs font-medium text-blue-800 mb-3">Active Dispatch</div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">From:</span>
                          <span className="font-medium">{selectedAgv.job.pickup}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">To:</span>
                          <span className="font-medium">{selectedAgv.job.dropoff}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-6 space-y-3">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Manual Overrides</div>
                    
                    <button 
                      onClick={() => handleReroute(selectedAgv.id)}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
                    >
                      <FiActivity /> Recalculate Route
                    </button>
                    
                    <button 
                      onClick={() => handleReturnToBase(selectedAgv.id)}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
                    >
                      <FiRotateCcw /> Recall to Charger
                    </button>

                    <button 
                      onClick={() => handleEmergencyStop(selectedAgv.id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 rounded-xl transition-colors mt-2 border border-red-200"
                    >
                      <FiAlertOctagon /> Halt Motors
                    </button>
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
      <div className="flex-1 min-h-400px mt-5.5">
             {/* We pass setSelectedAgvId so clicking a row loads that AGV into the control panel */}
            <FleetStatusTable fleet={fleet} onRowClick={setSelectedAgvId} />
          </div>
    </div>
  );
}