import { useState } from "react";

export const RegionalChartSummary = () => {
  const [hoveredData, setHoveredData] = useState<{
    label: string;
    value: string;
    color: string;
  } | null>(null);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    {
      id: "incomplete",
      label: "Incompleted",
      entries: 100,
      percentage: 40,
      color: "#fdf2e3",
      offset: 0,
    },
    {
      id: "active",
      label: "Active",
      entries: 80,
      percentage: 32,
      color: "#c4a484",
      offset: 40,
    },
    {
      id: "missing",
      label: "Missing",
      entries: 70,
      percentage: 28,
      color: "#ebebeb",
      offset: 72,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Bar Chart Placeholder */}
      <div className="col-span-1 lg:col-span-2 bg-white border border-[#ebebeb] shadow-sm rounded-xl p-6 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Entries by State
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              Distribution of notary acts across major states
            </p>
          </div>
          <button className="text-[10px] font-bold text-[#c4a484] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
            View Details
          </button>
        </div>

        <div className="flex-1 flex items-end justify-between px-4 pb-2 pt-12 gap-2 relative border-b border-[#ebebeb]">
          {/* Mock bars */}
          <div className="w-1/6 flex flex-col items-center gap-4 relative group">
            <div className="w-16 h-40 bg-[#fdf2e3] group-hover:bg-[#c4a484] transition-colors rounded-md"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              TX
            </span>
          </div>
          <div className="w-1/6 flex flex-col items-center gap-4 relative group">
            <div className="w-16 h-20 bg-[#fdf2e3] group-hover:bg-[#c4a484] transition-colors rounded-md"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              CA
            </span>
          </div>
          <div className="w-1/6 flex flex-col items-center gap-4 relative group">
            <div className="w-16 h-28 bg-[#fdf2e3] group-hover:bg-[#c4a484] transition-colors rounded-md"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              FL
            </span>
          </div>
          <div className="w-1/6 flex flex-col items-center gap-4 relative group">
            <div className="w-16 h-16 bg-[#fdf2e3] group-hover:bg-[#c4a484] transition-colors rounded-md"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              NY
            </span>
          </div>
          <div className="w-1/6 flex flex-col items-center gap-4 relative group">
            <div className="w-16 h-24 bg-[#fdf2e3] group-hover:bg-[#c4a484] transition-colors rounded-md"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              IL
            </span>
          </div>
          <div className="w-1/6 flex flex-col items-center gap-4 relative group">
            <div className="w-16 h-10 bg-[#fdf2e3] group-hover:bg-[#c4a484] transition-colors rounded-md"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              GA
            </span>
          </div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="col-span-1 bg-white border border-[#ebebeb] shadow-sm rounded-xl p-6 flex flex-col text-center">
        <div className="flex justify-between items-start text-left mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Chart</h3>
            <p className="text-sm font-semibold text-foreground">Entries</p>
            <p className="text-xs text-muted-foreground mt-1">
              From 1-6 Dec,
              <br />
              2020
            </p>
          </div>
          <button className="px-3 py-1 text-[10px] font-bold text-[#c4a484] uppercase tracking-[0.2em] border border-[#ebebeb] rounded-md hover:bg-[#f8f8f8] transition-colors">
            View Report
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center py-8 relative">
          <div className="relative w-48 h-48 flex items-center justify-center group">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {segments.map((seg) => {
                const strokeLength = (seg.percentage / 100) * circumference;
                const strokeOffset = -(seg.offset / 100) * circumference;
                const isHovered = hoveredData?.label === seg.label;

                return (
                  <circle
                    key={seg.id}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth={isHovered ? "22" : "20"}
                    strokeDasharray={`${strokeLength} ${circumference}`}
                    strokeDashoffset={strokeOffset}
                    className="transition-all duration-300 cursor-pointer origin-center"
                    onMouseEnter={() =>
                      setHoveredData({
                        label: seg.label,
                        value: `${seg.entries} Entries`,
                        color: seg.color,
                      })
                    }
                    onMouseLeave={() => setHoveredData(null)}
                  />
                );
              })}
            </svg>

            {/* Tooltip Overlay */}
            <div
              className={`absolute top-1/2 left-1/2 sm:left-3/4 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-0 bg-black text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-2xl shrink-0 whitespace-nowrap z-10 border border-[#ebebeb]/50 transition-all duration-300 pointer-events-none ${
                hoveredData ? "opacity-100 sm:translate-x-2" : "opacity-0"
              }`}
            >
              {hoveredData && (
                <>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">
                    {hoveredData.label}
                  </div>
                  <div className="text-sm sm:text-lg font-black">
                    {hoveredData.value}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 text-left">
          {segments.map((seg) => (
            <div key={seg.id} className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: seg.color }}
                ></span>{" "}
                {seg.label}
              </div>
              <div className="text-xs font-black pl-3.5 text-foreground">
                {seg.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
