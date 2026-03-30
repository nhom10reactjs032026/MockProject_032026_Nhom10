import { Download, Calendar, Search } from 'lucide-react';

export const AuditCompliancePage = () => {
    return (
        <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white p-6 rounded-[28px] border border-blue-50 shadow-sm flex flex-wrap items-end gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400">From Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" size={16} />
                        <input type="date" className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none" defaultValue="2025-11-25" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400">To Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" size={16} />
                        <input type="date" className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none" defaultValue="2025-12-25" />
                    </div>
                </div>
                <button className="px-6 py-2.5 bg-blue-100 text-blue-600 rounded-xl font-black text-xs uppercase hover:bg-blue-200 transition-all">Clear All</button>
                <button className="flex-1 min-w-[200px] flex items-center gap-2 px-6 py-2.5 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-xs uppercase shadow-sm italic hover:bg-blue-50 transition-all">
                    <Download size={16} /> Download as PDF Audit Trail
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[32px] border border-blue-50 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                        <tr className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                            <th className="p-5">Audit ID</th>
                            <th className="p-5">Timestamp</th>
                            <th className="p-5">User</th>
                            <th className="p-5">Actions</th>
                            <th className="p-5">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="text-[11px] divide-y divide-slate-50">
                        {['John Smith', 'Mary Ellis', 'Alice Wong'].map((name, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="p-5 font-bold">A123{i}</td>
                                <td className="p-5 font-black text-blue-600 underline">Oct 18, 2025 | 10:00</td>
                                <td className="p-5 font-bold">{name}</td>
                                <td className="p-5 font-medium text-slate-500 italic">Export PDF</td>
                                <td className="p-5 text-gray-400">Generated evidence for State CA</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};