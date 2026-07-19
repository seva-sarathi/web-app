"use client";

import Link from "next/link";
import { FiCommand, FiSettings } from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminRouteHeader() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200/60 gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-xl text-gray-600">
            <FiSettings className="text-2xl" />
          </div>
          Admin Portal
        </h1>
        <p className="mt-2 text-gray-500 font-medium ml-1">
          Manage hospital logistics and staff access.
        </p>
      </div>

      {user?.role_name === "CONTROLLER" && (
        <Link
          href="/controller-dashboard"
          className="mt-2 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
        >
          <FiCommand className="text-xl" />
          Master Controller Tools
        </Link>
      )}
    </div>
  );
}