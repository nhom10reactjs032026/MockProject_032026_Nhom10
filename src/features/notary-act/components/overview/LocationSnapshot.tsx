import { Map } from 'lucide-react';

export const LocationSnapshot = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Map size={14} strokeWidth={2.5} />
        </span>
        Location Snapshot
      </h2>

      <div className="bg-gray-50 h-[240px] rounded-xl flex items-center justify-center mb-4 border border-gray-100 relative overflow-hidden">
        {/* Mock Map Background Grids */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0H0v20h20V0z' fill='none' stroke='%233b82f6' stroke-width='1'/%3E%3C/svg%3E")` }}></div>
        <Map size={48} className="text-gray-300 relative z-10" strokeWidth={1} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8 z-10">
          <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-emerald-100 shadow-md animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span className="truncate">Verified IP Geolocation: Los Angeles, CA</span>
      </div>
    </div>
  );
};
