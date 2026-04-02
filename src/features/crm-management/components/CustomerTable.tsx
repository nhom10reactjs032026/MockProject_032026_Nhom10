import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import type { Customer } from "../types";

interface CustomerTableProps {
  customers: Customer[];
}

export const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="overflow-x-auto p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                CUSTOMER NAME
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                PRIMARY CONTACT
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                JOBS
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                REVENUE
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={idx}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                  {customer.id}
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900 text-sm mb-1">
                      {customer.name}
                    </p>
                    {customer.tags && customer.tags.length > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
                          customer.tags[0] === "VIP"
                            ? "bg-green-600 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {customer.tags[0]}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {customer.type}
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {customer.primaryContact}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {customer.primaryEmail}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  {customer.jobs}
                </td>

                <td className="px-6 py-4 font-bold text-[#1a1a1a] text-sm">
                  ${customer.revenue.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-slate-900 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-8 py-5 flex justify-between items-center border-t border-slate-100 bg-white rounded-b-xl">
        <p className="text-sm font-medium text-slate-500">
          Showing 1-10 of 422 customers
        </p>
        <div className="flex gap-2">
          <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100 text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 bg-[#1a1a1a] text-white rounded font-bold text-sm">
            1
          </button>
          <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 font-medium text-sm">
            2
          </button>
          <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 font-medium text-sm">
            3
          </button>
          <span className="flex items-center justify-center px-1 text-slate-400 font-bold">
            ...
          </span>
          <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 font-medium text-sm">
            42
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100 text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
