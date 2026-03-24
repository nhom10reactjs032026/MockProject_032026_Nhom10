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

interface NotaryTableProps {
  notaries: Notary[];
  isLoading: boolean;
}

export const NotaryTable = ({ notaries, isLoading }: NotaryTableProps) => {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading notaries...</div>;
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="w-[180px] font-bold text-gray-400 uppercase text-[11px]">NOTARY ID IMAGE</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px]">NAME</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px]">CAPABILITY</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px]">STATE</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px]">EXPIRY</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px]">BRANCH</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px]">STATUS</TableHead>
            <TableHead className="font-bold text-gray-400 uppercase text-[11px] text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notaries.map((notary) => (
            <TableRow key={notary.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 font-semibold">#{notary.id}</span>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-100 italic text-[10px] text-gray-300">
                    Image
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium text-slate-700">{notary.name}</TableCell>
              <TableCell className="text-slate-600">{notary.capability}</TableCell>
              <TableCell className="text-slate-600">{notary.state}</TableCell>
              <TableCell className="text-slate-600">{notary.expiryDate}</TableCell>
              <TableCell className="text-slate-600">{notary.branch}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`border-none ${
                    notary.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {notary.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Link to={`/admin/notaries/${notary.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                        <Eye size={16} />
                      </Button>
                    </Link>
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
  );
};
