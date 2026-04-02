import { Download, RotateCcw } from 'lucide-react';

export const AuditCompliancePage = () => {
    // Sample audit data - font sizes have been increased for better readability
    const auditLogs = [
        { id: 'A1230', timestamp: 'Oct 18, 2026 | 10:00', user: 'John Smith', action: 'Export PDF', detail: 'Generated evidence for State CA' },
        { id: 'A1231', timestamp: 'Oct 18, 2026 | 10:15', user: 'Mary Ellis', action: 'Upload Doc', detail: 'Compliance certificate updated' },
        { id: 'A1232', timestamp: 'Oct 18, 2026 | 11:30', user: 'Alice Wong', action: 'Export PDF', detail: 'System audit trail generated' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 font-['Plus_Jakarta_Sans']">

            {/* 1. FILTER SECTION: Enhanced spacing and larger labels */}
            <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-8 flex-1">
                    {/* Increased from 10px to 13px */}
                    <span className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Time range:</span>

                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            {/* Label increased to 12px */}
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[12px] font-black text-blue-600 uppercase z-10">From</span>
                            <input
                                type="date"
                                className="pl-16 pr-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-[15px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer w-56"
                                defaultValue="2026-01-01"
                            />
                        </div>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[12px] font-black text-blue-600 uppercase z-10">To</span>
                            <input
                                type="date"
                                className="pl-10 pr-5 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-[15px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer w-56"
                                defaultValue="2026-12-31"
                            />
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-7 py-3.5 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                        <RotateCcw size={18} strokeWidth={3} /> Clear Filters
                    </button>
                </div>

                <button className="flex items-center gap-3 px-10 py-4 bg-white border border-blue-100 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-50 transition-all italic">
                    <Download size={20} strokeWidth={3} /> Download PDF Audit Trail
                </button>
            </div>

            {/* 2. AUDIT LOGS TABLE: Increased to text-sm (14px) and text-base (16px) for keys */}
            <div className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50">
                            <th className="p-7">Audit ID</th>
                            <th className="p-7">Timestamp</th>
                            <th className="p-7">Performed By</th>
                            <th className="p-7">Action Taken</th>
                            <th className="p-7">Description / Detail</th>
                        </tr>
                    </thead>
                    {/* Table Body increased to 14px/15px */}
                    <tbody className="text-[14px] divide-y divide-slate-50">
                        {auditLogs.map((log, i) => (
                            <tr key={i} className="hover:bg-blue-50/20 transition-all group">
                                <td className="p-7 font-black text-slate-900 text-[15px]">{log.id}</td>
                                <td className="p-7 font-black text-blue-600 underline underline-offset-4 decoration-blue-100 group-hover:decoration-blue-400 cursor-pointer transition-all">
                                    {log.timestamp}
                                </td>
                                <td className="p-7 font-bold text-slate-800">{log.user}</td>
                                <td className="p-7">
                                    <span className="px-5 py-2 bg-slate-100 rounded-xl text-[12px] font-black uppercase text-slate-500 italic">
                                        {log.action}
                                    </span>
                                </td>
                                <td className="p-7 text-slate-500 italic font-semibold">{log.detail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION: Larger text and buttons */}
                <div className="p-7 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Total Records: 1,245
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-400 hover:text-blue-600 transition-all shadow-sm">Prev</button>
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-100">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};