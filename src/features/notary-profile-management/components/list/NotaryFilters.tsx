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
import { Search } from 'lucide-react';
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</Label>
        <Select 
          value={filters.status || 'all'} 
          onValueChange={(val) => onFilterChange('status', val)}
        >
          <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="deactive">Deactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">State</Label>
        <Select 
          value={filters.state || 'all'} 
          onValueChange={(val) => onFilterChange('state', val)}
        >
          <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="california">California</SelectItem>
            <SelectItem value="texas">Texas</SelectItem>
            <SelectItem value="new york">New York</SelectItem>
            <SelectItem value="florida">Florida</SelectItem>
            <SelectItem value="washington">Washington</SelectItem>
            <SelectItem value="illinois">Illinois</SelectItem>
            <SelectItem value="michigan">Michigan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Service Type</Label>
        <Select 
          value={filters.serviceType || 'all'} 
          onValueChange={(val) => onFilterChange('serviceType', val)}
        >
          <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ron">RON</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="loan signing">Loan Signing</SelectItem>
            <SelectItem value="apostille support">Apostille Related Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col justify-end space-y-1.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            className="pl-9 bg-white border-gray-100 text-slate-600 shadow-sm h-10 rounded-sm focus-visible:ring-1 focus-visible:ring-[#c4a484]/50" 
            placeholder="Search Notaries..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
