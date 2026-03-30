import React from "react";

interface LegendItem {
  icon: string;
  label: string;
  color?: string;
}

interface CalendarLegendProps {
  items?: LegendItem[];
  title?: string;
}

const DEFAULT_ITEMS: LegendItem[] = [
  { icon: "●", label: "Remote Online Notary (RON)", color: "text-amber-700" },
  { icon: "●", label: "Mobile / In-Person", color: "text-emerald-700" },
  { icon: "○", label: "International Meeting", color: "text-purple-700" },
];

export const CalendarLegend: React.FC<CalendarLegendProps> = ({ 
  items = DEFAULT_ITEMS, 
  title = "LEGEND" 
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`text-sm ${item.color || "text-gray-600"}`}>
              {item.icon}
            </span>
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};