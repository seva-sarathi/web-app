"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FiX, FiUserPlus, FiUser, FiMail, FiPhone, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import apiClient from "../../lib/axiosClient";

// TypeScript Interfaces
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  role: string;
}

export default function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    phone: "",
    role: "USER", // Default role
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calls the invite route
      await apiClient.post("/auth/register", formData);
      toast.success(`User ${formData.username} invited successfully! Email sent.`);
      
      // Reset form and close modal
      setFormData({ username: "", email: "", phone: "", role: "USER" });
      onSuccess(); // Triggers a list refresh on the parent page
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm font-sans">
      
      {/* Modern Modal Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-full blur-3xl pointer-events-none -z-10 opacity-60"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <FiUserPlus className="text-xl" />
            </div>
            Invite User
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 bg-gray-50 rounded-full border border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 relative z-10">
          
          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                placeholder="e.g. Dr. Smith"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                placeholder="smith@sevasarathi.com"
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Assign Role</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiShield className="text-gray-400" />
              </div>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all appearance-none text-gray-800 font-medium"
              >
                <option value="USER">Staff / User</option>
                <option value="CONTROLLER">Controller</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 p-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 p-3 bg-blue-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}