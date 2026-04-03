import { StatusBadge } from '../components/DetailComponents';

export const IncidentDetailPage = () => {
    return (
        <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
            <div className="mx-auto min-h-screen max-w-[1400px] bg-transparent px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Incident Detail</h1>
                    <p className="mt-1 text-sm text-slate-500">Investigation and replacement actions</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[32px] border border-blue-50 shadow-sm">
                        <h3 className="text-xl font-black mb-8">Incident Report Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Cột 1: Basic Information */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest">Basic Information</h4>
                        <div className="space-y-3">
                            {[
                                { label: 'Incident ID', value: 'INC_001234' },
                                { label: 'Title', value: 'Lost Physical Seal' },
                                { label: 'Reported by', value: 'Alice Smith (Notary)' },
                                { label: 'Reported Time', value: '11/25/2025 10:30' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-xs text-gray-400 font-bold uppercase">{item.label}</span>
                                    <span className="text-sm font-black">{item.value}</span>
                                </div>
                            ))}
                            <div className="pt-2">
                                <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Description</span>
                                <p className="text-sm text-slate-600 italic">"I lost my physical seal and suspect it may have been stolen during my travel..."</p>
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Affected Asset */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest">Affected Asset</h4>
                        <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                            {[
                                { label: 'Seal ID', value: 'S_123' },
                                { label: 'Type', value: 'Physical Seal' },
                                { label: 'Status', value: 'ACTIVE' },
                                { label: 'Issue Date', value: '01/01/2022' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400 font-black uppercase">{item.label}</span>
                                    <span className="text-sm font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bảng Affected Notarial Acts */}
                <div className="mt-10">
                    <h4 className="text-sm font-black mb-4">Affected Notarial Acts</h4>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden text-[11px]">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-3 font-black uppercase text-gray-400">Act ID</th>
                                    <th className="p-3 font-black uppercase text-gray-400">Date</th>
                                    <th className="p-3 font-black uppercase text-gray-400">Notary Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map(i => (
                                    <tr key={i} className="border-t border-slate-50">
                                        <td className="p-3 font-bold text-blue-600 underline">ACT-100{i}</td>
                                        <td className="p-3">Dec 15, 2025</td>
                                        <td className="p-3 font-medium">Alice Smith</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button className="px-8 py-3 bg-red-500 text-white rounded-xl font-black text-xs uppercase italic shadow-lg shadow-red-100">Revoke</button>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase italic shadow-lg shadow-blue-100">Approve</button>
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
};