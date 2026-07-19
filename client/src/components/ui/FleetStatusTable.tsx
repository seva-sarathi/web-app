"use client";

import { FiBatteryCharging, FiActivity, FiBox, FiMapPin } from "react-icons/fi";
import { FleetAGV } from "../../types/agv";

interface FleetStatusTableProps {
  fleet: FleetAGV[];
  onRowClick?: (agvId: string) => void;
}

export default function FleetStatusTable({ fleet, onRowClick }: FleetStatusTableProps) {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "IDLE": 
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">Idle</span>;
      case "MOVING_TO_PICKUP": 
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">To Pickup</span>;
      case "PICKING_UP": 
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Loading</span>;
      case "MOVING_TO_DROPOFF": 
        return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">In Transit</span>;
      case "DROPPING_OFF": 
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Unloading</span>;
      default: 
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-green-500";
    if (level > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <FiActivity className="text-blue-500" />
          Live Fleet Overview
        </h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
          {fleet.length} Units Connected
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
              <th className="p-4 font-medium">Unit ID</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Power Level</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Active Task</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {fleet.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                  Waiting for telemetry data...
                </td>
              </tr>
            ) : (
              fleet.map((agv) => (
                <tr 
                  key={agv.id} 
                  onClick={() => onRowClick && onRowClick(agv.id)}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  {/* ID */}
                  <td className="p-4">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {agv.id}
                    </span>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="p-4">
                    {getStatusBadge(agv.status)}
                  </td>
                  
                  {/* Battery Progress Bar */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FiBatteryCharging className={agv.battery < 20 ? "text-red-500" : "text-gray-400"} />
                      <div className="flex-1 max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getBatteryColor(agv.battery)} transition-all duration-500`}
                          style={{ width: `${Math.max(0, Math.min(100, agv.battery))}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8">
                        {agv.battery.toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  
                  {/* Location Node */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <FiMapPin className="text-gray-400" />
                      {agv.currentNode ? agv.currentNode.replace("_", " ") : "In Transit"}
                    </div>
                  </td>

                  {/* Active Job Details */}
                  <td className="p-4">
                    {agv.job ? (
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-gray-900 flex items-center gap-1">
                          <FiBox className="text-blue-500" /> {agv.job.item}
                        </span>
                        <span className="text-gray-500 mt-0.5">
                          {agv.job.pickup} &rarr; {agv.job.dropoff}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Awaiting Dispatch</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}