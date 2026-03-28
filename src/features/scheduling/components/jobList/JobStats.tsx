import React from "react";

interface StatItem {
  label: string;
  value: string | number;
  subText?: string;
}

interface JobStatsProps {
  stats: StatItem[];
}

export const JobStats: React.FC<JobStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#f8f8f8] border border-[#ebebeb] rounded-xl p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            {stat.label}
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h2>
          {stat.subText && (
            <p className="text-xs text-gray-400 mt-1">{stat.subText}</p>
          )}
        </div>
      ))}
    </div>
  );
};