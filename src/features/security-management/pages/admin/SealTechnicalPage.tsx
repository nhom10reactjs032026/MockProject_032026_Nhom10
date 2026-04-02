import React, { useState } from 'react';
import {
    ShieldCheck, Check, ArrowLeft, ChevronRight,
    Smartphone, Lock, RefreshCw, Trash2, Shield
} from 'lucide-react';

export default function SealDetailPage() {
    // --- 1. STATES CHO TƯƠNG TÁC ---
    const [authMethods, setAuthMethods] = useState({ sms: true, app: false });
    const [isRotating, setIsRotating] = useState(false);
    const [devices, setDevices] = useState([
        { id: 1, name: 'MacBook Pro của Tú', mac: '8A-C8-AE-A6-AC', status: 'Active' },
        { id: 2, name: 'iPhone 15 Pro', mac: '8A-C8-AE-A6-AC', status: 'Active' },
        { id: 3, name: 'iPhone 11', mac: '8A-C8-AE-A6-AC', status: 'Revoked' },
    ]);

    const handleRotation = () => {
        setIsRotating(true);
        setTimeout(() => { setIsRotating(false); alert("Key Rotation Success!"); }, 1500);
    };

    const revokeDevice = (id: number) => {
        setDevices(devices.map(d => d.id === id ? { ...d, status: 'Revoked' } : d));
    };

    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen text-slate-800 font-['Plus_Jakarta_Sans'] animate-in fade-in duration-500">

            {/* --- HEADER --- */}
            <div className="flex items-center gap-5 mb-10">
                <button onClick={() => window.history.back()} className="p-3 bg-white hover:bg-blue-50 rounded-full shadow-sm border border-slate-100 transition-all text-slate-400 hover:text-blue-600">
                    <ArrowLeft size={24} strokeWidth={3} />
                </button>
                <h1 className="text-3xl font-black tracking-tight text-slate-800">Digital Signature & eSeal Management</h1>
            </div>

            <div className="space-y-8 max-w-[1300px]">

                {/* --- SECTION 1: CERTIFICATE ID --- */}
                <div className="bg-white p-10 rounded-[32px] border border-blue-100 shadow-sm flex justify-between items-center">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Certificate ID</p>
                        <div className="flex items-center gap-6">
                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">CERT_100000</h2>
                            <span className="bg-emerald-100 text-emerald-600 px-5 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 2: OWNERSHIP & VALIDITY --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Ownership */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-black mb-10">Ownership Information</h3>
                        <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                            <div>
                                <p className="text-slate-400 text-[11px] font-black uppercase mb-2">Notary name</p>
                                <p className="font-black text-2xl text-slate-800">Alice Smith</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-[11px] font-black uppercase mb-2">Commission number</p>
                                <p className="font-black text-2xl text-slate-800">COMM-123456</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-slate-400 text-[11px] font-black uppercase mb-2">State</p>
                                <p className="font-black text-2xl text-slate-800">California (CA)</p>
                            </div>
                        </div>
                    </div>

                    {/* Validity Period */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
                        <h3 className="text-xl font-black mb-10">Validity Period</h3>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <p className="text-slate-400 text-[11px] font-black uppercase mb-2">Issue date</p>
                                <p className="font-black text-xl text-slate-700">Oct 18, 2023</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-[11px] font-black uppercase mb-2">Expiration date</p>
                                <p className="font-black text-xl text-slate-700">Oct 18, 2023</p>
                            </div>
                        </div>
                        <div className="mt-auto space-y-4">
                            <p className="text-slate-400 text-xs font-bold italic">Time remaining until expiration date</p>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-blue-600 rounded-full shadow-lg" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 3: CERT DETAILS & KEY MGMT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cert Details */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                        <h3 className="text-xl font-black">Certificate Details</h3>
                        <div>
                            <p className="text-slate-400 text-[11px] font-black uppercase mb-4 tracking-widest">Certificate Authority (CA)</p>
                            <div className="flex items-center gap-4 p-5 bg-white border-2 border-slate-50 rounded-[24px] shadow-sm">
                                <div className="bg-slate-50 p-2.5 rounded-xl"><ShieldCheck className="text-slate-400" size={24} /></div>
                                <span className="font-black text-slate-700 text-lg">Entrust Datacard Certified CA</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-[11px] font-black uppercase mb-6 tracking-widest">Certificate Chain</p>
                            <div className="space-y-4 ml-2 border-l-2 border-slate-100 pl-8">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-400"><ChevronRight size={18} /> Root CA</div>
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 ml-6"><ChevronRight size={18} /> Intermediate CA</div>
                                <div className="flex items-center gap-3 text-base font-black text-slate-500 ml-12">Notary Certificate (SDC-987654)</div>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-[11px] font-black uppercase mb-4 tracking-widest">Cryptographic Algorithm</p>
                            <span className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase italic tracking-[0.2em] shadow-xl shadow-blue-100">
                                RSA 4096-bit / SHA-256
                            </span>
                        </div>
                    </div>

                    {/* Key Management */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                        <h3 className="text-xl font-black">Key Management</h3>
                        <div className="space-y-10">
                            <div>
                                <p className="text-slate-400 text-[11px] font-black uppercase mb-4 tracking-widest">Key Storage Method</p>
                                <div className="p-6 border-2 border-slate-50 bg-white rounded-[24px] flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-slate-900 p-2 rounded-xl text-white shadow-lg"><Check size={20} strokeWidth={4} /></div>
                                        <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Hardware Security Module (HSM)</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-4 py-1.5 rounded-xl shadow-lg shadow-emerald-50">Active & Secure</span>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-slate-400 text-[11px] font-black uppercase tracking-wider">Key Storage Method (Rotation)</p>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600" style={{ width: '80%' }}></div>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <p className="text-xs text-slate-400 font-bold italic">Next rotation: 2025-05-20</p>
                                    <button
                                        onClick={handleRotation}
                                        disabled={isRotating}
                                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl transition-all ${isRotating ? 'bg-slate-100 text-slate-300' : 'bg-blue-600 text-white shadow-blue-100 hover:scale-105 active:scale-95'
                                            }`}
                                    >
                                        {isRotating ? <RefreshCw size={18} className="animate-spin" /> : 'Initiate Key Rotation'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 4: USAGE SCOPE --- */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black mb-10">Usage Scope</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <p className="text-slate-400 text-[11px] font-black uppercase mb-6">Allowed Notarial Act Types</p>
                            <div className="flex flex-wrap gap-4">
                                {['Acknowledgements', 'Jurats', 'Remote Online Notarization', 'Loan signings'].map(tag => (
                                    <span key={tag} className="px-6 py-3 bg-white border-2 border-slate-50 rounded-2xl text-[12px] font-black text-slate-500 hover:border-blue-200 hover:text-blue-600 transition-all cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-[11px] font-black uppercase mb-6">Authorized States</p>
                            <div className="p-5 bg-slate-50/50 border-2 border-slate-50 rounded-[20px] font-bold text-base text-slate-400 italic">
                                California
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 5: SECURITY SETTINGS --- */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black mb-10">Security Settings</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Auth Toggles */}
                        <div className="space-y-8">
                            <p className="text-slate-400 text-[11px] font-black uppercase">Auth Method</p>
                            {/* SMS Toggle */}
                            <div
                                onClick={() => setAuthMethods(p => ({ ...p, sms: !p.sms }))}
                                className="flex items-center justify-between p-5 bg-white border-2 border-slate-50 rounded-[24px] cursor-pointer hover:shadow-md transition-all"
                            >
                                <span className="text-[13px] font-black text-slate-700 flex items-center gap-3"><Smartphone size={20} /> SMS OTP</span>
                                <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${authMethods.sms ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}>
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                                </div>
                            </div>
                            {/* App Toggle */}
                            <div
                                onClick={() => setAuthMethods(p => ({ ...p, app: !p.app }))}
                                className="flex items-center justify-between p-5 bg-white border-2 border-slate-50 rounded-[24px] cursor-pointer hover:shadow-md transition-all"
                            >
                                <span className="text-[13px] font-black text-slate-700 flex items-center gap-3"><Lock size={20} /> Authenticator App</span>
                                <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${authMethods.app ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}>
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                                </div>
                            </div>
                        </div>

                        {/* Device Table */}
                        <div className="lg:col-span-2">
                            <p className="text-slate-400 text-[11px] font-black uppercase mb-6">Device Binding</p>
                            <div className="border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            <th className="p-6">Device Name</th>
                                            <th className="p-6">MAC Address</th>
                                            <th className="p-6 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 font-bold">
                                        {devices.map(dev => (
                                            <tr key={dev.id} className="hover:bg-blue-50/10 transition-colors group">
                                                <td className="p-6 font-black text-slate-700">{dev.name}</td>
                                                <td className="p-6 font-mono text-slate-400 text-xs">{dev.mac}</td>
                                                <td className="p-6 text-center flex justify-center gap-4 items-center">
                                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${dev.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                                        }`}>
                                                        {dev.status}
                                                    </span>
                                                    {dev.status === 'Active' && (
                                                        <button onClick={() => revokeDevice(dev.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}