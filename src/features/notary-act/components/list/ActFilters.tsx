import { Calendar, Search, X } from 'lucide-react';
import type { ActFilters as FiltersType } from '../../types/act.types';

interface ActFiltersProps {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
}

export const ActFilters = ({ filters, setFilters }: ActFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Search ID / Client
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="ID, Notary, or Client..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        {/* Act Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Act Type
          </label>
          <select
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            value={filters.type || ''}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: `right 0.5rem center`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `1.5em 1.5em`,
            }}
          >
            <option value="">All Types</option>
            <option value="Real Estate Closing">Real Estate Closing</option>
            <option value="Wills & Trusts">Wills & Trusts</option>
            <option value="Power of Attorney">Power of Attorney</option>
            <option value="Affidavits">Affidavits</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Status
          </label>
          <select
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: `right 0.5rem center`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `1.5em 1.5em`,
            }}
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Inprocess">Inprocess</option>
            <option value="Voided">Voided</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Date Range
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              readOnly
              value="Last 30 Days"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700">
            State: All States
            <button className="text-blue-500 hover:text-blue-800 focus:outline-none">
              <X size={14} />
            </button>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700">
            Risk: Low to High
            <button className="text-blue-500 hover:text-blue-800 focus:outline-none">
              <X size={14} />
            </button>
          </span>
        </div>
        
        <button 
          onClick={() => setFilters({})}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
        >
          <X size={16} />
          Clear All Filters
        </button>
      </div>
    </div>
  );
};
