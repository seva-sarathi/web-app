import { useState } from "react";
import { FiX, FiBox, FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import apiClient from "../../lib/axiosClient";

export default function NewRequestModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    pickup_location: "",
    dropoff_location: "",
    priority: "NORMAL",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Adjust this endpoint to match your backend AGV request route
      await apiClient.post("/requests", formData);
      toast.success("Delivery request dispatched successfully!");
      
      setFormData({ pickup_location: "", dropoff_location: "", priority: "NORMAL" });
      onSuccess(); 
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to dispatch request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans text-black">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-yellow-300">
          <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-2">
            <FiBox className="text-3xl" />
            Dispatch AGV
          </h2>
          <button onClick={onClose} className="p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
            <FiX className="text-xl font-bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Pickup Location (Source)</label>
            <div className="relative">
              <FiMapPin className="absolute top-4 left-4 text-gray-500 text-lg" />
              <input 
                type="text" 
                value={formData.pickup_location}
                onChange={(e) => setFormData({...formData, pickup_location: e.target.value})}
                className="w-full pl-12 p-3 border-2 border-black focus:outline-none font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1 transition-all"
                placeholder="e.g., Pharmacy"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2">Drop-off Location (Destination)</label>
            <div className="relative">
              <FiMapPin className="absolute top-4 left-4 text-black text-lg" />
              <input 
                type="text" 
                value={formData.dropoff_location}
                onChange={(e) => setFormData({...formData, dropoff_location: e.target.value})}
                className="w-full pl-12 p-3 border-2 border-black focus:outline-none font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1 focus:translate-x-1 transition-all"
                placeholder="e.g., ICU Bed 4"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2">Priority</label>
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full p-3 border-2 border-black focus:outline-none font-bold uppercase tracking-wider bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all appearance-none"
            >
              <option value="NORMAL">Normal Routine</option>
              <option value="URGENT">Urgent / Emergency</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4 mt-2 border-t-2 border-black">
            <button type="submit" disabled={isLoading} className="w-full p-4 bg-black text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all disabled:opacity-70">
              {isLoading ? "Routing..." : "Confirm Dispatch"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}