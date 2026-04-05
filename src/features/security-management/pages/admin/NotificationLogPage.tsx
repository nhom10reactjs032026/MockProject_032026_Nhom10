import React from 'react';

export const NotificationLogPage = () => {
    // Mock data - Font sizes adjusted for high-level regulatory monitoring
    const logs = [
        { id: '1', notifId: 'NOTIF-10021', date: 'Oct 25, 2026', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90881', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '2', notifId: 'NOTIF-10022', date: 'Oct 25, 2026', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90882', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '3', notifId: 'NOTIF-10023', date: 'Oct 25, 2026', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90883', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '4', notifId: 'NOTIF-10024', date: 'Oct 25, 2026', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90884', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '5', notifId: 'NOTIF-10025', date: 'Oct 25, 2026', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90885', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
    ];

    return (
        <div className="bg-white rounded-[40px] border border-blue-50 shadow-sm overflow-hidden animate-in fade-in duration-700 font-['Plus_Jakarta_Sans']">
            {/* 1. HEADER: Increased title size and badge visibility */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    Regulatory Notification Log
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        {/* Headers increased to 12px (text-xs) */}
                        <tr className="text-xs font-black uppercase text-slate-400 tracking-widest border-b border-slate-50">
                            <th className="p-6">#</th>
                            <th className="p-6">Notification ID</th>
                            <th className="p-6">Timestamp</th>
                            <th className="p-6">Recipient</th>
                            <th className="p-6">Old Certificate</th>
                            <th className="p-6">Notary Name</th>
                            <th className="p-6">Reason</th>
                            <th className="p-6 text-center">Status</th>
                        </tr>
                    </thead>
                    {/* Body text increased to 14px (text-sm) */}
                    <tbody className="text-sm divide-y divide-slate-50">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-blue-50/20 transition-all group">
                                <td className="p-6 font-bold text-slate-300 text-base">{log.id}</td>
                                <td className="p-6 font-black text-blue-600 underline underline-offset-4 decoration-blue-100 group-hover:decoration-blue-400 cursor-pointer">
                                    {log.notifId}
                                </td>
                                <td className="p-6">
                                    <p className="font-black text-slate-700">{log.date}</p>
                                    <span className="text-[11px] text-slate-400 font-bold uppercase">{log.time}</span>
                                </td>
                                <td className="p-6 font-black text-slate-800 uppercase tracking-tight">{log.recipient}</td>
                                <td className="p-6 font-mono font-black text-slate-500 bg-slate-50/50 rounded-lg text-center mx-2 my-4 block">
                                    {log.oldCert}
                                </td>
                                <td className="p-6 font-black text-slate-800 italic">{log.name}</td>
                                <td className="p-6 italic text-slate-500 font-semibold">{log.reason}</td>
                                <td className="p-6 text-center">
                                    <span className="bg-blue-600 text-white px-5 py-2 rounded-xl font-black uppercase text-[10px] italic shadow-lg shadow-blue-100 tracking-wider">
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 2. PAGINATION: Larger buttons for better accessibility */}
            <div className="p-8 bg-slate-50/30 flex justify-between items-center border-t border-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Showing 1 to 5 of 1,245 entries
                </p>
                <div className="flex gap-2">
                    {[1, 2, 3, '...', 250].map((page, idx) => (
                        <button
                            key={idx}
                            className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${page === 1
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-100'
                                : 'text-slate-400 hover:bg-white hover:text-blue-600 border border-transparent hover:border-slate-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};