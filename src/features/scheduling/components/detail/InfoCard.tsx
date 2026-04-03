import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-[#ebebeb] bg-[#faf9f8]">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#c4a484]">{icon}</span>}
          <h3 className="font-bold text-gray-800 text-base">{title}</h3>
        </div>
      </div>
      <div className="p-5 space-y-4">
        {children}
      </div>
    </div>
  );
};