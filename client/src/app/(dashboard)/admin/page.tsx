"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiPlus, FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import apiClient from "../../../lib/axiosClient";
import AddUserModal from "../../../components/ui/AddUserModel";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Assuming your backend GET /api/v1/users returns { data: [...] }
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
    <div className="max-w-7xl mx-auto font-sans text-black">
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchUsers} 
      />
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
            <FiUsers className="text-4xl" />
            System Users
          </h1>
          <p className="mt-2 text-gray-600 font-semibold border-l-4 border-black pl-3">
            Manage hospital staff and controller access.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={fetchUsers}
            className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
            title="Refresh List"
          >
            <FiRefreshCw className={`text-xl ${isLoading ? "animate-spin" : ""}`} />
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            <FiPlus className="text-xl" /> Add User
          </button>
        </div>
      </div>

      {/* Brutalist Data Table Wrapper */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            
            {/* Table Head */}
            <thead className="bg-gray-100 border-b-4 border-black">
              <tr>
                <th className="p-4 font-bold uppercase tracking-widest text-sm border-r-2 border-black w-24">ID</th>
                <th className="p-4 font-bold uppercase tracking-widest text-sm border-r-2 border-black">Username</th>
                <th className="p-4 font-bold uppercase tracking-widest text-sm border-r-2 border-black">Email</th>
                <th className="p-4 font-bold uppercase tracking-widest text-sm border-r-2 border-black w-32">Role</th>
                <th className="p-4 font-bold uppercase tracking-widest text-sm border-r-2 border-black w-32">Status</th>
                <th className="p-4 font-bold uppercase tracking-widest text-sm text-center w-32">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center font-bold uppercase tracking-widest text-gray-500 animate-pulse">
                    Loading Records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center font-bold uppercase tracking-widest text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`border-b-2 border-black last:border-b-0 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-yellow-100`}
                  >
                    <td className="p-4 font-bold border-r-2 border-black">{user.id}</td>
                    <td className="p-4 font-semibold border-r-2 border-black">{user.username}</td>
                    <td className="p-4 font-semibold border-r-2 border-black">{user.email}</td>
                    
                    {/* Role Badge */}
                    <td className="p-4 border-r-2 border-black">
                      <span className={`px-2 py-1 text-xs font-bold uppercase border-2 border-black ${
                        user.role_name === 'CONTROLLER' ? 'bg-purple-300' :
                        user.role_name === 'ADMIN' ? 'bg-blue-300' : 'bg-gray-200'
                      }`}>
                        {user.role_name || 'USER'}
                      </span>
                    </td>
                    
                    {/* Status Badge */}
                    <td className="p-4 border-r-2 border-black">
                      <span className={`px-2 py-1 text-xs font-bold uppercase border-2 border-black flex items-center w-fit gap-2 ${
                        user.is_active ? 'bg-green-300' : 'bg-red-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full border border-black ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    
                    {/* Action Buttons */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors" title="Edit User">
                          <FiEdit />
                        </button>
                        <button className="p-2 bg-white border-2 border-black hover:bg-red-500 hover:text-white transition-colors" title="Deactivate User">
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