// features/scheduling/pages/MasterCalendar.tsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Eye } from "lucide-react";
import { CalendarLegend } from "../components/calendar/CalendarLegend";
import { mockCalendarJobs } from "../data/mockData";

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8 → 17
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const DAY_NUMBERS = [16, 17, 18, 19, 20, 21, 22];

const typeConfig = {
  Mobile: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  RON: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Loan signing": { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  International: { color: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

export const MasterCalendar: React.FC = () => {
  const [view, setView] = useState<"day" | "week" | "month">("week");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <p className="text-sm text-gray-400 mt-1">March 16-22, 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-[#ebebeb] rounded-lg overflow-hidden">
            {["Day", "Week", "Month"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v.toLowerCase() as typeof view)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  view === v.toLowerCase()
                    ? "bg-[#c4a484] text-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#c4a484] text-white rounded-lg text-sm font-semibold hover:bg-[#b89474] transition-colors">
            <Plus className="w-4 h-4" />
            Add Job
          </button>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-[#ebebeb] gap-3">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Today
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="text-sm text-gray-400">Drag to reschedule / reassign</div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-[#ebebeb]">
          {DAYS.map((day, idx) => (
            <div key={day} className="py-4 text-center border-r border-[#ebebeb] last:border-r-0">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{day}</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{DAY_NUMBERS[idx]}</p>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex">
          {/* Time Column */}
          <div className="w-20 flex-shrink-0 border-r border-[#ebebeb] bg-white">
            {HOURS.map((hour) => (
              <div key={hour} className="h-24 border-b border-[#ebebeb] flex items-start justify-end pr-3 pt-2">
                <span className="text-xs font-medium text-gray-400">
                  {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
                </span>
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 overflow-x-auto">
            <div className="grid grid-cols-7 min-w-[700px]">
              {DAYS.map((_, dayIdx) => (
                <div key={dayIdx} className="relative border-r border-[#ebebeb] last:border-r-0">
                  {HOURS.map((hour) => (
                    <div key={hour} className="h-24 border-b border-[#ebebeb] hover:bg-gray-50 transition-colors" />
                  ))}

                  {/* Events */}
                  {mockCalendarJobs
                    .filter((job) => job.day === dayIdx)
                    .map((job) => {
                      const config = typeConfig[job.type as keyof typeof typeConfig] || typeConfig.Mobile;
                      return (
                        <div
                          key={job.id}
                          className={`absolute left-1 right-1 rounded-lg p-2 cursor-pointer hover:shadow-md transition-all ${config.bg} border ${config.border}`}
                          style={{
                            top: (job.startHour - 8) * 96,
                            height: job.duration * 96 - 4,
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-bold text-gray-800">{job.id}</p>
                              <p className="text-xs text-gray-600 mt-0.5">{job.customer}</p>
                              {job.duration === 0.5 && (
                                <p className="text-[10px] text-gray-400 mt-0.5">30 min</p>
                              )}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${config.color}`} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Legend + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-[#faf9f8] border-t border-[#ebebeb]">
          {/* Legend - Component tái sử dụng */}
          <CalendarLegend />

          {/* Weekly Forecast */}
          <div className="bg-white rounded-xl p-4 border border-[#ebebeb]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Weekly Forecast
              </h3>
              <button className="text-xs text-[#c4a484] hover:text-[#b89474] font-medium flex items-center gap-1">
                View Details
                <Eye className="w-3 h-3" />
              </button>
            </div>
            <p className="text-2xl font-bold text-gray-800">42 Jobs Scheduled</p>
            <p className="text-xs text-gray-400 mt-1">
              You are currently at 85% capacity for the week of March 9th.
            </p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-[#c4a484] rounded-full" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-[#ebebeb] text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                RON SESSIONS
              </p>
              <p className="text-2xl font-bold text-[#c4a484] mt-2">18</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#ebebeb] text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                MOBILE TRIPS
              </p>
              <p className="text-2xl font-bold text-[#c4a484] mt-2">24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};