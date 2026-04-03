import React from "react";

/**
 * A purely stylistic SVG Line Chart displaying a hardcoded Revenue Trend.
 * In a real-world scenario, the SVG path `d` attribute would be dynamically generated via D3.js or similar.
 */
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
        {/* Render horizontal background grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
          <div className="w-full border-t border-slate-100"></div>
        </div>

        {/* Scalable Vector Graphic Chart */}
        <svg
          viewBox="0 0 1100 200"
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Gradient definition for the area under the curve */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4a47c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c4a47c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill path */}
          <path
            d="M 0 170 C 100 160, 150 140, 200 140 C 300 140, 320 110, 400 110 C 500 110, 530 60, 600 60 C 750 60, 800 35, 900 35 C 1000 35, 1050 5, 1100 0 L 1100 200 L 0 200 Z"
            fill="url(#revenueGradient)"
          />

          {/* Line stroke path */}
          <path
            d="M 0 170 C 100 160, 150 140, 200 140 C 300 140, 320 110, 400 110 C 500 110, 530 60, 600 60 C 750 60, 800 35, 900 35 C 1000 35, 1050 5, 1100 0"
            fill="none"
            stroke="#c4a47c"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Interactive Data Points (Dots) */}
          <circle
            cx="200"
            cy="140"
            r="5"
            fill="white"
            stroke="#c4a47c"
            strokeWidth="3"
          />
          <circle
            cx="400"
            cy="110"
            r="5"
            fill="white"
            stroke="#c4a47c"
            strokeWidth="3"
          />
          <circle
            cx="600"
            cy="60"
            r="5"
            fill="white"
            stroke="#c4a47c"
            strokeWidth="3"
          />
          <circle
            cx="900"
            cy="35"
            r="5"
            fill="white"
            stroke="#c4a47c"
            strokeWidth="3"
          />
          <circle cx="1100" cy="0" r="6" fill="#c4a47c" />
        </svg>
      </div>

      {/* X-Axis Labels */}
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
