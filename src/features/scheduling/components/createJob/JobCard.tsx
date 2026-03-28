import React from "react";
import { Clock, MapPin, User, Eye } from "lucide-react";
import type { Job } from "../../types/scheduling.types";
import { StatusBadge } from "./StatusBadge";

interface JobCardProps {
  job: Job;
  onView?: (job: Job) => void;
  showActions?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, showActions = true }) => {
  return (
    <div className="bg-white rounded-xl border border-[#ebebeb] hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-[#c4a484] uppercase tracking-wider">{job.id}</p>
          <h3 className="text-base font-bold text-gray-800 mt-1">{job.customerName}</h3>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4 text-gray-400" />
          <span className="capitalize">{job.serviceType}</span>
          <span className="text-gray-300">•</span>
          <span className="capitalize">{job.customerType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{job.state}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{job.date} • {job.timeStart} - {job.timeEnd}</span>
        </div>
      </div>

      {job.assignedNotary && (
        <div className="pt-3 border-t border-[#ebebeb] mb-3">
          <p className="text-xs text-gray-500">Assigned to</p>
          <p className="text-sm font-medium text-gray-700">{job.assignedNotary}</p>
        </div>
      )}

      {showActions && onView && (
        <button
          onClick={() => onView(job)}
          className="w-full mt-2 py-2 rounded-lg border border-[#ebebeb] hover:bg-[#f8f8f8] text-gray-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      )}
    </div>
  );
};