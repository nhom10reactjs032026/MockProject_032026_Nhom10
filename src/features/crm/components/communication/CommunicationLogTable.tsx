import type { LogType } from '../../types';
import { Filter, Plus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_LOGS } from '../../constants/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Log Type Badge ---
function LogTypeBadge({ type }: { type: LogType }) {
  const styles: Record<LogType, string> = {
    'Meeting': 'bg-blue-100 text-blue-600',
    'Email': 'bg-slate-100 text-slate-500',
    'Urgent': 'bg-red-500 text-white',
    'Call': 'bg-orange-500 text-white',
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[9px] font-bold inline-block whitespace-nowrap shadow-sm min-w-[60px] text-center",
      styles[type]
    )}>
      {type}
    </span>
  );
}

export function CommunicationLogView() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-end gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all bg-white">
          <Filter size={16} />
          Filters
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all shadow-md">
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest text-left bg-slate-50/50">
              <th className="px-6 py-4 border-b border-gray-100">#</th>
              <th className="px-6 py-4 border-b border-gray-100">Time</th>
              <th className="px-6 py-4 border-b border-gray-100 text-center">Type</th>
              <th className="px-6 py-4 border-b border-gray-100">Summary</th>
              <th className="px-6 py-4 border-b border-gray-100">By</th>
              <th className="px-6 py-4 border-b border-gray-100 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 text-sm font-medium text-slate-400">{log.id}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-700 whitespace-nowrap">{log.time}</td>
                <td className="px-6 py-5 text-center">
                  <LogTypeBadge type={log.type} />
                </td>
                <td className="px-6 py-5 text-sm font-medium text-slate-600 max-w-md leading-relaxed">
                  {log.summary}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-400">{log.by}</td>
                <td className="px-6 py-5 text-right">
                  <button className="p-1 text-slate-300 group-hover:text-slate-600 transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="px-6 py-5 bg-slate-50/30 flex items-center justify-between border-t border-gray-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            Showing 1-10 of 422 logs
          </p>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-300 hover:text-slate-500 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-900 text-white rounded font-bold text-xs shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all">3</button>
            <span className="text-slate-300 px-1 pt-2">...</span>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all">42</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-300 hover:text-slate-500 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
