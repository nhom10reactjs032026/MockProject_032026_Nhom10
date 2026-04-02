import React, { useState } from "react";
import { Building2, User, MapPin, Calendar, Clock, Loader2 } from "lucide-react";
import type { CreateJobForm, CustomerType, ServiceType } from "../types/scheduling.types";
import { US_STATES } from "../data/mockData";
import { StatusBadge } from "../components/createJob/StatusBadge";
import { useUIStore } from "../store/useUIStore";

interface CreateJobProps {
  onSubmit?: (data: CreateJobForm) => void;
  onCancel?: () => void;
  isLoading?: boolean; 
}

const defaultForm: CreateJobForm = {
  customerType: "B2B",
  customerName: "",
  serviceType: "Mobile",
  state: "",
  date: new Date().toISOString().split('T')[0],
  timeStart: "09:00",
  timeEnd: "11:00",
  note: "",
};

export const CreateJob: React.FC<CreateJobProps> = ({ 
  onSubmit, 
  onCancel, 
  isLoading = false  
}) => {
  const [form, setForm] = useState<CreateJobForm>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.timeStart || !form.timeEnd) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate() && !isLoading) {
      onSubmit?.(form);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1 space-y-6">
        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">1</span>
            <h2 className="font-semibold text-gray-800">Customer information</h2>
          </div>
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setForm({ ...form, customerType: "B2B" })}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all ${
                form.customerType === "B2B" 
                  ? "bg-[#fdf6ef] border-[#c4a484] text-[#c4a484]" 
                  : "border-[#ebebeb] text-gray-500 hover:border-[#c4a484] hover:bg-[#fdf6ef]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Building2 className="w-4 h-4" /> B2B
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, customerType: "B2C" })}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all ${
                form.customerType === "B2C" 
                  ? "bg-[#fdf6ef] border-[#c4a484] text-[#c4a484]" 
                  : "border-[#ebebeb] text-gray-500 hover:border-[#c4a484] hover:bg-[#fdf6ef]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <User className="w-4 h-4" /> B2C
            </button>
          </div>
          <input
            type="text"
            placeholder="Customer name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg border bg-[#f8f8f8] text-sm transition-all ${
              errors.customerName ? "border-red-500 focus:ring-red-500" : "border-[#ebebeb] focus:border-[#c4a484]"
            } focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 ${isLoading ? "opacity-50" : ""}`}
          />
          {errors.customerName && (
            <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Service Type */}
          <div className="flex-1 bg-white rounded-xl border border-[#ebebeb] p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">2</span>
              <h2 className="font-semibold text-gray-800">Service type</h2>
            </div>
            {(["Mobile", "RON", "Loan signing"] as ServiceType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({ ...form, serviceType: type })}
                disabled={isLoading}
                className={`w-full text-left px-4 py-3 rounded-lg border mb-2 text-sm transition-all ${
                  form.serviceType === type 
                    ? "border-[#c4a484] bg-[#fdf6ef] text-[#c4a484]" 
                    : "border-[#ebebeb] hover:border-[#c4a484] hover:bg-[#fdf6ef]"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Area */}
          <div className="flex-1 bg-white rounded-xl border border-[#ebebeb] p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">3</span>
              <h2 className="font-semibold text-gray-800">Area</h2>
            </div>
            <div className="relative">
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border bg-[#f8f8f8] text-sm appearance-none transition-all ${
                  errors.state ? "border-red-500" : "border-[#ebebeb] focus:border-[#c4a484]"
                } focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 ${isLoading ? "opacity-50" : ""}`}
              >
                <option value="">Select state...</option>
                {US_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4a484] pointer-events-none" />
            </div>
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">4</span>
            <h2 className="font-semibold text-gray-800">Time</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border bg-[#f8f8f8] text-sm transition-all ${
                  errors.date ? "border-red-500" : "border-[#ebebeb] focus:border-[#c4a484]"
                } focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 ${isLoading ? "opacity-50" : ""}`}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4a484] pointer-events-none" />
            </div>
            <div className="flex-1 flex gap-2 items-center">
              <input
                type="time"
                value={form.timeStart}
                onChange={(e) => setForm({ ...form, timeStart: e.target.value })}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 focus:border-[#c4a484]"
              />
              <span className="text-gray-400">-</span>
              <input
                type="time"
                value={form.timeEnd}
                onChange={(e) => setForm({ ...form, timeEnd: e.target.value })}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 focus:border-[#c4a484]"
              />
              <Clock className="w-4 h-4 text-[#c4a484]" />
            </div>
          </div>
          {errors.time && (
            <p className="text-xs text-red-500 mt-2">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white rounded-xl border border-[#ebebeb] p-5">
          <p className="text-xs font-semibold text-gray-400 mb-3">Status</p>
          <StatusBadge status="NEW" />
        </div>

        <div className="bg-white rounded-xl border border-[#ebebeb] p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">5</span>
            <h2 className="font-semibold text-gray-800">Note</h2>
          </div>
          <textarea
            placeholder="Add notes..."
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            disabled={isLoading}
            rows={5}
            className="w-full px-3 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 focus:border-[#c4a484]"
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="flex-1 py-3 rounded-lg bg-[#c4a484] text-white font-semibold hover:bg-[#b89474] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </button>
          <button 
            onClick={onCancel} 
            disabled={isLoading}
            className="flex-1 py-3 rounded-lg border border-[#ebebeb] text-gray-600 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};