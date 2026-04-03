import { Search, Filter, Download, History, ArrowRight } from 'lucide-react';
import { MOCK_LOGS } from '../api/traceability.mock';

export default function TraceabilityPage() {
    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen font-sans text-slate-800">
            {/* 1. Header & Actions */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Traceability</h1>
                    <p className="text-gray-400 text-sm font-medium">Audit logs and system activity tracking</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-100 px-5 py-2.5 rounded-2xl shadow-sm font-bold text-sm hover:bg-gray-50 transition-all italic text-blue-600">
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* 2. Filter Bar */}
            <div className="bg-white p-4 rounded-[24px] shadow-sm border border-blue-50 mb-8 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[300px] relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by User, Action or Target ID..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                </div>
                <select className="bg-slate-50 px-4 py-3 rounded-xl text-sm font-black outline-none border-none text-slate-600">
                    <option>All Status</option>
                    <option>Success</option>
                    <option>Failed</option>
                    <option>Warning</option>
                </select>
                <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">
                    <Filter size={20} />
                </button>
            </div>

            {/* 3. Traceability Table */}
            <div className="bg-white rounded-[32px] border border-blue-50 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Timestamp</th>
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Action & Event</th>
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Performed By</th>
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Target</th>
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Status</th>
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {MOCK_LOGS.map((log) => (
                            <tr key={log.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="p-5">
                                    <p className="text-xs font-bold text-slate-500">{log.timestamp}</p>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                            <History size={16} />
                                        </div>
                                        <p className="font-black text-sm text-slate-800">{log.action}</p>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg">{log.user}</span>
                                </td>
                                <td className="p-5">
                                    <p className="text-xs font-mono font-bold text-blue-600">{log.target}</p>
                                </td>
                                <td className="p-5 text-center">
                                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight ${log.status === 'Success' ? 'bg-green-100 text-green-600' :
                                        log.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' :
                                            log.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="p-5 text-xs font-medium text-gray-400 italic">
                                    {log.ip}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Placeholder */}
                <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Showing 5 of 1,240 entries</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black disabled:opacity-50">Prev</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}