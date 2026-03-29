import React from "react";
import type { Job } from "../../types/scheduling.types";
import { StatusBadge } from "../createJob/StatusBadge";

interface JobTableProps {
  jobs: Job[];
  onViewJob?: (job: Job) => void;
  onAssignJob?: (job: Job) => void;
}

export const JobTable: React.FC<JobTableProps> = ({ jobs, onViewJob, onAssignJob }) => {
  return (
    <div className="hidden md:block bg-white border border-[#ebebeb] rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[#ebebeb] text-sm font-semibold text-gray-700">
        Recent Requests
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#f8f8f8] text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Job ID</th>
              <th className="px-4 py-3 text-left font-semibold">Client</th>
              <th className="px-4 py-3 text-left font-semibold">Service</th>
              <th className="px-4 py-3 text-left font-semibold">Location</th>
              <th className="px-4 py-3 text-left font-semibold">Time</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Notary</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id}
                className={`border-t border-[#ebebeb] hover:bg-[#f8f8f8] transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]/30"
                }`}
              >
                <td className="px-4 py-4 font-semibold text-[#c4a484]">
                  #{job.id}
                </td>

                <td className="px-4 py-4">
                  <div className="font-medium text-gray-800">{job.customerName}</div>
                  <div className="text-xs text-gray-400">{job.state}</div>
                </td>

                <td className="px-4 py-4 text-gray-600 capitalize">{job.serviceType}</td>

                <td className="px-4 py-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-[#fdf6ef] text-[#c4a484] border border-[#c4a484]/20">
                    {job.serviceType === "RON" ? "Remote" : "Onsite"}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="text-gray-700 font-medium">{job.date}</div>
                  <div className="text-xs text-gray-400">
                    {job.timeStart} – {job.timeEnd}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={job.status} size="sm" />
                </td>

                <td className="px-4 py-4 text-gray-500">
                  {job.assignedNotary || "—"}
                </td>

                <td className="px-4 py-4 flex gap-2">
                  <button
                    onClick={() => onViewJob?.(job)}
                    className="px-3 py-1.5 border border-[#ebebeb] rounded-lg text-sm hover:bg-[#f8f8f8] transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onAssignJob?.(job)}
                    className="px-3 py-1.5 border border-[#ebebeb] rounded-lg text-sm hover:bg-[#f8f8f8] transition-colors"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};