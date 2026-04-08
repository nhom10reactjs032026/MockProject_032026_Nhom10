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
import { Eye, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface NotaryTableProps {
  notaries: Notary[];
  isLoading: boolean;
  onDelete?: (id: string) => Promise<void>;
}

export const NotaryTable = ({ notaries, isLoading, onDelete }: NotaryTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-100 p-32 flex flex-col items-center justify-center space-y-4 shadow-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-blue-500/10 border-b-blue-600"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Synchronizing Data...</p>
      </div>
    );
  }

  if (notaries.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-100 p-32 text-center shadow-sm">
        <div className="bg-blue-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-50">
          <Search className="text-blue-200" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-2">No notary records found.</h3>
        <p className="text-slate-400 font-medium">Try adjusting your filters or search terms to broaden your results.</p>
      </div>
    );
  }

  const tableHeaders = [
    { label: "Notary ID", className: "pl-10 w-32" },
    { label: "Image" },
    { label: "Name" },
    { label: "Capability" },
    { label: "State" },
    { label: "Expiry" },
    { label: "Branch" },
    { label: "Status" },
    { label: "Actions", className: "text-right pr-10" },
  ];

  return (
    <div className="rounded-[2.5rem] border border-gray-100 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/70 hover:bg-slate-50/70 h-16 border-b border-gray-100">
            {tableHeaders.map((header) => (
              <TableHead 
                key={header.label} 
                className={`font-bold text-slate-400 uppercase text-[11px] tracking-widest ${header.className || ""}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {notaries.map((notary) => (
            <TableRow key={notary.id} className="hover:bg-blue-50/30 transition-all border-b border-gray-50 last:border-0 h-24 group">
              <TableCell className="pl-10">
                <span className="text-blue-600 font-bold text-sm tracking-tight">#{notary.id}</span>
              </TableCell>
              <TableCell>
                <Avatar className="h-14 w-14 rounded-2xl border-4 border-slate-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                  <AvatarImage src={notary.image} alt={notary.name} className="object-cover" />
                  <AvatarFallback className="rounded-2xl bg-slate-100 text-slate-400 font-bold text-[10px]">IMG</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <p className="font-bold text-slate-800 text-[15px] leading-snug group-hover:text-blue-600 transition-colors uppercase tracking-tight">{notary.name}</p>
                <p className="text-[11px] text-slate-400 font-medium italic mt-0.5">{notary.languages || 'English'}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                   {notary.capability.split(',').map((cap, i) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100">
                        {cap.trim()}
                      </span>
                   ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-slate-600 font-bold text-xs uppercase tracking-wider">{notary.state}</span>
              </TableCell>
              <TableCell>
                <span className="text-slate-500 font-medium text-sm">{notary.expiryDate}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                   <span className="text-slate-600 font-medium text-sm">{notary.branch}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={`border-none px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                    notary.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-600 shadow-sm shadow-emerald-50' 
                      : 'bg-rose-100 text-rose-600 shadow-sm shadow-rose-50'
                  }`}
                >
                  {notary.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-10">
                  <div className="flex justify-end gap-3 transition-all duration-300">
                    <Link to={`/admin/notaries/${notary.id}`}>
                      <Button variant="ghost" size="icon" className="h-11 w-11 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all shadow-sm">
                        <Eye size={20} />
                      </Button>
                    </Link>
                    
                    {onDelete && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-11 w-11 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all shadow-sm">
                            <Trash2 size={20} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl p-8">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-slate-800">
                              Delete this notary?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 font-medium">
                              This action cannot be undone. This will permanently delete the
                              notary profile and all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 gap-3">
                            <AlertDialogCancel className="rounded-xl border-slate-100 font-bold h-12 px-6">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                if (onDelete) {
                                  await onDelete(notary.id);
                                }
                              }}
                              className="rounded-xl bg-rose-500 hover:bg-rose-600 font-bold h-12 px-6 shadow-lg shadow-rose-100 transition-all active:scale-95"
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
