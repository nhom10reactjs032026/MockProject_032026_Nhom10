import type { JobStatus } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  status: JobStatus;
}

export function StatusBadge({ status }: BadgeProps) {
  const styles: Record<JobStatus, string> = {
    'COMPLETED': 'bg-green-50 text-green-600 border-green-200',
    'IN-PROGRESS': 'bg-blue-50 text-blue-600 border-blue-200',
    'PENDING': 'bg-amber-50 text-amber-600 border-amber-200',
    'FAILED': 'bg-red-50 text-red-600 border-red-200',
    'CANCELLED': 'bg-gray-50 text-gray-500 border-gray-200',
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider inline-block",
      styles[status]
    )}>
      {status}
    </span>
  );
}

interface AvatarProps {
  initials: string;
  className?: string;
  colorIndex?: number;
}

export function Avatar({ initials, className, colorIndex = 0 }: AvatarProps) {
  const colors = [
    'bg-blue-100 text-blue-600',
    'bg-purple-100 text-purple-600',
    'bg-orange-100 text-orange-600',
    'bg-red-100 text-red-600',
    'bg-teal-100 text-teal-600',
  ];

  const colorStyle = colors[colorIndex % colors.length];

  return (
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
      colorStyle,
      className
    )}>
      {initials}
    </div>
  );
}
