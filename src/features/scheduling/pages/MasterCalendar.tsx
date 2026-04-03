import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Eye } from "lucide-react";
import { CalendarLegend } from "../components/calendar/CalendarLegend";
import { useCalendarEvents } from "../hooks/useCalendar";
import { useUIStore } from "../store/useUIStore";
import { useJobStore } from "../store/useJobStore";
import { LoadingSpinner } from "../common/LoadingSpinner";
import type { CalendarEvent } from "../types/scheduling.types";

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8 → 17
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const typeConfig: Record<string, { color: string; bg: string; text: string; border: string }> = {
  Mobile: { color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  RON: { color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Loan signing": { color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  International: { color: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

// Helper để lấy ngày trong tuần
const getWeekRange = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  
  const startMonth = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  return `${startMonth} - ${endMonth}`;
};

// Helper để lấy số ngày trong tuần
const getWeekDayNumbers = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.getDate();
  });
};

export const MasterCalendar: React.FC = () => {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const { showToast } = useUIStore();
  const { jobs } = useJobStore();
  
  const { data: calendarEvents = [], isLoading, error, refetch } = useCalendarEvents({
    startDate: currentDate,
    endDate: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
  });

  const weekRange = useMemo(() => getWeekRange(currentDate), [currentDate]);
  const weekDayNumbers = useMemo(() => getWeekDayNumbers(currentDate), [currentDate]);
  
  const stats = useMemo(() => {
    const ronCount = jobs.filter(j => j.serviceType === "RON").length;
    const mobileCount = jobs.filter(j => j.serviceType === "Mobile").length;
    return { ronCount, mobileCount };
  }, [jobs]);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddJob = () => {
    showToast("Add job feature coming soon", "info");
  };

  const handleViewDetails = () => {
    showToast("View details coming soon", "info");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">Failed to load calendar events</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#c4a484] text-white rounded-lg hover:bg-[#b89474]"
        >
          Retry
        </button>
      </div>
    );
  }

  const displayEvents: CalendarEvent[] = calendarEvents.length > 0 ? calendarEvents : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <p className="text-sm text-gray-400 mt-1">{weekRange}</p>
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

          <button
            onClick={handleAddJob}
            className="flex items-center gap-2 px-4 py-2 bg-[#c4a484] text-white rounded-lg text-sm font-semibold hover:bg-[#b89474] transition-colors"
          >
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
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="text-sm text-gray-400">Drag to reschedule / reassign</div>
        </div>

        {/* ✅ FIX: Sử dụng grid với cột cố định để căn chỉnh */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Week Days Header */}
            <div className="grid grid-cols-8 border-b border-[#ebebeb]">
              {/* Empty cell cho góc trái */}
              <div className="w-20 py-3" />
              {/* Các ngày trong tuần */}
              {DAYS.map((day, idx) => (
                <div key={day} className="flex-1 py-3 text-center border-l border-[#ebebeb] first:border-l-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{day}</p>
                  <p className="text-xl font-bold text-gray-700 mt-1">{weekDayNumbers[idx]}</p>
                </div>
              ))}
            </div>

            {/* Calendar Body */}
            <div>
              {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-[#ebebeb] min-h-[96px]">
                  {/* Time column */}
                  <div className="w-20 py-2 pr-3 text-right text-xs font-medium text-gray-400 self-start">
                    {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
                  </div>
                  
                  {/* Days columns */}
                  {DAYS.map((_, dayIdx) => (
                    <div 
                      key={dayIdx} 
                      className="flex-1 border-l border-[#ebebeb] relative hover:bg-gray-50 transition-colors"
                      style={{ minHeight: "96px" }}
                    >
                      {/* Events for this hour */}
                      {displayEvents
                        .filter((event) => event.day === dayIdx && event.startHour === hour)
                        .map((event) => {
                          const config = typeConfig[event.type] || typeConfig.Mobile;
                          const height = event.duration * 96;
                          return (
                            <div
                              key={event.id}
                              className={`absolute left-1 right-1 rounded-lg p-2 cursor-pointer hover:shadow-md transition-all z-10 ${config.bg} border ${config.border}`}
                              style={{
                                top: 0,
                                height: height,
                              }}
                              onClick={() => showToast(`Viewing ${event.id}`, "info")}
                            >
                              <p className="text-xs font-bold text-gray-800">{event.id}</p>
                              <p className="text-xs text-gray-600 mt-0.5 truncate">{event.customer}</p>
                              {event.duration > 1 && (
                                <p className="text-[10px] text-gray-400 mt-0.5">{event.duration} hour(s)</p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Legend + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-[#faf9f8] border-t border-[#ebebeb]">
          <CalendarLegend />

          <div className="bg-white rounded-xl p-4 border border-[#ebebeb]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Weekly Forecast
              </h3>
              <button
                onClick={handleViewDetails}
                className="text-xs text-[#c4a484] hover:text-[#b89474] font-medium flex items-center gap-1"
              >
                View Details
                <Eye className="w-3 h-3" />
              </button>
            </div>
            <p className="text-2xl font-bold text-gray-800">{jobs.length} Jobs Scheduled</p>
            <p className="text-xs text-gray-400 mt-1">
              You are currently at {Math.min(100, Math.floor((jobs.length / 50) * 100))}% capacity for this week.
            </p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c4a484] rounded-full"
                style={{ width: `${Math.min(100, Math.floor((jobs.length / 50) * 100))}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-[#ebebeb] text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                RON SESSIONS
              </p>
              <p className="text-2xl font-bold text-[#c4a484] mt-2">{stats.ronCount}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#ebebeb] text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                MOBILE TRIPS
              </p>
              <p className="text-2xl font-bold text-[#c4a484] mt-2">{stats.mobileCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};