import { useState } from "react";
import { FiX, FiUserPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import apiClient from "../../lib/axiosClient";

export default function AddUserModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "USER", // Default role
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calls the invite route we built earlier
      await apiClient.post("/auth/register", formData);
      toast.success(`User ${formData.username} invited successfully! Email sent.`);
      
      // Reset form and close modal
      setFormData({ username: "", email: "", phone: "", role: "USER" });
      onSuccess(); // Triggers a list refresh on the parent page
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      
      {/* Modal Container */}
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-gray-50">
          <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-2">
            <FiUserPlus className="text-3xl" />
            Invite User
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white border-2 border-black hover:bg-red-500 hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]"
          >
            <FiX className="text-xl font-bold" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Username</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-0 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1 transition-all"
              placeholder="e.g. Dr. Smith"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-0 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1 transition-all"
              placeholder="smith@sevasarathi.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2">Phone Number</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-0 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1 transition-all"
              placeholder="+91 9876543210"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2">Assign Role</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black focus:outline-none font-bold uppercase tracking-wider bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1 cursor-pointer transition-all appearance-none"
            >
              <option value="USER">Staff / User</option>
              <option value="CONTROLLER">Controller</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4 mt-2 border-t-2 border-black">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 p-3 bg-white text-black font-bold uppercase border-2 border-black hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 p-3 bg-black text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Invite"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}