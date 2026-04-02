import React from 'react';

export const ReplacementPage = () => {
    // Dữ liệu so sánh
    const comparisonData = [
        { field: 'Asset Type', revoked: 'Digital Seal', replacement: 'Digital Seal' },
        { field: 'Serial Number', revoked: '12345', replacement: '67890' },
        { field: 'Validation Start', revoked: 'Dec 11, 2023', replacement: 'Dec 11, 2023' },
        { field: 'Validity Expiry', revoked: 'Dec 11, 2024', replacement: 'Jan 11, 2026' },
        { field: 'Status', revoked: 'Revoked', replacement: 'Active' },
        { field: 'Change Log', revoked: '-', replacement: '-' },
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[40px] border border-blue-50 shadow-sm flex flex-col items-center min-h-[600px]">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-10">
                    Linkage Verification Data
                </h3>

                {/* Bảng so sánh 3 cột */}
                <div className="w-full max-w-4xl overflow-hidden border border-slate-100 rounded-[24px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                <th className="p-5 w-1/4">Field</th>
                                <th className="p-5 w-1/3 text-center">
                                    Revoked Asset <br />
                                    <span className="text-blue-600 font-bold lowercase tracking-normal">(ID: 12345)</span>
                                </th>
                                <th className="p-5 w-1/3 text-center border-l border-slate-100">
                                    New Replacement <br />
                                    <span className="text-blue-600 font-bold lowercase tracking-normal">(ID: 67890)</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[11px] font-bold text-slate-600 divide-y divide-slate-50">
                            {comparisonData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                                    <td className="p-5 font-black text-slate-400 uppercase text-[9px] tracking-wider bg-slate-50/30">
                                        {row.field}
                                    </td>
                                    <td className="p-5 text-center">
                                        {row.revoked === 'Revoked' ? (
                                            <span className="text-red-500 font-black italic">Revoked</span>
                                        ) : row.revoked}
                                    </td>
                                    <td className="p-5 text-center border-l border-slate-100">
                                        {row.replacement === 'Active' ? (
                                            <span className="text-blue-600 font-black italic uppercase">Active</span>
                                        ) : row.replacement}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Dòng ghi chú liên kết ở dưới bảng */}
                <div className="w-full max-w-4xl mt-6">
                    <p className="text-[10px] font-black text-slate-800 italic tracking-wide">
                        New Seal <span className="text-blue-600">#67890</span> is officially linked to Revoked Seal <span className="text-blue-600">#12345</span>
                    </p>
                </div>

                {/* Nút hành động ở góc dưới bên phải */}
                <div className="w-full max-w-4xl mt-12 flex justify-end gap-4">
                    <button className="px-12 py-3 bg-red-500 text-white rounded-xl font-black text-[11px] uppercase italic shadow-lg shadow-red-100 hover:bg-red-600 transition-all">
                        Reject
                    </button>
                    <button className="px-12 py-3 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase italic shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};