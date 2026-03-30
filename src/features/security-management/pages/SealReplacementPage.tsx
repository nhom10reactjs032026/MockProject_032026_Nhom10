import React, { useState } from 'react';
import { Upload, Stamp, ShieldCheck } from 'lucide-react';

export const SealReplacementPage = () => {
    // State để chuyển đổi giữa 2 loại: 'physical' hoặc 'digital'
    const [activeType, setActiveType] = useState<'physical' | 'digital'>('physical');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[32px] border border-blue-50 shadow-sm">
                {/* 1. Ownership Information Card */}
                <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 mb-8">
                    <h4 className="text-[13px] font-black uppercase text-slate-900 mb-8 tracking-[0.1em] pl-3">
                        Ownership Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">Notary Name</p>
                            <p className="font-bold text-slate-800 text-lg">Alice Smith</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">Commission number</p>
                            <p className="font-bold text-slate-800 text-lg">COMM-123456</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">State</p>
                            <p className="font-bold text-slate-800 text-lg">California (CA)</p>
                        </div>
                    </div>
                </div>

                {/* 2. THANH NAV PHỤ (Tabs chọn loại tài sản) */}
                <div className="flex border-b border-slate-100 mb-8 gap-8">
                    <button
                        onClick={() => setActiveType('physical')}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeType === 'physical' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Physical Seal Info
                        {activeType === 'physical' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveType('digital')}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeType === 'digital' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Certificate Info
                        {activeType === 'digital' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
                    </button>
                </div>

                {/* 3. NỘI DUNG THAY ĐỔI THEO TAB */}
                <div className="animate-in slide-in-from-right-2 duration-300">
                    {activeType === 'physical' ? (
                        /* FORM CHO PHYSICAL SEAL  */
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 flex items-center gap-2">
                                    <Stamp size={18} /> Basic Information
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Shape</label>
                                        <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none">
                                            <option>Round</option>
                                            <option>Rectangular</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Size</label>
                                        <input type="text" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm" placeholder="1.5 inch" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Type</label>
                                        <input type="text" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm" placeholder="Rubber Stamp" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 italic">Seal Impression</h4>
                                <div className="border-2 border-dashed border-slate-200 rounded-[32px] h-60 flex flex-col items-center justify-center bg-slate-50 hover:border-blue-300 transition-all cursor-pointer overflow-hidden group">
                                    {/* Giả lập có ảnh đã upload */}
                                    <div className="text-center p-6 group-hover:scale-105 transition-transform">
                                        <Upload className="mx-auto text-slate-300 mb-2" size={40} />
                                        <p className="text-[10px] font-black uppercase text-slate-400">Click to upload new impression</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* FORM CHO DIGITAL CERTIFICATE (SC_007.3b) */
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 flex items-center gap-2">
                                    <ShieldCheck size={18} /> Certificate Details
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Serial Number</label>
                                        <input type="text" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm" placeholder="33223232" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Issue Date</label>
                                            <input type="date" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Expiration Date</label>
                                            <input type="date" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 italic">Attach Certificate File</h4>
                                <div className="border-2 border-dashed border-blue-100 rounded-[32px] h-60 flex flex-col items-center justify-center bg-blue-50/30 hover:bg-blue-50 transition-all cursor-pointer">
                                    <Upload className="text-blue-300 mb-2" size={40} />
                                    <p className="text-[10px] font-black uppercase text-blue-400">Upload .p12 or .cer file</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Footer Buttons */}
                <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-50">
                    <button className="px-8 py-3 rounded-xl font-black text-xs uppercase text-slate-400 hover:bg-slate-50">Cancel</button>
                    <button className="px-10 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase italic shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                        Submit {activeType === 'physical' ? 'Seal' : 'Certificate'} Request
                    </button>
                </div>
            </div>
        </div>
    );
};