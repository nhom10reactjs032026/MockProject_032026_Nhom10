import React from "react";
import { MapPin, Clock, Users, FileText } from "lucide-react";
import type { DispatchJob } from "../../types/scheduling.types";

interface JobInfoCardProps {
  job: DispatchJob;
  onNoteChange?: (note: string) => void;
}

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
    {children}
  </p>
);

export const JobInfoCard: React.FC<JobInfoCardProps> = ({ job, onNoteChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm p-5 w-full lg:w-80">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Job Summary</h2>

      {/* JOB ID */}
      <div className="mb-4">
        <FieldLabel>JOB ID</FieldLabel>
        <span className="text-sm font-bold text-[#c4a484]">#{job.id}</span>
      </div>

      {/* SERVICE & CLIENT */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel>SERVICE</FieldLabel>
          <span className="text-sm font-medium text-gray-700">{job.service}</span>
        </div>
        <div>
          <FieldLabel>CLIENT</FieldLabel>
          <span className="text-sm font-bold text-gray-800">{job.client}</span>
        </div>
      </div>

      {/* LOCATION */}
      <div className="mb-4">
        <FieldLabel>LOCATION</FieldLabel>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-[#c4a484]" />
          <span>{job.location}</span>
        </div>
      </div>

      {/* TIME & SIGNERS */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel>TIME</FieldLabel>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-sm text-gray-700">{job.time}</span>
          </div>
        </div>
        <div>
          <FieldLabel>SIGNERS</FieldLabel>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-sm text-gray-700">{job.signers}</span>
          </div>
        </div>
      </div>

      {/* TYPE */}
      <div className="mb-4">
        <FieldLabel>TYPE</FieldLabel>
        <span className="inline-block px-3 py-1 rounded-full bg-[#fdf6ef] text-[#c4a484] text-xs font-semibold border border-[#c4a484]/30">
          {job.type}
        </span>
      </div>

      {/* NOTE */}
      <div>
        <FieldLabel>A NOTE</FieldLabel>
        <div className="relative">
          <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            placeholder="Enter job instructions or special notes for the notary..."
            defaultValue={job.note ?? ""}
            onChange={(e) => onNoteChange?.(e.target.value)}
            rows={3}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ebebeb] bg-[#f8f8f8] text-sm text-gray-600 placeholder-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50 focus:border-[#c4a484]"
          />
        </div>
      </div>
    </div>
  );
};