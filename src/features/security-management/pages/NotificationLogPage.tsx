import React from 'react';

export const NotificationLogPage = () => {
    // Dữ liệu giả lập 
    const logs = [
        { id: '1', notifId: 'NOTIF-10021', date: 'Oct 25, 2025', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90881', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '2', notifId: 'NOTIF-10022', date: 'Oct 25, 2025', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90882', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '3', notifId: 'NOTIF-10023', date: 'Oct 25, 2025', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90883', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '4', notifId: 'NOTIF-10024', date: 'Oct 25, 2025', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90884', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
        { id: '5', notifId: 'NOTIF-10025', date: 'Oct 25, 2025', time: '09:15 AM', recipient: 'CA SOS', oldCert: 'SEAL-90885', name: 'Alice Smith', reason: 'Lost', status: 'Delivered' },
    ];

    return (
        <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
            <div className="mx-auto min-h-screen max-w-[1400px] bg-transparent px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Regulatory Notifications</h1>
                    <p className="mt-1 text-sm text-slate-500">Notification log and delivery status</p>
                </div>

                <div className="bg-white rounded-[32px] border border-blue-50 shadow-sm overflow-hidden animate-in fade-in duration-700">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-800">Regulatory Notification Log</h3>
                <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-lg italic tracking-wider">LIVE FEED</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                            <th className="p-4">#</th>
                            <th className="p-4">ID</th>
                            <th className="p-4">Date & Time</th>
                            <th className="p-4">Recipient</th>
                            <th className="p-4">Old Certificate</th>
                            <th className="p-4">Notary Name</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-[11px] divide-y divide-slate-50">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-blue-50/20 transition-colors group">
                                <td className="p-4 font-bold text-gray-300">{log.id}</td>
                                <td className="p-4 font-black text-blue-600 underline cursor-pointer">{log.notifId}</td>
                                <td className="p-4 font-bold text-slate-500">
                                    {log.date}<br />
                                    <span className="text-[9px] text-gray-400 font-medium">{log.time}</span>
                                </td>
                                <td className="p-4 font-black text-slate-700">{log.recipient}</td>
                                <td className="p-4 font-mono font-bold text-slate-500">{log.oldCert}</td>
                                <td className="p-4 font-black text-slate-800 italic">{log.name}</td>
                                <td className="p-4 italic text-gray-500 font-medium">{log.reason}</td>
                                <td className="p-4 text-center">
                                    <span className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-black uppercase text-[8px] italic shadow-sm shadow-blue-200">
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-50">
                <p className="text-[9px] font-bold text-gray-400 uppercase">Showing 1 to 5 of 1,245 entries</p>
                <div className="flex gap-1">
                    {[1, 2, 3, '...', 250].map((page, idx) => (
                        <button key={idx} className={`w-6 h-6 rounded-lg text-[9px] font-black transition-all ${page === 1 ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-white'}`}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
                </div>
            </div>
        </div>
    );
};