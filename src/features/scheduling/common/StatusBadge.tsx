import React from 'react';
import type { JobStatus } from  '../types/scheduling.types';

interface StatusBadgeProps {
  status: JobStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
  NEW: { label: 'New', color: 'text-blue-700', bg: 'bg-blue-100 border-blue-200' },
  PENDING: { label: 'Pending', color: 'text-yellow-700', bg: 'bg-yellow-100 border-yellow-200' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-purple-700', bg: 'bg-purple-100 border-purple-200' },
  COMPLETED: { label: 'Completed', color: 'text-green-700', bg: 'bg-green-100 border-green-200' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-100 border-red-200' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs';
  
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClasses} ${config.bg} ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'NEW' ? 'bg-blue-500' : 'bg-current'}`} />
      {config.label}
    </span>
  );
};