// src/features/security-management/pages/IncidentReportPage.tsx
export const IncidentReportPage = () => {
    return (
        <div className="bg-white p-10 rounded-[32px] border border-blue-50 shadow-sm max-w-4xl">
            <h2 className="text-xl font-black mb-8 border-b pb-4">Incident Report Form</h2>
            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Title incident</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="Enter incident title..." />
                </div>
                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Description</label>
                    <textarea rows={4} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="Describe what happened..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Affected Date</label>
                        <input type="date" className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Reason</label>
                        <select className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none">
                            <option>Select reason</option>
                            <option>Lost</option>
                            <option>Stolen</option>
                            <option>Technical Error</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-4 pt-6">
                    <button className="px-8 py-3 rounded-xl font-black text-sm text-slate-400 hover:bg-slate-50">Cancel</button>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">Submit Report</button>
                </div>
            </div>
        </div>
    );
};