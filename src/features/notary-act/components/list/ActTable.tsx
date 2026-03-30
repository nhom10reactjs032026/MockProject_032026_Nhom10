import { Link } from 'react-router-dom';
import { Eye, MoreHorizontal, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import type { Act } from '../../types/act.types';

interface ActTableProps {
  acts: Act[];
  isLoading: boolean;
}

export const ActTable = ({ acts, isLoading }: ActTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100 mt-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading acts...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">ACT ID</th>
              <th className="px-6 py-4">ACT TYPE</th>
              <th className="px-6 py-4">NOTARY & CLIENT</th>
              <th className="px-6 py-4">DATE/TIME</th>
              <th className="px-6 py-4">STATE</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4">RISK</th>
              <th className="px-6 py-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {acts.map((act) => (
              <tr key={act.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to={`/notary-acts/${act.id}`} className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                    {act.actId}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{act.type}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{act.reference}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{act.clientName}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{act.clientType}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{act.dateTime}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{act.time} {act.timezone}</p>
                </td>
                <td className="px-6 py-4 text-gray-500">{act.state}</td>
                <td className="px-6 py-4">
                  {act.status === 'Completed' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Completed
                    </span>
                  )}
                  {act.status === 'Inprocess' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                      Inprocess
                    </span>
                  )}
                  {act.status === 'Voided' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                      Voided
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {act.risk === 'Low' && <CheckCircle2 size={20} className="text-emerald-500" strokeWidth={2} />}
                  {act.risk === 'Medium' && <AlertCircle size={20} className="text-amber-500" strokeWidth={2} />}
                  {act.risk === 'High' && <AlertTriangle size={20} className="text-red-500" strokeWidth={2} />}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <Link to={`/notary-acts/${act.id}`} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye size={18} />
                    </Link>
                    <button className="text-gray-400 hover:text-gray-900 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {acts.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  No acts found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
