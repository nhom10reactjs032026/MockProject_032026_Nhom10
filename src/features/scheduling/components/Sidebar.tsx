import React from "react";
import {
  Briefcase,
  LayoutGrid,
  FileText,
  Settings,
  Shield,
  AlertTriangle,
  Users,
} from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  key: string;
}

const items: SidebarItem[] = [
  { icon: <Briefcase className="w-5 h-5" />, label: "Job request", key: "job-request" },
  { icon: <LayoutGrid className="w-5 h-5" />, label: "Registry", key: "registry" },
  { icon: <FileText className="w-5 h-5" />, label: "Detail", key: "detail" },
  { icon: <Settings className="w-5 h-5" />, label: "Technical", key: "technical" },
  { icon: <AlertTriangle className="w-5 h-5" />, label: "Traceability", key: "traceability" },
  { icon: <Shield className="w-5 h-5" />, label: "Security", key: "security" },
  { icon: <AlertTriangle className="w-5 h-5" />, label: "Risk Handling", key: "risk" },
  { icon: <Users className="w-5 h-5" />, label: "Oversight", key: "oversight" },
];

interface SidebarProps {
  active?: string;
  onSelect?: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ active = "job-request", onSelect }) => {
  return (
    <aside className="w-16 sm:w-20 lg:w-52 bg-blue-600 min-h-screen flex flex-col rounded-r-3xl shadow-xl shadow-blue-300/30 transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 sm:py-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <span className="text-white font-black text-lg sm:text-xl lg:text-2xl tracking-tight">
            N10
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 sm:px-3 flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => onSelect?.(item.key)}
              className={`flex items-center justify-center lg:justify-start gap-0 lg:gap-3 px-2 lg:px-4 py-2.5 lg:py-3 rounded-2xl text-xs lg:text-sm font-semibold text-left transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue-700 shadow-md shadow-blue-800/20"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className={isActive ? "text-blue-600" : "text-white/70"}>
                {item.icon}
              </span>

              {/* Ẩn label trên mobile */}
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};