import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Pencil, Trash2, Search, Upload } from 'lucide-react';

export const NotaryLegalCommission = () => {
  const commissions = [
    { id: '#8829', number: 'CA-20248847', state: 'California', issue: '2022-08-15', expiry: '2025-08-15', risk: 'Valid' },
    { id: '#8828', number: 'CA-22240847', state: 'California', issue: '2022-09-17', expiry: '2024-08-15', risk: 'Not eligible' },
    { id: '#8827', number: 'CA-211240847', state: 'New York', issue: '2023-05-01', expiry: '2025-08-15', risk: 'Expired' },
    { id: '#8826', number: 'CA-20240847', state: 'Deigo', issue: '2024-05-02', expiry: '2025-08-15', risk: 'Expired' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-3">
           <h2 className="text-xl font-bold text-slate-800 tracking-tight">Commission Information</h2>
           <Badge className="bg-rose-50 text-rose-500 border-none font-bold text-[10px] uppercase">Expired</Badge>
         </div>
         <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100 flex items-center gap-2 h-10 px-5">
           <Upload size={18} />
           Upload
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="space-y-1.5">
          <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</Label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
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
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Expiration Date</Label>
          <Select defaultValue="30">
            <SelectTrigger className="bg-white border-gray-100 text-slate-600 shadow-sm h-10">
              <SelectValue placeholder="30 days left" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 days left</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-end space-y-1.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-9 bg-white border-gray-100 text-slate-600 shadow-sm h-10 focus-visible:ring-blue-400" 
              placeholder="Search commission..." 
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-[100px] font-bold text-gray-400 uppercase text-[11px]">ID</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px]">COMMISSION NUMBER</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px]">COMMISSION STATE</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px]">ISSUE DATE</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px]">EXPIRATION DATE</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px]">RISK</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((comm) => (
              <TableRow key={comm.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="py-4">
                  <span className="text-blue-500 font-semibold">{comm.id}</span>
                </TableCell>
                <TableCell className="font-bold text-slate-700">{comm.number}</TableCell>
                <TableCell className="text-slate-600">{comm.state}</TableCell>
                <TableCell className="text-slate-600">{comm.issue}</TableCell>
                <TableCell className="text-slate-600">{comm.expiry}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`border-none ${
                        comm.risk === 'Valid' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : comm.risk === 'Expired'
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}
                  >
                    {comm.risk}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50">
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-400 hover:text-rose-600 hover:bg-rose-50">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-slate-500 pb-10">
        <p>Showing 1 to 2 of 1,248 entries</p>
        <div className="flex gap-2">
           <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 flex items-center">&lt;</button>
           <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold shadow-sm">1</button>
           <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 font-medium">2</button>
           <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 flex items-center">&gt;</button>
        </div>
      </div>
    </div>
  );
};
