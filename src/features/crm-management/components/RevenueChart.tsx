import React from "react";

export const RevenueChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col shadow-sm">
      <div className="mb-8">
        <h3 className="font-bold text-slate-900 text-base">Revenue Trend</h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Monthly growth and fiscal trajectory
        </p>
      </div>

      <div className="flex-1 relative w-full min-h-[250px]">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
        </div>

        <svg
          viewBox="0 0 1100 200"
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M 0 170 C 100 160, 150 140, 200 140 C 300 140, 320 110, 400 110 C 500 110, 530 60, 600 60 C 750 60, 800 35, 900 35 C 1000 35, 1050 5, 1100 0 L 1100 200 L 0 200 Z"
            fill="url(#revenueGradient)"
          />

          <path
            d="M 0 170 C 100 160, 150 140, 200 140 C 300 140, 320 110, 400 110 C 500 110, 530 60, 600 60 C 750 60, 800 35, 900 35 C 1000 35, 1050 5, 1100 0"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <circle
            cx="200"
            cy="140"
            r="5"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <circle
            cx="400"
            cy="110"
            r="5"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <circle
            cx="600"
            cy="60"
            r="5"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <circle
            cx="900"
            cy="35"
            r="5"
            fill="white"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <circle cx="1100" cy="0" r="6" fill="#3b82f6" />
        </svg>
      </div>

      <div className="flex justify-between items-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  );
};
