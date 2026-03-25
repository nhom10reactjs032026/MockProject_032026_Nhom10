import React from "react";
import { mockJobs } from "../data/mockData";

export const JobList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* ================= FILTER ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {["Client", "Service", "State", "Status", "Date"].map((label) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400 font-semibold uppercase">
                {label}
              </span>
              <select className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600 w-full">
                <option>All</option>
              </select>
            </div>
          ))}

          <div className="flex items-end">
            <button className="w-full lg:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 border rounded-2xl p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase">
            Unassigned Jobs
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">12</h2>
          <p className="text-xs text-gray-400 mt-1">
            4 requiring immediate action
          </p>
        </div>

        <div className="bg-gray-50 border rounded-2xl p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase">
            Pending Acceptance
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">08</h2>
          <p className="text-xs text-gray-400 mt-1">
            Awaiting notary confirmation
          </p>
        </div>

        <div className="bg-gray-50 border rounded-2xl p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase">
            Avg. Fulfillment
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">42m</h2>
          <p className="text-xs text-gray-400 mt-1">
            From request to assignment
          </p>
        </div>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="block md:hidden space-y-3">
        {mockJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl border shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-blue-600">
                #{job.id}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-600">
                {job.status}
              </span>
            </div>

            <div className="mt-2 text-sm font-medium text-gray-800">
              {job.customerName}
            </div>
            <div className="text-xs text-gray-400">{job.state}</div>

            <div className="mt-2 text-xs text-gray-500">
              {job.date} • {job.timeStart} – {job.timeEnd}
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Notary: {job.assignedNotary || "—"}
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 border rounded-lg py-2 text-sm">
                View
              </button>
              <button className="flex-1 border rounded-lg py-2 text-sm">
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE DESKTOP ================= */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b text-sm font-semibold text-gray-700">
          Recent Requests
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Job ID</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Notary</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {mockJobs.map((job, index) => (
                <tr
                  key={job.id}
                  className={`border-t hover:bg-gray-50 ${
                    index % 2 ? "bg-gray-50/30" : ""
                  }`}
                >
                  <td className="px-4 py-4 font-semibold text-blue-600">
                    #{job.id}
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-800">
                      {job.customerName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {job.state}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {job.serviceType}
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                      Onsite
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-gray-700 font-medium">
                      {job.date}
                    </div>
                    <div className="text-xs text-gray-400">
                      {job.timeStart} – {job.timeEnd}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-600">
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-500">
                    {job.assignedNotary || "—"}
                  </td>

                  <td className="px-4 py-4 flex gap-2">
                    <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">
                      View
                    </button>
                    <button className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50">
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t text-sm text-gray-500">
          <span>Showing 1–8 of 24 results</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md">2</button>
            <button className="px-3 py-1 border rounded-md">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};