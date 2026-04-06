import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  changeBg: string;
  changeText: string;
}

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBg,
  changeBg,
  changeText,
}: StatCardProps) => {
  return (
    <Card className="shadow-sm border-[#ebebeb] rounded-none overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div
            className={`w-12 h-12 rounded-sm flex items-center justify-center ${iconBg}`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div
            className={`px-2 py-1 rounded-sm text-[16px] uppercase tracking-widest font-bold ${changeBg} ${changeText}`}
          >
            {change}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {title}
          </h3>
          <p className="text-4xl font-black text-foreground tracking-tight">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
