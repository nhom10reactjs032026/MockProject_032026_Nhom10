import React from 'react';

export const ReplacementPage = () => {
    // Comparison data - increased font-ready structure
    const comparisonData = [
        { field: 'Asset Type', revoked: 'Digital Seal', replacement: 'Digital Seal' },
        { field: 'Serial Number', revoked: '12345', replacement: '67890' },
        { field: 'Validation Start', revoked: 'Dec 11, 2023', replacement: 'Dec 11, 2023' },
        { field: 'Validity Expiry', revoked: 'Dec 11, 2024', replacement: 'Jan 11, 2026' },
        { field: 'Status', revoked: 'Revoked', replacement: 'Active' },
        { field: 'Change Log', revoked: '-', replacement: '-' },
    ];

    return (
        <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
            <div className="bg-white p-12 rounded-[40px] border border-blue-50 shadow-sm flex flex-col items-center min-h-[650px]">

                {/* 1. SECTION TITLE - Increased to 13px */}
                <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.25em] mb-12">
                    Linkage Verification Data
                </h3>

                {/* 2. THREE-COLUMN COMPARISON TABLE */}
                <div className="w-full max-w-5xl overflow-hidden border border-slate-100 rounded-[32px] shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            {/* Header increased to 12px (text-xs) */}
                            <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-black uppercase text-slate-400 tracking-widest">
                                <th className="p-7 w-1/4">Field</th>
                                <th className="p-7 w-1/3 text-center">
                                    Revoked Asset <br />
                                    <span className="text-blue-600 font-black text-[13px] lowercase tracking-normal">(ID: 12345)</span>
                                </th>
                                <th className="p-7 w-1/3 text-center border-l border-slate-100 bg-blue-50/30">
                                    New Replacement <br />
                                    <span className="text-blue-600 font-black text-[13px] lowercase tracking-normal">(ID: 67890)</span>
                                </th>
                            </tr>
                        </thead>
                        {/* Body text increased to 14px/15px */}
                        <tbody className="text-[14px] font-bold text-slate-600 divide-y divide-slate-50">
                            {comparisonData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/10 transition-colors group">
                                    <td className="p-6 font-black text-slate-400 uppercase text-[11px] tracking-wider bg-slate-50/20">
                                        {row.field}
                                    </td>
                                    <td className="p-6 text-center text-slate-700 font-bold">
                                        {row.revoked === 'Revoked' ? (
                                            <span className="text-rose-500 font-black italic uppercase text-xs">Revoked</span>
                                        ) : row.revoked}
                                    </td>
                                    {/* Highlighting the new asset column */}
                                    <td className="p-6 text-center border-l border-slate-100 font-black text-slate-800 bg-blue-50/10">
                                        {row.replacement === 'Active' ? (
                                            <span className="text-blue-600 font-black italic uppercase text-xs">Active</span>
                                        ) : row.replacement}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 3. VERIFICATION NOTE - Increased to 13px */}
                <div className="w-full max-w-5xl mt-8 px-4">
                    <p className="text-[13px] font-black text-slate-800 italic tracking-tight flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                        Official Linkage: New Seal <span className="text-blue-600 font-black underline underline-offset-2">#67890</span>
                        is now verified to replace Revoked Seal <span className="text-blue-600 font-black underline underline-offset-2">#12345</span>
                    </p>
                </div>

                {/* 4. ACTION BUTTONS - Larger and more impact */}
                <div className="w-full max-w-5xl mt-14 flex justify-end gap-5">
                    <button className="px-14 py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase italic tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-600 transition-all active:scale-95">
                        Reject
                    </button>
                    <button className="px-14 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase italic tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};