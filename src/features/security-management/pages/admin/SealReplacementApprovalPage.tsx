import React from 'react';

export const SealReplacementApprovalPage = () => {
    return (
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm font-['Plus_Jakarta_Sans'] animate-in fade-in duration-500">
            {/* Header with Back Button - Increased to text-2xl */}
            <div className="flex items-center gap-5 mb-10">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Seal Replacement Request</h2>
            </div>

            {/* 1. Ownership Info (Read-Only) - Increased labels and values */}
            <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Ownership Information</h3>
                <div className="grid grid-cols-3 gap-10">
                    {[
                        { label: "Notary name", value: "Alice Smith" },
                        { label: "Commission number", value: "COMM-123456" },
                        { label: "State", value: "California (CA)" }
                    ].map((item, i) => (
                        <div key={i} className="space-y-1">
                            {/* Label increased to 11px */}
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{item.label}</p>
                            {/* Value increased to base (16px) */}
                            <p className="text-base font-black text-slate-700">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Request Details (Read-Only) */}
            <div className="grid grid-cols-2 gap-16 mb-12">
                <div className="space-y-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Physical Seal Info</h3>

                    <div className="grid grid-cols-1 gap-6">
                        {[
                            { label: "Shape", value: "Round" },
                            { label: "Size", value: "1.5 inch" },
                            { label: "Type", value: "Rubber Stamp" }
                        ].map((detail, idx) => (
                            <div key={idx}>
                                <p className="text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">{detail.label}</p>
                                {/* Boxed values increased to text-sm (14px) */}
                                <div className="p-4 bg-white rounded-2xl border border-slate-100 text-sm font-black text-slate-700 shadow-sm">
                                    {detail.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seal Impression Preview - Enhanced box and label */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[40px] bg-slate-50/30 p-10">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Seal Impression Preview</p>
                    <div className="w-48 h-48 bg-white rounded-full shadow-xl flex items-center justify-center p-6 border border-slate-50">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0N-Csh6K-9aXz68zY6-f6-5C0k58Zz6ySsg&s"
                            alt="Seal"
                            className="w-full h-full object-contain opacity-80 mix-blend-multiply transition-opacity hover:opacity-100"
                        />
                    </div>
                </div>
            </div>

            {/* 3. Action Footer (Reject/Approve) - Larger buttons and text */}
            <div className="flex justify-end gap-5 pt-10 border-t border-slate-100">
                <button className="px-12 py-4 bg-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-600 shadow-xl shadow-rose-100 transition-all active:scale-95">
                    Reject
                </button>
                <button className="px-12 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95">
                    Approve
                </button>
            </div>
        </div>
    );
};