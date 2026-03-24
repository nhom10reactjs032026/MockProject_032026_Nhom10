import React, { useState } from "react";
import { MapPin, Clock, User, ChevronRight } from "lucide-react";
import { mockJobs } from "../data/mockData";

const notaries = ["John Smith", "Mary Johnson", "Bob Williams", "Sarah Davis", "Tom Lee"];

export const Dispatch: React.FC = () => {
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(mockJobs.map((j) => [j.id, j.assignedNotary || ""]))
  );

  const unassigned = mockJobs.filter((j) => !assignments[j.id]);
  const assigned = mockJobs.filter((j) => !!assignments[j.id]);

  return (
    <div className="flex gap-6 h-full">
      {/* Unassigned */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700">Unassigned Jobs</h3>
          <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
            {unassigned.length} pending
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-mono font-semibold text-blue-500">{job.id}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{job.customerName}</p>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                  {job.serviceType}
                </span>
              </div>
              <div className="flex gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  {job.state}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" />
                  {job.timeStart}–{job.timeEnd}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <select
                  value={assignments[job.id] || ""}
                  onChange={(e) =>
                    setAssignments((prev) => ({ ...prev, [job.id]: e.target.value }))
                  }
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Assign notary...</option>
                  {notaries.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                {assignments[job.id] && (
                  <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 active:scale-95">
                    Assign
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notary availability */}
      <div className="w-64 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-700">Notary Availability</h3>
        <div className="flex flex-col gap-3">
          {notaries.map((notary) => {
            const jobCount = Object.values(assignments).filter((v) => v === notary).length;
            return (
              <div
                key={notary}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {notary.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{notary}</p>
                    <p className="text-xs text-gray-400">{jobCount} job{jobCount !== 1 ? "s" : ""} assigned</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(jobCount * 33, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};