import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subItems?: Array<{ label: string; value: string | number; color: string }>;
  chart?: React.ReactNode;
}

export const KPICard = ({
  title,
  value,
  icon,
  subItems,
  chart,
}: KPICardProps) => {
  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-0">
          <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mt-1">
            {title}
          </p>
          {icon && (
            <div className="w-8 h-8 rounded bg-[#eff6ff] text-[#1e40af] flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>

        <div className="flex justify-between items-end gap-2 mt-2">
          <div className="flex-1">
            <div className="text-3xl font-bold text-slate-900 mb-5">
              {value}
            </div>
            {subItems && (
              <div className="space-y-2.5">
                {subItems.map((item, idx) => (
                  <div key={idx} className="flex items-center text-[11px]">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-slate-500 font-medium">
                      {item.label}{" "}
                      <span className="text-slate-900">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-shrink-0">{chart}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PieChart = ({
  percentage,
  color,
  secondaryColor = "#e2e8f0",
}: {
  percentage: number;
  color: string;
  secondaryColor?: string; // <-- Sửa lỗi ở ngay dòng này
}) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getCoords = (startPercent: number, endPercent: number) => {
    const midPercent = (startPercent + endPercent) / 2;
    const angleInDegrees = (midPercent / 100) * 360 - 90;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    return {
      x: 50 + radius * Math.cos(angleInRadians),
      y: 50 + radius * Math.sin(angleInRadians),
    };
  };

  const p1 = getCoords(0, percentage);
  const p2 = getCoords(percentage, 100);

  return (
    <svg width="100" height="100" className="overflow-visible">
      <g transform="rotate(-90 50 50)">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={secondaryColor}
          strokeWidth="26"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="26"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </g>
      <text
        x={p1.x}
        y={p1.y}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-bold fill-slate-900"
      >
        {percentage}%
      </text>
      <text
        x={p2.x}
        y={p2.y}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-bold fill-slate-900"
      >
        {100 - percentage}%
      </text>
    </svg>
  );
};
