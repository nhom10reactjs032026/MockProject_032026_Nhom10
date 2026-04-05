import React from 'react';

// Status badge Active/Secure
export const StatusBadge = ({ status }: { status: string }) => {
    const isActive = status.toLowerCase().includes('active');
    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {status}
        </span>
    );
};

// Progress bar for Validity/Rotation
export const ProgressBar = ({ progress, color = "bg-blue-600" }: { progress: number, color?: string }) => (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div className={`${color} h-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
    </div>
);