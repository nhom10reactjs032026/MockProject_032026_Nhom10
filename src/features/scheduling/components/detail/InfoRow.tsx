import React from "react";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  badge?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, highlight, badge }) => {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      {badge ? (
        <span className="inline-block px-2.5 py-1 rounded-full bg-[#fdf6ef] text-[#c4a484] text-xs font-semibold border border-[#c4a484]/30">
          {value}
        </span>
      ) : (
        <p className={`text-sm ${highlight ? "font-bold text-gray-900" : "text-gray-700"}`}>
          {value}
        </p>
      )}
    </div>
  );
};