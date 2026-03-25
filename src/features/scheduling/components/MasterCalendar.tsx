import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockCalendarJobs } from "../data/mockData";

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8 → 17
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const typeColor: Record<string, string> = {
  Mobile: "bg-blue-100 text-blue-700 border-blue-300",
  RON: "bg-orange-100 text-orange-700 border-orange-300",
  "Loan Signing": "bg-green-100 text-green-700 border-green-300",
  Conflict: "bg-red-100 text-red-600 border-red-300",
};

export const MasterCalendar: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">

      {/* ================= SIDEBAR ================= */}
      <div className="w-full lg:w-64 bg-white border rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          FILTER PANEL
        </h3>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs text-gray-400 mb-1">Branch / Region</p>
            <select className="w-full border rounded-lg px-3 py-2 bg-gray-50">
              <option>All Regions</option>
            </select>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Notary</p>
            <select className="w-full border rounded-lg px-3 py-2 bg-gray-50">
              <option>All Notaries</option>
            </select>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Service Type</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Mobile</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">RON</span>
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Loan</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Status</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">New</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">Pending</span>
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Confirmed</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 bg-white border rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b gap-3">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 border rounded-lg flex items-center justify-center">
              <ChevronLeft size={16} />
            </button>

            <h2 className="font-semibold text-gray-800">
              Oct 16 – 22, 2023
            </h2>

            <button className="w-8 h-8 border rounded-lg flex items-center justify-center">
              <ChevronRight size={16} />
            </button>

            <button className="ml-2 px-3 py-1 border rounded-lg text-sm">
              Today
            </button>
          </div>

          <div className="text-xs text-gray-400">
            Drag to reschedule / reassign
          </div>
        </div>

        {/* CALENDAR */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">

            {/* DAYS HEADER */}
            <div className="grid grid-cols-8 border-b text-xs text-gray-400">
              <div></div>
              {DAYS.map((d, i) => (
                <div key={i} className="text-center py-2 border-l">
                  {d}
                </div>
              ))}
            </div>

            {/* BODY */}
            <div className="grid grid-cols-8">
              {/* HOURS */}
              <div className="flex flex-col">
                {HOURS.map((h) => (
                  <div key={h} className="h-20 text-[10px] text-gray-400 flex items-start justify-end pr-2">
                    {h}:00
                  </div>
                ))}
              </div>

              {/* DAYS GRID */}
              {DAYS.map((_, dayIndex) => (
                <div key={dayIndex} className="relative border-l">
                  {HOURS.map((hour) => (
                    <div key={hour} className="h-20 border-t"></div>
                  ))}

                  {/* JOBS */}
                  {mockCalendarJobs
                    .filter((j) => j.day === dayIndex)
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`absolute left-1 right-1 rounded-lg border px-2 py-1 text-xs shadow-sm ${
                          typeColor[job.type]
                        }`}
                        style={{
                          top: (job.startHour - 8) * 80,
                          height: job.duration * 80,
                        }}
                      >
                        <div className="font-semibold">{job.id}</div>
                        <div className="text-[10px]">{job.customer}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};