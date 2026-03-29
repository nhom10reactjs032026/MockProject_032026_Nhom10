// features/scheduling/pages/CreateJob.tsx
import React, { useState } from "react";
import { Building2, User, MapPin, Calendar, Clock } from "lucide-react";
import type { CreateJobForm, CustomerType, ServiceType } from "../types/scheduling.types";
import { US_STATES } from "../data/mockData";
import { StatusBadge } from "../components/createJob/StatusBadge";

interface CreateJobProps {
  onSubmit?: (data: CreateJobForm) => void;
  onCancel?: () => void;
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

export const CreateJob: React.FC<CreateJobProps> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState<CreateJobForm>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customerName) newErrors.customerName = "Required";
    if (!form.state) newErrors.state = "Required";
    if (!form.date) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
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
              onClick={() => setForm({ ...form, customerType: "B2B" })}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold ${
                form.customerType === "B2B" ? "bg-[#fdf6ef] border-[#c4a484] text-[#c4a484]" : "border-[#ebebeb] text-gray-500"
              }`}
            >
              <Building2 className="w-4 h-4" /> B2B
            </button>
            <button
              onClick={() => setForm({ ...form, customerType: "B2C" })}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold ${
                form.customerType === "B2C" ? "bg-[#fdf6ef] border-[#c4a484] text-[#c4a484]" : "border-[#ebebeb] text-gray-500"
              }`}
            >
              <User className="w-4 h-4" /> B2C
            </button>
          </div>
          <input
            type="text"
            placeholder="Customer name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border bg-[#f8f8f8] text-sm ${errors.customerName ? "border-red-500" : "border-[#ebebeb]"}`}
          />
        </div>

        <div className="flex gap-6">
          {/* Service Type */}
          <div className="flex-1 bg-white rounded-xl border border-[#ebebeb] p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">2</span>
              <h2 className="font-semibold text-gray-800">Service type</h2>
            </div>
            {(["Mobile", "RON", "Loan signing"] as ServiceType[]).map((type) => (
              <button
                key={type}
                onClick={() => setForm({ ...form, serviceType: type })}
                className={`w-full text-left px-4 py-3 rounded-lg border mb-2 text-sm ${
                  form.serviceType === type ? "border-[#c4a484] bg-[#fdf6ef] text-[#c4a484]" : "border-[#ebebeb]"
                }`}
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
                className="w-full px-4 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm appearance-none"
              >
                <option value="">Select state...</option>
                {US_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4a484]" />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-xl border border-[#ebebeb] p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-[#c4a484] text-white text-sm font-bold flex items-center justify-center">4</span>
            <h2 className="font-semibold text-gray-800">Time</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4a484]" />
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="time"
                value={form.timeStart}
                onChange={(e) => setForm({ ...form, timeStart: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm"
              />
              <span className="self-center">-</span>
              <input
                type="time"
                value={form.timeEnd}
                onChange={(e) => setForm({ ...form, timeEnd: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm"
              />
              <Clock className="w-4 h-4 text-[#c4a484] self-center" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
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
            rows={5}
            className="w-full px-3 py-3 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button onClick={handleSubmit} className="flex-1 py-3 rounded-lg bg-[#c4a484] text-white font-semibold hover:bg-[#b89474]">
            Create
          </button>
          <button onClick={onCancel} className="flex-1 py-3 rounded-lg border border-[#ebebeb] text-gray-600 font-semibold hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};