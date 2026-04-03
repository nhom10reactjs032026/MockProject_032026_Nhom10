import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  useNotaryDetail, 
  useAddCommission, 
  useUpdateCommission, 
  useDeleteCommission 
} from '../../../hooks/useNotaries';
import { Skeleton } from '@/components/ui/skeleton';
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
import { Eye, Pencil, Trash2, Search, Upload, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { CommissionForm } from '../modals/CommissionForm';
import type { Commission } from '../../../types/notary.types';
import type { CommissionFormValues } from '../../../schemas/notary-commission.schema';

interface NotaryLegalCommissionProps {
  notaryId: string;
}

export const NotaryLegalCommission = ({ notaryId }: NotaryLegalCommissionProps) => {
  const { data: notary, isLoading } = useNotaryDetail(notaryId);
  const addMutation = useAddCommission();
  const updateMutation = useUpdateCommission();
  const deleteMutation = useDeleteCommission();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all'); // Added for GUI_LC_33

  // Pagination state (GUI_LC_46)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State for Form Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCommission, setEditingCommission] = useState<Commission | null>(null);

  // Logic for Filter and Search
  const filteredCommissions = useMemo(() => {
    if (!notary?.commissions) return [];

    let result = [...notary.commissions];

    if (searchTerm) {
      result = result.filter(c => 
        c.commissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(c => c.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (stateFilter !== 'all') {
      result = result.filter(c => c.state.toLowerCase() === stateFilter.toLowerCase());
    }

    result.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

    return result;
  }, [notary, searchTerm, statusFilter, stateFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCommissions.length / itemsPerPage);
  const currentItems = filteredCommissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Expiry Alerts Logic
  const expiringSoonCount = useMemo(() => {
    if (!notary?.commissions) return 0;
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    
    return notary.commissions.filter(c => {
      const expiry = new Date(c.expiryDate);
      return expiry > now && expiry <= thirtyDaysFromNow;
    }).length;
  }, [notary]);

  const handleFormSubmit = async (values: CommissionFormValues) => {
    try {
      if (editingCommission) {
        await updateMutation.mutateAsync({
          notaryId,
          commissionId: editingCommission.id,
          data: {
            ...values,
            status: new Date(values.expiryDate) > new Date() ? 'Valid' : 'Expired'
          }
        });
        toast.success('Commission record updated successfully.'); // FUNC_10
      } else {
        await addMutation.mutateAsync({
          notaryId,
          data: values
        });
        toast.success('Commission record uploaded successfully');
      }
      setIsFormOpen(false);
      setEditingCommission(null);
    } catch (error) {
      toast.error('Unable to update commission record. Please try again.'); // FUNC_15
    }
  };

  const handleDelete = async (id: string) => {
     if (window.confirm('Do you want to delete this commission record?')) { // User requirement says "Confirm the deletion in the popup"
       try {
         await deleteMutation.mutateAsync({ notaryId, commissionId: id });
         toast.success('Commission record deleted successfully.'); // FUNC_13
       } catch (error) {
         toast.error('Failed to delete commission');
       }
     }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  const hasExpired = notary?.commissions?.some(c => c.status === 'Expired');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Expiry Alerts */}
      {expiringSoonCount > 0 && (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 text-amber-700 shadow-sm shadow-amber-50">
           <AlertCircle className="shrink-0" size={20} />
           <p className="text-sm font-bold">
             Notice: {expiringSoonCount} commission record{expiringSoonCount > 1 ? 's are' : ' is'} expiring within 30 days. Please remind the notary to renew.
           </p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="flex items-center gap-4">
           <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">Commission Information</h2>
           {hasExpired && (
             <Badge className="bg-rose-50 text-rose-500 border-none font-bold text-[10px] uppercase h-6 px-3 rounded-full flex items-center justify-center">
               Expired
             </Badge>
           )}
         </div>
         <Button 
            onClick={() => {
              setEditingCommission(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 h-11 px-8 rounded-xl font-bold transition-all"
         >
           <Upload size={18} />
           Upload
         </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white/70 backdrop-blur-md p-4 rounded-[2rem] border border-gray-100 flex flex-col xl:flex-row gap-6 mb-8 shadow-sm">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] ml-2">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-2xl px-4 focus:ring-2 ring-blue-500/20 active:scale-95 transition-all">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100 shadow-xl overflow-hidden">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Valid">Valid</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Not eligible">Not eligible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] ml-2">State</Label>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-2xl px-4 focus:ring-2 ring-blue-500/20 active:scale-95 transition-all">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100 shadow-xl overflow-hidden">
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Washington">Washington</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] ml-2">Expiration</Label>
            <Select value={expiryFilter} onValueChange={setExpiryFilter}>
              <SelectTrigger className="bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-2xl px-4 focus:ring-2 ring-blue-500/20 active:scale-95 transition-all">
                <SelectValue placeholder="30 days left" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100 shadow-xl overflow-hidden">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="30">30 days left</SelectItem>
                <SelectItem value="60">60 days left</SelectItem>
                <SelectItem value="90">90 days left</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col justify-end xl:min-w-[400px]">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-4 w-4 transition-colors group-focus-within:text-blue-500" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 bg-slate-50/50 border-gray-100 text-slate-600 shadow-none h-11 rounded-2xl focus:ring-2 ring-blue-500/20 transition-all" 
              placeholder="Search commission..." 
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-[2rem] border border-gray-100 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-gray-100 h-16">
              <TableHead className="pl-8 font-bold text-slate-400 uppercase text-[11px] tracking-widest w-24">ID</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">Commission Number</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">Commission State</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">Issue Date</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">Expiration Date</TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">Risk</TableHead>
              <TableHead className="pr-8 font-bold text-slate-400 uppercase text-[11px] tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((comm) => (
                <TableRow key={comm.id} className="hover:bg-slate-50/50 transition-all border-b border-gray-50 last:border-0 group h-20">
                  <TableCell className="pl-8">
                    <button className="text-blue-600 font-bold text-sm tracking-tight hover:underline">
                      #{comm.id.startsWith('#') ? comm.id.slice(1) : comm.id}
                    </button>
                  </TableCell>
                  <TableCell className="font-bold text-slate-800 text-[15px]">{comm.commissionNumber}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{comm.state}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{comm.issueDate}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{comm.expiryDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`border-none px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          comm.status === 'Valid' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : comm.status === 'Expired'
                          ? 'bg-rose-100 text-rose-600'
                          : comm.status === 'Not eligible'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      {comm.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-none">
                        <Eye size={18} />
                      </Button>
                      <Button 
                        onClick={() => {
                          setEditingCommission(comm);
                          setIsFormOpen(true);
                        }}
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all shadow-none"
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button 
                         onClick={() => handleDelete(comm.id)}
                         variant="ghost" 
                         size="icon" 
                         className="h-10 w-10 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-none"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                    <Search size={40} className="opacity-20" />
                    <p className="font-medium italic">No commission records found matching your filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Container */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-12 mt-4 px-2">
        <p className="text-[13px] text-slate-400 font-medium">
          Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredCommissions.length)}</span> of <span className="text-slate-900 font-bold">{filteredCommissions.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
           <Button 
             variant="outline" 
             size="icon" 
             disabled={currentPage === 1}
             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
             className="h-10 w-10 rounded-xl border-gray-100 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all"
           >
             <ChevronLeft size={18} />
           </Button>
           
           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
             <Button
               key={page}
               onClick={() => setCurrentPage(page)}
               className={`h-10 w-10 rounded-xl font-bold transition-all ${
                 currentPage === page 
                 ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700" 
                 : "bg-white border border-gray-100 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
               }`}
             >
               {page}
             </Button>
           ))}

           <Button 
             variant="outline" 
             size="icon" 
             disabled={currentPage === totalPages || totalPages === 0}
             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
             className="h-10 w-10 rounded-xl border-gray-100 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all"
           >
             <ChevronRight size={18} />
           </Button>
        </div>
      </div>

      <CommissionForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingCommission}
        onSubmit={handleFormSubmit}
        isSubmitting={addMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};
