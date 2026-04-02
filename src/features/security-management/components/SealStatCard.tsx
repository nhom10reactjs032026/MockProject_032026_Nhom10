import React from 'react';

interface SealStatCardProps {
    title: string;
    count: number;
    color?: string;
    borderColor?: string;
}

/* Component to display statistical cards */
export const SealStatCard: React.FC<SealStatCardProps> = ({
    title,
    count,
    color = "text-slate-800",
    borderColor = "border-gray-100"
}) => {
    return (
        <div className={`p-6 bg-white rounded-[32px] shadow-sm border-t-4 ${borderColor} flex flex-col items-center justify-center min-h-[150px] transition-all hover:shadow-md hover:-translate-y-1 duration-300`}>
            {/* Statistical number - Large and clear at the top */}
            <h3 className={`text-4xl font-black ${color} mb-1`}>
                {count.toLocaleString()}
            </h3>

            {/* Title - Small and uppercase at the bottom */}
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wide text-center">
                {title}
            </p>
        </div>
    );
};

export default SealStatCard;