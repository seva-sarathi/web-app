"use client";

import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";

export default function LiveHospitalMap({ assignedAgvId }) {
  const [fleet, setFleet] = useState([]);
  const [mapData, setMapData] = useState({ nodes: {}, edges: {} });
  const [isConnected, setIsConnected] = useState(false);

  // Fetch static map layout & connect to WebSocket
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/map")
      .then((res) => res.json())
      .then((data) => setMapData(data))
      .catch((err) => console.error("Failed to load map topology:", err));

    const socket = io("http://localhost:4000");

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    
    socket.on("fleet-update", (liveData) => {
      setFleet(liveData);
    });

    return () => socket.disconnect();
  }, []);

  // Process unique edges to avoid drawing lines twice
  const uniqueEdges = useMemo(() => {
    const edgesList = [];
    const drawn = new Set();

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

  // Only show the AGV that was assigned to this user (if any)
  const displayFleet = assignedAgvId 
    ? fleet.filter((agv) => agv.id === assignedAgvId) 
    : []; // Show nothing if no order is active

  return (
    <div className="relative w-full h-full min-h-[400px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col font-sans">
      
      {/* Soft Status Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs font-medium text-gray-600">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
        {isConnected ? "Live Tracking Active" : "Connecting..."}
      </div>

      {/* Modern, Clean SVG Canvas */}
      <svg 
        viewBox="-10 -10 120 120"
        className="w-full h-full flex-1"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Edges (Soft Gray Corridors) */}
        {uniqueEdges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.source.x}
            y1={edge.source.y}
            x2={edge.target.x}
            y2={edge.target.y}
            stroke="#e5e7eb" // Tailwind gray-200
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}

        {/* Nodes (Hospital Rooms/Locations) */}
        {Object.entries(mapData.nodes).map(([nodeId, coords]) => (
          <g key={nodeId}>
            <circle
              cx={coords.x}
              cy={coords.y}
              r="3.5"
              fill="#f9fafb" // Tailwind gray-50
              stroke="#d1d5db" // Tailwind gray-300
              strokeWidth="1.5"
            />
            <text
              x={coords.x}
              y={coords.y - 6}
              fontSize="3.5"
              fontWeight="500"
              textAnchor="middle"
              fill="#6b7280" // Tailwind gray-500
              className="font-sans tracking-wide"
            >
              {nodeId.replace("_", " ")}
            </text>
          </g>
        ))}

        {/* User's Assigned AGV */}
        {displayFleet.map((agv) => (
          <g 
            key={agv.id} 
            transform={`translate(${agv.position.x}, ${agv.position.y})`}
            className="transition-transform duration-100 ease-linear"
          >
            {/* Outer glowing halo */}
            <circle
              cx="0"
              cy="0"
              r="5"
              fill="#3b82f6" // Tailwind blue-500
              opacity="0.2"
              className="animate-pulse"
            />
            {/* Inner solid dot */}
            <circle
              cx="0"
              cy="0"
              r="2.5"
              fill="#2563eb" // Tailwind blue-600
              stroke="#ffffff"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
      
      {/* Fallback text if no delivery is active */}
      {!assignedAgvId && isConnected && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-400 font-medium text-sm bg-white/80 px-4 py-2 rounded-full">
            No active delivery requested.
          </p>
        </div>
      )}
    </div>
  );
}