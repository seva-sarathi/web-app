"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiPlus, FiEdit, FiTrash2, FiRefreshCw, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import apiClient from "../../../lib/axiosClient";
import AddUserModal from "../../../components/ui/AddUserModel";
import AdminRouteHeader from "../../../components/layout/AdminRouteHeader";

// TypeScript Interfaces
interface User {
  id: string | number;
  username: string;
  email: string;
  role_name: string;
  is_active: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto font-sans text-gray-800 p-4 md:p-8 overflow-hidden">
      
      {/* 3D Background Ambient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchUsers} 
      />
      
      <AdminRouteHeader />

      {/* Modern Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <FiUsers className="text-2xl" />
            </div>
            System Users
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Manage hospital staff, administrators, and controller access.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchUsers}
            className="p-3 bg-white text-gray-600 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:text-blue-600 transition-all active:scale-95"
            title="Refresh List"
          >
            <FiRefreshCw className={`text-xl ${isLoading ? "animate-spin text-blue-500" : ""}`} />
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <FiPlus className="text-xl" /> Add User
          </button>
        </div>
      </div>

      {/* 3D Glassmorphism Data Table Wrapper */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden relative">
        
        {/* Subtle inner highlight for 3D depth */}
        <div className="absolute inset-0 border border-white rounded-3xl pointer-events-none"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            
            {/* Table Head */}
            <thead className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/80 text-gray-500">
              <tr>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-24 rounded-tl-3xl">ID</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider">Username</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider">Email</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-32">Role</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider w-32">Status</th>
                <th className="p-5 font-semibold text-xs uppercase tracking-wider text-center w-32 rounded-tr-3xl">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100/80 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium animate-pulse">Loading records...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <FiSearch className="text-3xl text-gray-300" />
                      </div>
                      <p className="font-medium mt-2">No users found.</p>
                      <p className="text-xs text-gray-400">Add a new user to populate this list.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="p-5 font-medium text-gray-500">#{String(user.id).padStart(4, '0')}</td>
                    <td className="p-5 font-semibold text-gray-900">{user.username}</td>
                    <td className="p-5 text-gray-600">{user.email}</td>
                    
                    {/* Modern Role Badge */}
                    <td className="p-5">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex w-fit ${
                        user.role_name === 'CONTROLLER' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        user.role_name === 'ADMIN' 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {user.role_name || 'USER'}
                      </span>
                    </td>
                    
                    {/* Modern Status Badge with Glowing Indicator */}
                    <td className="p-5">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center w-fit gap-2 border ${
                        user.is_active 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-red-500'}`}></div>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    
                    {/* Action Buttons */}
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white text-gray-500 border border-gray-200 rounded-lg shadow-sm hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all" title="Edit User">
                          <FiEdit />
                        </button>
                        <button className="p-2 bg-white text-gray-500 border border-gray-200 rounded-lg shadow-sm hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all" title="Deactivate User">
                          <FiTrash2 />
                        </button>
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