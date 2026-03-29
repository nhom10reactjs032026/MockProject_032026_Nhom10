// features/scheduling/components/JobMobileCard.tsx
import React from "react";
import type { Job } from "../../types/scheduling.types";
import { StatusBadge } from "../createJob/StatusBadge";

interface JobMobileCardProps {
  job: Job;
  onView?: (job: Job) => void;
  onAssign?: (job: Job) => void;
}

export const JobMobileCard: React.FC<JobMobileCardProps> = ({ job, onView, onAssign }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-[#ebebeb] shadow-sm">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-[#c4a484] text-sm">#{job.id}</span>
        <StatusBadge status={job.status} size="sm" />
      </div>

      <div className="mt-2 text-sm font-medium text-gray-800">
        {job.customerName}
      </div>
      
      <div className="text-xs text-gray-400 mt-1">{job.state}</div>

      <div className="mt-2 text-xs text-gray-500">
        {job.date} • {job.timeStart} – {job.timeEnd}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Service: <span className="capitalize">{job.serviceType}</span>
      </div>

      <div className="mt-1 text-xs text-gray-500">
        Notary: {job.assignedNotary || "—"}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onView?.(job)}
          className="flex-1 border border-[#ebebeb] rounded-lg py-2 text-sm hover:bg-[#f8f8f8] transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onAssign?.(job)}
          className="flex-1 border border-[#ebebeb] rounded-lg py-2 text-sm hover:bg-[#f8f8f8] transition-colors"
        >
          Assign
        </button>
      </div>
    </div>
  );
};