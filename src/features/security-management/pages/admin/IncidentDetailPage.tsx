import { StatusBadge } from '../../components/DetailComponents';

export const IncidentDetailPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
            <div className="bg-white p-10 rounded-[40px] border border-blue-50 shadow-sm">
                {/* 1. MAIN HEADER - Increased to 2xl (24px) */}
                <h3 className="text-2xl font-black mb-10 text-slate-800 tracking-tight">
                    Incident Report Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Column 1: Basic Information */}
                    <div className="space-y-6">
                        <h4 className="text-base font-black text-blue-600 uppercase tracking-[0.15em]">
                            Basic Information
                        </h4>
                        <div className="space-y-5">
                            {[
                                { label: 'Incident ID', value: 'INC_001234' },
                                { label: 'Title', value: 'Lost Physical Seal' },
                                { label: 'Reported by', value: 'Alice Smith (Notary)' },
                                { label: 'Reported Time', value: '11/25/2025 10:30' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between border-b border-slate-50 pb-3">
                                    {/* Labels increased to 13px */}
                                    <span className="text-[13px] text-gray-400 font-bold uppercase tracking-wide">{item.label}</span>
                                    {/* Values increased to 16px */}
                                    <span className="text-base font-black text-slate-700">{item.value}</span>
                                </div>
                            ))}
                            <div className="pt-4">
                                <span className="text-[13px] text-gray-400 font-bold uppercase block mb-2">Description</span>
                                {/* Description text increased to 15px */}
                                <p className="text-[15px] text-slate-600 italic leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
                                    "I lost my physical seal and suspect it may have been stolen during my travel..."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Affected Asset */}
                    <div className="space-y-6">
                        <h4 className="text-base font-black text-blue-600 uppercase tracking-[0.15em]">
                            Affected Asset
                        </h4>
                        <div className="bg-slate-50 p-8 rounded-[32px] space-y-5 border border-slate-100">
                            {[
                                { label: 'Seal ID', value: 'S_123' },
                                { label: 'Type', value: 'Physical Seal' },
                                { label: 'Status', value: 'ACTIVE' },
                                { label: 'Issue Date', value: '01/01/2022' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center">
                                    <span className="text-[12px] text-gray-400 font-black uppercase tracking-wider">{item.label}</span>
                                    <span className="text-base font-black text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table: Affected Notarial Acts - Increased font sizes throughout */}
                <div className="mt-14">
                    <h4 className="text-base font-black mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Affected Notarial Acts
                    </h4>
                    <div className="border border-slate-100 rounded-[24px] overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-[12px] font-black uppercase text-slate-400 tracking-widest">
                                    <th className="p-5">Act ID</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5">Notary Name</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px]">
                                {[1, 2, 3].map(i => (
                                    <tr key={i} className="border-t border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="p-5 font-black text-blue-600 underline underline-offset-4 decoration-blue-200 cursor-pointer">
                                            ACT-100{i}
                                        </td>
                                        <td className="p-5 font-bold text-slate-600">Dec 15, 2025</td>
                                        <td className="p-5 font-black text-slate-700 uppercase text-[13px]">Alice Smith</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Buttons - Larger text and more padding */}
                <div className="flex justify-end gap-5 mt-12 pt-8 border-t border-slate-50">
                    <button className="px-10 py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-xl shadow-rose-100 hover:bg-rose-600 transition-all">
                        Revoke
                    </button>
                    <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};