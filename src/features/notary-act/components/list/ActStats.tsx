import { ShieldCheck, FileWarning, AlertOctagon } from 'lucide-react';

export const ActStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Registry Health</p>
          <p className="text-2xl font-bold text-gray-900">98.4%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
          <FileWarning size={24} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Incomplete Drafts</p>
          <p className="text-2xl font-bold text-gray-900">12 Acts</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
          <AlertOctagon size={24} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Compliance Flags</p>
          <p className="text-2xl font-bold text-gray-900">2 Urgent</p>
        </div>
      </div>
    </div>
  );
};
