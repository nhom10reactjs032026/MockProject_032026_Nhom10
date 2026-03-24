import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockJobs } from "../data/mockData";
  
type Cell = {
  day: number | null;
  key: string;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export const MasterCalendar: React.FC = () => {
    const today = new Date();
    const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });

    const daysInMonth = getDaysInMonth(current.year, current.month);
    const firstDay = getFirstDayOfMonth(current.year, current.month);

    const prevMonth = () =>
        setCurrent((c) =>
        c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 }
        );
    const nextMonth = () =>
        setCurrent((c) =>
        c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 }
        );

    const getJobsForDay = (day: number) => {
        const dateStr = `${current.year}-${String(current.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return mockJobs.filter((j) => j.date === dateStr);
    };

    const emptyCells: Cell[] = Array.from({ length: firstDay }, (_, i) => ({
    day: null,
    key: `e-${i}`,
    }));

    const dayCells: Cell[] = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    key: `d-${i + 1}`,
    }));

    const cells: Cell[] = [...emptyCells, ...dayCells];

    const isToday = (day: number | null) =>
        day !== null &&
        day === today.getDate() &&
        current.month === today.getMonth() &&
        current.year === today.getFullYear();

    return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          {MONTHS[current.month]} {current.year}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 flex-1">
        {cells.map(({ day, key }) => {
          const jobs = day ? getJobsForDay(day) : [];
          return (
            <div
              key={key}
              className={`relative rounded-xl p-2 min-h-[80px] transition-all ${
                day ? "hover:bg-blue-50/50 cursor-pointer" : ""
              } ${isToday(day) ? "bg-blue-600 text-white" : "bg-gray-50/40"}`}
            >
              {day && (
                <>
                  <span
                    className={`text-sm font-semibold ${isToday(day) ? "text-white" : "text-gray-700"}`}
                  >
                    {day}
                  </span>
                  <div className="mt-1 flex flex-col gap-0.5">
                    {jobs.slice(0, 2).map((job) => (
                      <div
                        key={job.id}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md truncate ${
                          isToday(day)
                            ? "bg-white/20 text-white"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {job.timeStart} {job.customerName}
                      </div>
                    ))}
                    {jobs.length > 2 && (
                      <div className={`text-[10px] font-medium ${isToday(day) ? "text-white/80" : "text-gray-400"}`}>
                        +{jobs.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};