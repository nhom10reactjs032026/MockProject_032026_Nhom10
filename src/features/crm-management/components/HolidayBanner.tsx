import React from "react";
import { Calendar, Info } from "lucide-react";
import type { HolidayAnnouncement } from "../types";

export const HolidayBanner: React.FC<{ data?: HolidayAnnouncement }> = ({
  data,
}) => {
  if (!data) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-[#c4a47c]/30 bg-[#fbf9f6] p-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c4a47c] text-white">
          <Calendar size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">{data.title}</h3>
            <span className="rounded bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              {data.status}
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-[#c4a47c]">
            {data.dateRange}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            {data.content}
          </p>
        </div>
        <Info size={16} className="text-slate-300" />
      </div>
    </div>
  );
};
