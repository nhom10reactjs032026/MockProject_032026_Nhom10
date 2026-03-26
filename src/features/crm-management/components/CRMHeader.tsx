import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, FileText } from "lucide-react";

interface CRMHeaderProps {
  currentTab?: "dashboard" | "customers";
}

export const CRMHeader: React.FC<CRMHeaderProps> = ({
  currentTab = "dashboard",
}) => {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-4 md:h-16 md:flex-row md:gap-0 md:px-6 md:py-0">
        <div className="flex w-full items-center justify-between md:w-1/4 md:justify-start md:gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1a1a1a]">
              <svg
                className="h-5 w-5 -rotate-45 transform text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div className="leading-tight">
              <h1 className="text-[15px] font-bold text-slate-900">
                Customer Relationship
              </h1>
              <h1 className="text-[15px] font-bold text-slate-900">
                Management
              </h1>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-1 items-center gap-8 overflow-x-auto md:justify-center">
          <Link
            to="/crm"
            className={`whitespace-nowrap border-b-2 pb-2 md:pb-4 md:mt-4 text-sm font-bold ${currentTab === "dashboard" ? "border-[#c4a47c] text-[#c4a47c]" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Dashboard
          </Link>
          <Link
            to="/crm/customers"
            className={`whitespace-nowrap border-b-2 pb-2 md:pb-4 md:mt-4 text-sm font-medium ${currentTab === "customers" ? "border-[#c4a47c] text-[#c4a47c]" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Customer List
          </Link>
        </div>

        <div className="flex w-full items-center justify-between md:w-1/3 md:justify-end md:gap-4">
          <div className="flex gap-2">
            <Button className="flex h-9 items-center gap-2 rounded-lg bg-[#c4a47c] px-3 font-semibold text-white hover:bg-[#b08d65] md:h-10 md:px-4 transition-colors">
              <User size={16} />
              <span className="hidden sm:inline">Add new customer</span>
            </Button>

            <Button
              variant="outline"
              className="flex h-9 items-center gap-2 rounded-lg border-[#c4a47c] px-3 font-semibold text-[#c4a47c] hover:bg-[#fbf9f6] md:h-10 md:px-4 transition-colors"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Create new job</span>
            </Button>
          </div>

          <div className="ml-2 flex items-center gap-2 border-l border-slate-200 pl-2 md:gap-3 md:pl-4">
            <button className="text-slate-400 hover:text-slate-700">
              <Bell size={20} strokeWidth={2} />
            </button>
            <button className="text-slate-400 hover:text-slate-700">
              <Settings size={20} strokeWidth={2} />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
