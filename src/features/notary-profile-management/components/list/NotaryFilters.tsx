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

export const NotaryFilters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</Label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">State</Label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="california">California</SelectItem>
            <SelectItem value="texas">Texas</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Service Type</Label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="ron">RON</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col justify-end space-y-1.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            className="pl-9 bg-white border-gray-100 text-slate-600 shadow-sm h-10 focus-visible:ring-blue-400" 
            placeholder="Search Notaries..." 
          />
        </div>
      </div>
    </div>
  );
};
