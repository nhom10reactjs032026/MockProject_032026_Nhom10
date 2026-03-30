import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_JOBS } from '../constants/mockData';
import { StatusBadge, Avatar } from './Common';

export function JobHistoryHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-slate-800">Job & Service History</h2>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <Filter size={16} />
          Filters
        </button>
        <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export function JobHistoryStats() {
  return (
    <div className="flex items-center justify-between mb-8 bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
      <div className="flex-1 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search service type or notary ID..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
      
      <div className="flex gap-12 text-right">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">On-time rate</p>
          <p className="text-2xl font-black text-blue-800">94%</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Canceled rate</p>
          <p className="text-2xl font-black text-orange-800">2%</p>
        </div>
      </div>
    </div>
  );
}

export function JobHistoryTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-widest text-left">
            <th className="px-4 py-3 font-bold">#</th>
            <th className="px-4 py-3 font-bold">Service Type</th>
            <th className="px-4 py-3 font-bold">Date</th>
            <th className="px-4 py-3 font-bold">Notary ID</th>
            <th className="px-4 py-3 font-bold">Assigned Notary</th>
            <th className="px-4 py-3 font-bold text-center">Status</th>
            <th className="px-4 py-3 text-right font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_JOBS.map((job, index) => (
            <tr key={job.id} className="bg-white hover:bg-slate-50 transition-all group cursor-pointer shadow-sm rounded-lg">
              <td className="px-4 py-5 text-slate-400 font-medium rounded-l-xl text-sm border-y border-l border-transparent group-hover:border-slate-100">{job.id}</td>
              <td className="px-4 py-5 border-y border-transparent group-hover:border-slate-100">
                <div>
                  <p className="font-bold text-slate-700 text-sm leading-tight">{job.serviceType.main}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{job.serviceType.sub}</p>
                </div>
              </td>
              <td className="px-4 py-5 text-sm text-slate-600 font-medium border-y border-transparent group-hover:border-slate-100">{job.date}</td>
              <td className="px-4 py-5 text-[11px] font-mono font-bold text-slate-400 tracking-wider border-y border-transparent group-hover:border-slate-100">{job.notaryId}</td>
              <td className="px-4 py-5 border-y border-transparent group-hover:border-slate-100">
                <div className="flex items-center gap-2">
                  <Avatar initials={job.assignedNotary.initials} colorIndex={index} />
                  <span className="text-sm font-bold text-slate-700">{job.assignedNotary.name}</span>
                </div>
              </td>
              <td className="px-4 py-5 text-center border-y border-transparent group-hover:border-slate-100">
                <StatusBadge status={job.status} />
              </td>
              <td className="px-4 py-5 text-right rounded-r-xl border-y border-r border-transparent group-hover:border-slate-100">
                <button className="text-blue-600 font-bold text-xs hover:underline decoration-2 underline-offset-4">Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function JobHistoryPagination() {
  return (
    <div className="flex items-center justify-between mt-8">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Showing 1-5 of 48 jobs</p>
      <div className="flex gap-2">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-400 hover:bg-slate-50 transition-all">
          <ChevronLeft size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-blue-900 text-white rounded font-bold text-xs shadow-md">1</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all">2</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all">3</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-slate-400 hover:bg-slate-50 transition-all">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
