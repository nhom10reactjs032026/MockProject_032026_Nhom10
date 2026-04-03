import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { NotaryFilters as NotaryFiltersType } from '../../types/notary.types';

interface NotaryFiltersProps {
  filters: NotaryFiltersType;
  onFilterChange: (key: keyof NotaryFiltersType, value: string) => void;
}

export const NotaryFilters = ({ filters, onFilterChange }: NotaryFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFilterChange('search', localSearch);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, onFilterChange, filters.search]);

  // Sync local search when filters are reset externally
  useEffect(() => {
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  const handleReset = () => {
    onFilterChange('status', 'all');
    onFilterChange('state', 'all');
    onFilterChange('serviceType', 'all');
    onFilterChange('search', '');
    setLocalSearch('');
  };

  return (
    <div className="flex flex-col gap-6 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] ml-1">Status</Label>
          <Select 
            value={filters.status || 'all'} 
            onValueChange={(val) => onFilterChange('status', val)}
          >
            <SelectTrigger className="bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-xl px-4 focus:ring-2 ring-blue-500/20 transition-all">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] ml-1">State</Label>
          <Select 
            value={filters.state || 'all'} 
            onValueChange={(val) => onFilterChange('state', val)}
          >
            <SelectTrigger className="bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-xl px-4 focus:ring-2 ring-blue-500/20 transition-all">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="California">California</SelectItem>
              <SelectItem value="Texas">Texas</SelectItem>
              <SelectItem value="Florida">Florida</SelectItem>
              <SelectItem value="Washington">Washington</SelectItem>
              <SelectItem value="Arizona">Arizona</SelectItem>
              <SelectItem value="Alaska">Alaska</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] ml-1">Service Type</Label>
          <Select 
            value={filters.serviceType || 'all'} 
            onValueChange={(val) => onFilterChange('serviceType', val)}
          >
            <SelectTrigger className="bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-xl px-4 focus:ring-2 ring-blue-500/20 transition-all">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="RON">RON</SelectItem>
              <SelectItem value="Mobile Notary">Mobile Notary</SelectItem>
              <SelectItem value="Loan Signing">Loan Signing</SelectItem>
              <SelectItem value="Apostille Support">Apostille Support</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-end">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-4 w-4 transition-colors group-focus-within:text-blue-500" />
            <Input 
              className="pl-11 bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-xl focus:ring-2 ring-blue-500/20 transition-all" 
              placeholder="Search Notaries..." 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-2 border-t border-gray-50">
        <Button 
          variant="ghost" 
          onClick={handleReset}
          className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 gap-2 h-9 px-4 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all"
        >
          <RotateCcw size={14} />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
