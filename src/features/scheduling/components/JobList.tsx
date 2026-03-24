import React, { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import type { Job, JobStatus } from "../types/scheduling.types";
import { mockJobs } from "../data/mockData";

const statusColors: Record<JobStatus, string> = {
  NEW: "bg-green-50 text-green-700 border-green-200",
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  COMPLETED: "bg-gray-100 text-gray-600 border-gray-200",
  CANCELLED: "bg-red-50 text-red-600 border-red-200",
};

const statusDots: Record<JobStatus, string> = {
  NEW: "bg-green-500",
  PENDING: "bg-yellow-500",
  IN_PROGRESS: "bg-blue-500",
  COMPLETED: "bg-gray-400",
  CANCELLED: "bg-red-500",
};

export const JobList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<JobStatus | "ALL">("ALL");

  const filtered = mockJobs.filter((job) => {
    const matchSearch =
      job.customerName.toLowerCase().includes(search.toLowerCase()) ||
      job.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || job.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or job ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as JobStatus | "ALL")}
            className="appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="NEW">New</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Job ID</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">Customer</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">Type</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">Service</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">State</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">Date & Time</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">Notary</th>
                <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-300 text-sm">
                    No jobs found
                  </td>
                </tr>
              ) : (
                filtered.map((job, i) => (
                  <tr
                    key={job.id}
                    className={`border-b border-gray-50 hover:bg-blue-50/30 cursor-pointer transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-5 py-4 text-xs font-mono font-semibold text-blue-600">{job.id}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-800">{job.customerName}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {job.customerType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{job.serviceType}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{job.state}</td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-700 font-medium">{job.date}</div>
                      <div className="text-xs text-gray-400">{job.timeStart} – {job.timeEnd}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{job.assignedNotary || "—"}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusColors[job.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDots[job.status]}`} />
                        {job.status.replace("_", " ")}
                      </span>
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
};