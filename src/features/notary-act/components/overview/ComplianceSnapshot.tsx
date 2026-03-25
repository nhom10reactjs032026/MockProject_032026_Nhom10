import { useState } from 'react';
import { CheckCircle2, AlertCircle, FileCheck2 } from 'lucide-react';

export const ComplianceSnapshot = () => {
  const [oathCompleted, setOathCompleted] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FileCheck2 size={14} strokeWidth={2.5} />
        </span>
        Compliance Snapshot
      </h2>

      <div className="space-y-4">
        {/* Passed Item (ID Verification) */}
        <div className="flex items-start justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100/50 transition-all">
          <div className="flex gap-3">
            <CheckCircle2 size={24} className="text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="font-bold text-gray-900 text-sm">Identity verified via KBA</p>
              <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-600"></span> Verified at 10:14 AM
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-widest rounded-md mt-1 border border-emerald-200 shadow-sm">
            Passed
          </span>
        </div>

        {/* Action Required Item (Oath) - Interactive */}
        {oathCompleted ? (
          <div className="flex items-start justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100/50 transition-all">
            <div className="flex gap-3">
              <CheckCircle2 size={24} className="text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="font-bold text-gray-900 text-sm">Oath or Affirmation required</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-600"></span> Verified just now
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-widest rounded-md mt-1 border border-emerald-200 shadow-sm">
              Passed
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all">
            <div className="flex gap-3 items-center">
              <AlertCircle size={24} className="text-amber-500 flex-shrink-0" strokeWidth={2} />
              <p className="font-bold text-gray-900 text-sm">Oath or Affirmation required</p>
            </div>
            <button 
              onClick={() => setOathCompleted(true)}
              className="px-5 py-2 bg-blue-600 hover:bg-violet-600 transition-colors text-white text-[11px] uppercase font-bold tracking-widest rounded-lg shadow-[0_2px_10px_-3px_rgba(37,99,235,0.4)]"
            >
              Complete Now
            </button>
          </div>
        )}

        {/* Pending Item */}
        <div className="flex items-center justify-between p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <div className="flex gap-3 items-center opacity-60">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="w-3 h-0.5 bg-gray-300 rounded"></span>
            </div>
            <p className="font-bold text-gray-500 text-sm">Journal entry completed</p>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-widest rounded-md border border-gray-200">
            Pending
          </span>
        </div>
      </div>
    </div>
  );
};
