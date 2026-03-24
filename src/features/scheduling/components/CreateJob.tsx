import React, { useState } from "react";
import { Calendar, Clock, Building2, User } from "lucide-react";
import type { CreateJobForm, CustomerType, ServiceType } from "../types/scheduling.types";
import { US_STATES } from "../data/mockData";

interface CreateJobProps {
  onSubmit?: (data: CreateJobForm) => void;
  onCancel?: () => void;
}

const defaultForm: CreateJobForm = {
  customerType: "B2B",
  customerName: "",
  serviceType: "Mobile",
  state: "",
  date: "25/03/2026",
  timeStart: "09:00",
  timeEnd: "11:00",
  note: "",
};

export const CreateJob: React.FC<CreateJobProps> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState<CreateJobForm>(defaultForm);

  const handleCustomerType = (type: CustomerType) => {
    setForm((f) => ({ ...f, customerType: type }));
  };

  const handleServiceType = (type: ServiceType) => {
    setForm((f) => ({ ...f, serviceType: type }));
  };

  const handleCreate = () => {
    onSubmit?.(form);
    alert("Job created successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-screen p-3 sm:p-4">
      {/* Left main form */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto lg:pr-1">
        {/* 1. Customer Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">1</span>
            <h2 className="text-sm sm:text-base font-semibold text-gray-800">Customer information</h2>
          </div>

          <div className="mb-4">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Customer type</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleCustomerType("B2B")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  form.customerType === "B2B"
                    ? "bg-gray-800 border-gray-800 text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <Building2 className="w-4 h-4" />
                B2B
              </button>
              <button
                onClick={() => handleCustomerType("B2C")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  form.customerType === "B2C"
                    ? "bg-gray-800 border-gray-800 text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <User className="w-4 h-4" />
                B2C
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Name</p>
            <input
              type="text"
              placeholder="Type..."
              value={form.customerName}
              onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* 2. Service Type */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">2</span>
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Service type</h2>
            </div>
            <div className="flex flex-col gap-3">
              {(["Mobile", "RON", "Loan signing"] as ServiceType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleServiceType(type)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    form.serviceType === type
                      ? "border-blue-500 bg-blue-50/60"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      form.serviceType === type
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {form.serviceType === type && (
                      <span className="w-2 h-2 rounded-full bg-white block" />
                    )}
                  </span>
                  <span className={form.serviceType === type ? "text-blue-700 font-semibold" : "text-gray-600"}>
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Area */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">3</span>
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Area</h2>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">State</p>
              <div className="relative">
                <select
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                  className="w-full appearance-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer"
                >
                  <option value="">State...</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▾</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Time */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">4</span>
            <h2 className="text-sm sm:text-base font-semibold text-gray-800">Time</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Date</p>
              <div className="relative">
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Time</p>
              <div className="relative">
                <input
                  type="text"
                  value={`${form.timeStart} - ${form.timeEnd}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(" - ");
                    if (parts.length === 2) {
                      setForm((f) => ({ ...f, timeStart: parts[0], timeEnd: parts[1] }));
                    }
                  }}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all pr-10"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-full lg:w-72 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Status</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            NEW
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-[350px] overflow-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">5</span>
            <h2 className="text-base font-semibold text-gray-800">Note</h2>
          </div>
          <textarea
            placeholder="Type..."
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className="w-full h-48 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCreate}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-md shadow-blue-200 active:scale-95"
          >
            Create
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold transition-all active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};