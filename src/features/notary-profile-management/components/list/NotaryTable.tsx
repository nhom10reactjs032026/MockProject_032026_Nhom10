import type { Notary } from '../../types/notary.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NotaryTableProps {
  notaries: Notary[];
  isLoading: boolean;
}

export const NotaryTable = ({ notaries, isLoading }: NotaryTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-md border border-gray-100 p-20 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="text-gray-400 animate-pulse">Loading notaries data...</p>
      </div>
    );
  }

  if (notaries.length === 0) {
    return (
      <div className="bg-white rounded-md border border-gray-100 p-20 text-center">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="text-gray-300" size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No data found</h3>
        <p className="text-gray-400">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider pl-6">Notary ID</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Image</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Name</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Capability</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">State</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Expiry</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Branch</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Status</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-wider text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notaries.map((notary) => (
            <TableRow key={notary.id} className="hover:bg-blue-50/30 transition-colors group">
              <TableCell className="py-4 pl-6">
                <span className="text-blue-600 font-bold">#{notary.id}</span>
              </TableCell>
              <TableCell className="py-4">
                <Avatar className="h-12 w-12 rounded-lg border border-gray-100 shadow-sm">
                  <AvatarImage src={notary.image} alt={notary.name} />
                  <AvatarFallback className="rounded-lg bg-gray-100 text-gray-400 text-[10px]">IMG</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-semibold text-slate-700">{notary.name}</TableCell>
              <TableCell className="text-slate-500 text-sm max-w-[200px] truncate">{notary.capability}</TableCell>
              <TableCell className="text-slate-600">{notary.state}</TableCell>
              <TableCell className="text-slate-600 font-medium">{notary.expiryDate}</TableCell>
              <TableCell className="text-slate-600">{notary.branch}</TableCell>
              <TableCell>
                <Badge 
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border-none shadow-none ${
                    notary.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {notary.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/notaries/${notary.id}`}>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all">
                        <Eye size={18} />
                      </Button>
                    </Link>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-all">
                    <Pencil size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
