"use client";

import { useMemo } from "react";
import { FiX, FiActivity, FiWifi } from "react-icons/fi";
import { MapData, FleetAGV } from "../../types/agv";

interface FullscreenMapProps {
  isOpen: boolean;
  onClose: () => void;
  fleet: FleetAGV[];
  mapData: MapData;
  isConnected: boolean;
  selectedAgvId: string | null;
  onSelectAgv: (id: string) => void;
}

export default function FullscreenLiveMap({
  isOpen,
  onClose,
  fleet,
  mapData,
  isConnected,
  selectedAgvId,
  onSelectAgv,
}: FullscreenMapProps) {
  const uniqueEdges = useMemo(() => {
    const edgesList: any[] = [];
    const drawn = new Set<string>();

    if (!mapData.edges || !mapData.nodes) return edgesList;

    Object.entries(mapData.edges).forEach(([sourceId, targets]) => {
      Object.keys(targets).forEach((targetId) => {
        const edgeHash = [sourceId, targetId].sort().join("-");
        if (!drawn.has(edgeHash)) {
          drawn.add(edgeHash);
          edgesList.push({
            id: edgeHash,
            source: mapData.nodes[sourceId],
            target: mapData.nodes[targetId],
          });
        }
      });
    });
    return edgesList;
  }, [mapData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "IDLE": return "#94a3b8"; // Slate 400
      case "MOVING_TO_PICKUP": return "#facc15"; // Yellow 400
      case "PICKING_UP": return "#60a5fa"; // Blue 400
      case "MOVING_TO_DROPOFF": return "#f87171"; // Red 400
      case "DROPPING_OFF": return "#4ade80"; // Green 400
      default: return "#cbd5e1";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-md p-4 md:p-8 font-sans">
      
      {/* Floating Glass Stats Panel */}
      <div className="absolute top-8 left-8 z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-white shadow-2xl flex flex-col gap-3 min-w-[250px]">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <span className="font-semibold text-sm tracking-wide">SYSTEM TELEMETRY</span>
          <FiActivity className="text-blue-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FiWifi className={isConnected ? "text-green-400" : "text-red-400"} />
          <span className="text-gray-300">Signal:</span>
          <span className="font-medium">{isConnected ? "OPTIMAL" : "DISCONNECTED"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Active Units:</span>
          <span className="font-medium">{fleet.filter(a => a.status !== 'IDLE').length} / {fleet.length}</span>
        </div>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-full text-white transition-all"
      >
        <FiX className="text-xl" />
      </button>

      {/* Interactive Map Canvas */}
      <div className="w-full h-full max-w-6xl max-h-[800px] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative">
        <svg 
          viewBox="-10 -10 120 120"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Corridors */}
          {uniqueEdges.map((edge) => (
            <line
              key={edge.id}
              x1={edge.source.x}
              y1={edge.source.y}
              x2={edge.target.x}
              y2={edge.target.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}

          {/* Nodes */}
          {Object.entries(mapData.nodes).map(([nodeId, coords]) => (
            <g key={nodeId}>
              <circle cx={coords.x} cy={coords.y} r="2" fill="rgba(255,255,255,0.3)" />
              <text
                x={coords.x}
                y={coords.y - 4}
                fontSize="2.5"
                fontWeight="500"
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                className="font-sans"
              >
                {nodeId.replace("_", " ")}
              </text>
            </g>
          ))}

          {/* AGVs with Blinking Lights */}
          {fleet.map((agv) => (
            <g 
              key={agv.id} 
              transform={`translate(${agv.position.x}, ${agv.position.y})`}
              className="transition-transform duration-100 ease-linear cursor-pointer"
              onClick={() => onSelectAgv(agv.id)}
            >
              {/* Outer Glowing Pulse */}
              <circle 
                cx="0" 
                cy="0" 
                r="4" 
                fill={getStatusColor(agv.status)} 
                opacity="0.2" 
                className="animate-pulse"
              />
              
              {/* Target Selection Ring */}
              {selectedAgvId === agv.id && (
                <circle cx="0" cy="0" r="5" fill="none" stroke="#ffffff" strokeWidth="0.5" className="animate-spin-slow" />
              )}
              
              {/* Core AGV Unit */}
              <circle
                cx="0"
                cy="0"
                r="2"
                fill={getStatusColor(agv.status)}
                stroke="#111827" // gray-900 to blend with background
                strokeWidth="0.5"
              />
              
              {/* ID Label */}
              <text x="0" y="5" fontSize="2" fontWeight="700" textAnchor="middle" fill="#ffffff">
                {agv.id.split("-")[1]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}