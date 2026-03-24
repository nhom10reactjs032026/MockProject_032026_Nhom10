import React from "react";
import { AlertTriangle, Clock, MoreVertical } from "lucide-react";

const OVERDUE_INVOICES = [
  { client: "Oracle Corp", amount: "$12,400", status: "12 Days Late" },
  { client: "Morgan Stanley", amount: "$8,900", status: "4 Days Late" },
  { client: "FedEx Express", amount: "$3,250", status: "18 Days Late" },
];

const CONTRACTS_EXPIRING = [
  { contract: "SaaS Renewal - Adobe", expiration: "Oct 24, 2023" },
  { contract: "Cloud Infra - AWS", expiration: "Nov 02, 2023" },
  { contract: "Security - Crowdstrike", expiration: "Nov 15, 2023" },
];

export const IssueCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 md:p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            <h3 className="font-bold text-slate-900">Overdue Invoices</h3>
          </div>
          <span className="rounded bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white whitespace-nowrap">
            Critical
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[300px]">
            <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-4 md:px-6">Client</th>
                <th className="px-4 py-4 md:px-6">Amount</th>
                <th className="px-4 py-4 md:px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {OVERDUE_INVOICES.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4 font-bold text-slate-900 md:px-6">
                    {item.client}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-900 md:px-6">
                    {item.amount}
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <span className="whitespace-nowrap rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 md:p-5">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-[#d97706]" />
            <h3 className="font-bold text-slate-900">
              Contracts nearing expiration
            </h3>
          </div>
          <span className="whitespace-nowrap rounded bg-[#f59e0b] px-2 py-1 text-[10px] font-bold uppercase text-white">
            Upcoming
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[350px]">
            <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-4 md:px-6">Contract</th>
                <th className="px-4 py-4 md:px-6">Expiration</th>
                <th className="px-4 py-4 text-center md:px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CONTRACTS_EXPIRING.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4 font-bold text-slate-900 md:px-6">
                    {item.contract}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-500 md:px-6">
                    {item.expiration}
                  </td>
                  <td className="px-4 py-4 text-center md:px-6">
                    <button className="text-slate-400 hover:text-slate-800 transition-colors mx-auto block">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
