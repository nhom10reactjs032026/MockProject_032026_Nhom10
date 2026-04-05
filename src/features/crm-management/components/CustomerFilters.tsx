import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, ListFilter } from "lucide-react";

interface FiltersProps {
  onReset?: () => void;
}

/**
 * Filter panel for the Customer List page.
 * Provides inputs to search and filter customer records by various attributes.
 */
export const CustomerFilters = ({ onReset }: FiltersProps) => {
  return (
    <div className="mb-6 rounded-xl bg-slate-100 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <div className="flex items-center gap-2">
          <ListFilter className="h-5 w-5 text-slate-800" />
          <h3 className="text-base font-bold text-slate-900">
            Advanced Filters
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-9 w-9 rounded-md bg-slate-200/80 p-0 text-slate-700 hover:bg-slate-300 hover:text-slate-900 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Grid Layout for Filter Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 md:gap-6">
        <div>
          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">
            Name
          </label>
          <Input
            placeholder="Search by name..."
            className="text-sm bg-white border-slate-200 h-10 placeholder:text-slate-400 focus-visible:ring-slate-300"
          />
        </div>

        {/* ... remaining select inputs ... */}
        <div>
          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">
            Type
          </label>
          <select className="w-full border border-slate-200 rounded-md px-3 h-10 text-sm bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors">
            <option>All Types</option>
            <option>B2B</option>
            <option>B2C</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">
            Industry
          </label>
          <select className="w-full border border-slate-200 rounded-md px-3 h-10 text-sm bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors">
            <option>All Industries</option>
            <option>Technology</option>
            <option>Shipping</option>
            <option>Manufacturing</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">
            Status
          </label>
          <select className="w-full border border-slate-200 rounded-md px-3 h-10 text-sm bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">
            Tag
          </label>
          <select className="w-full border border-slate-200 rounded-md px-3 h-10 text-sm bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors">
            <option>All Tags</option>
            <option>VIP</option>
            <option>HIGH-VOLUME</option>
          </select>
        </div>
      </div>
    </div>
  );
};
