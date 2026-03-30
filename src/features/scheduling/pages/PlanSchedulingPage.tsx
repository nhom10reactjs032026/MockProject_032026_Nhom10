// src/features/scheduling/pages/PlanSchedulingPage.tsx
import React, { useState } from "react";
import {
  Briefcase,
  FileText,
  Settings,
  Calendar,
  PlusCircle,
  List,
  Clock,
  Send,
} from "lucide-react";

import { Sidebar } from "../../../components/layout/Sidebar";
import type { SidebarNavItem } from "../../../components/layout/Sidebar";
import { TopBar } from "../../../components/layout/TopBar";

import { CreateJob } from "./CreateJob";
import { JobList } from "./JobList";
import { MasterCalendar } from "./MasterCalendar";
import { Dispatch } from "./Dispatch";
import { JobDetail } from "./JobDetail";

const SCHEDULING_SIDEBAR_ITEMS: SidebarNavItem[] = [
  { icon: Briefcase, label: "Job Request", path: "/planning" },
  { icon: PlusCircle, label: "Create Job", path: "/scheduling/create" },
  { icon: List, label: "Job List", path: "/scheduling/list" },
  { icon: Calendar, label: "Calendar", path: "/scheduling/calendar" },
  { icon: Send, label: "Dispatch", path: "/scheduling/dispatch" },
  { icon: Clock, label: "Timeline", path: "/scheduling/timeline" },
  { icon: FileText, label: "Reports", path: "/scheduling/reports" },
  { icon: Settings, label: "Settings", path: "/scheduling/settings" },
];

type Tab = "create" | "list" | "calendar" | "dispatch" | "detail" | "timeline";

export const PlanSchedulingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("create");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return <CreateJob onCancel={() => setActiveTab("list")} />;
      case "list":
        return <JobList />;
      case "calendar":
        return <MasterCalendar />;
      case "dispatch":
        return <Dispatch />;
      case "detail":
        return <JobDetail />;
      case "timeline":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">Timeline view coming soon</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar
        navItems={SCHEDULING_SIDEBAR_ITEMS}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ✅ FIX: TopBar full width, không bị lệch */}
        <TopBar 
          onToggleSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Tabs Navigation (fix overflow mobile) */}
        <div className="flex overflow-x-auto gap-1 px-4 md:px-6 pt-4 bg-white border-b border-[#ebebeb] flex-shrink-0">
          {[
            { key: "create", label: "Create Job" },
            { key: "list", label: "Job List" },
            { key: "calendar", label: "Calendar" },
            { key: "dispatch", label: "Dispatch" },
            { key: "detail", label: "Detail" },
            { key: "timeline", label: "Timeline" },
          ].map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as Tab)}
                className={`whitespace-nowrap relative px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-t-xl ${
                  isActive
                    ? "text-[#c4a484] bg-[#fdf6ef]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c4a484] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};