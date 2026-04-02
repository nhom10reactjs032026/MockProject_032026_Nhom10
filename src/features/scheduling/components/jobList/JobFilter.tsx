import React from "react";

interface FilterOption {
  label: string;
  options: string[];
}

interface JobFilterProps {
  filters: FilterOption[];
  onFilterChange?: (filterName: string, value: string) => void;
  onApplyFilters?: () => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters 
}) => {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {filters.map((filter) => (
          <div key={filter.label} className="flex flex-col gap-1">
            <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
              {filter.label}
            </span>
            <select 
              onChange={(e) => onFilterChange?.(filter.label, e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#ebebeb] bg-[#f8f8f8] text-sm text-gray-600 w-full focus:outline-none focus:ring-1 focus:ring-[#c4a484]/50"
            >
              <option value="all">All</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex items-end">
          <button 
            onClick={onApplyFilters}
            className="w-full lg:w-auto px-4 py-2 rounded-lg bg-[#c4a484] text-white text-sm font-medium hover:bg-[#b89474] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};