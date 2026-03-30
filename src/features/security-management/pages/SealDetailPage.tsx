import React from 'react';
import { ShieldCheck, Check, Key, Smartphone, Lock } from 'lucide-react';
import { StatusBadge, ProgressBar } from '../components/DetailComponents';

export default function SealDetailPage() {
    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen text-slate-800 font-sans">
            {/* 1. Header có nút quay lại */}
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-2xl font-extrabold tracking-tight">Digital Signature & eSeal Management</h1>
            </div>

            <div className="space-y-6 max-w-[1200px]">
                {/* 2. Certificate ID Card */}
                <div className="bg-white p-8 rounded-[32px] border border-blue-50/50 shadow-sm">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Certificate ID</p>
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl font-black text-slate-900">CERT_100000</h2>
                        <StatusBadge status="Active" />
                    </div>
                </div>

                {/* 3. Info Grid (Ownership & Validity) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Ownership Information */}
                    <div className="bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm">
                        <h3 className="text-lg font-black mb-6">Ownership Information</h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Notary name</p>
                                <p className="font-bold text-xl">Alice Smith</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Commission number</p>
                                <p className="font-bold text-xl">COMM-123456</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">State</p>
                                <p className="font-bold text-xl">California (CA)</p>
                            </div>
                        </div>
                    </div>

                    {/* Validity Period */}
                    <div className="bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm">
                        <h3 className="text-lg font-black mb-6">Validity Period</h3>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Issue date</p>
                                <p className="font-bold text-lg">Oct 18, 2023</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase mb-1">Expiration date</p>
                                <p className="font-bold text-lg">Oct 18, 2023</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-400 text-[10px] font-bold italic">Time remaining until expiration date</p>
                            <ProgressBar progress={65} color="bg-blue-500" />
                        </div>
                    </div>
                </div>

                {/* 4. Certificate Details & Key Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Details */}
                    <div className="bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm flex flex-col justify-between">
                        <h3 className="text-lg font-black mb-6">Certificate Details</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-400 text-xs font-black uppercase mb-3">Certificate Authority (CA)</p>
                                <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <ShieldCheck className="text-blue-600" size={20} />
                                    <span className="font-bold text-blue-700 text-sm">Entrust Datacard Certified CA</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-black uppercase mb-3">Cryptographic Algorithm</p>
                                <span className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase italic tracking-widest shadow-md shadow-blue-200">
                                    RSA 4096-bit / SHA-256
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Key Management */}
                    <div className="bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm">
                        <h3 className="text-lg font-black mb-6">Key Management</h3>
                        <div className="space-y-6">
                            <div className="p-4 border border-green-100 bg-green-50/50 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-900 p-1.5 rounded-lg text-white">
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                    <span className="text-[11px] font-black uppercase leading-none">Hardware Security Module (HSM)</span>
                                </div>
                                <StatusBadge status="Active & Secure" />
                            </div>
                            <div className="space-y-3">
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider">Key Storage Method</p>
                                <ProgressBar progress={80} color="bg-blue-600" />
                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-[10px] text-gray-400 font-bold">Next rotation due in 65 days (2025-05-20)</p>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-700 transition-colors italic">
                                        Initiate Key Rotation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Security Settings (Phần bảng dưới cùng) */}
                <div className="bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-black mb-6">Security Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-400 text-xs font-black uppercase mb-3">Auth Method</p>
                                <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none">
                                    <option>SMS OTP or Authenticator App</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-black uppercase mb-3">Device Binding</p>
                                <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none">
                                    <option>Trusted Name</option>
                                </select>
                            </div>
                        </div>

                        {/* Table Device Binding */}
                        <div className="overflow-hidden border border-slate-100 rounded-2xl">
                            <table className="w-full text-left text-[11px]">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="p-3 font-black uppercase text-slate-400">Device Name</th>
                                        <th className="p-3 font-black uppercase text-slate-400">MAC Address</th>
                                        <th className="p-3 font-black uppercase text-slate-400 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-50">
                                        <td className="p-3 font-bold">Trusted Name</td>
                                        <td className="p-3 font-mono text-slate-500">8A-C8-AE-A6-AC</td>
                                        <td className="p-3 text-center">
                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black uppercase text-[9px]">Revoked</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}