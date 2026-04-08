import { Button } from '@/components/ui/button';
import { Plus, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface NotaryListHeaderProps {
  onExport: () => void;
}

export const NotaryListHeader = ({ onExport }: NotaryListHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-1">Notary Profile Registry</h1>
        <div className="flex items-center gap-2 text-slate-400 font-medium">
           <Search size={14} className="text-blue-500" />
           <p className="text-[11px] uppercase tracking-[0.2em] font-black">Authorized Personnel Database</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-100 flex items-center gap-3 h-12 px-6 rounded-[1.25rem] font-bold shadow-sm transition-all active:scale-95 group"
            >
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              Export Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-[2rem] border-0 shadow-2xl bg-white/95 backdrop-blur-xl max-w-md">
            <AlertDialogHeader className="space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center mb-2 mx-auto sm:mx-0">
                <Download size={32} className="text-blue-600" />
              </div>
              <AlertDialogTitle className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Confirm Data Export
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium leading-relaxed">
                You are about to export the current Notary Registry list to a <span className="text-blue-600 font-bold">CSV file</span>. This file will include all filtered results.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
              <AlertDialogCancel className="rounded-xl border-slate-100 text-slate-400 font-bold h-12 px-6 hover:bg-slate-50 hover:text-slate-600 transition-all">
                Maybe later
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onExport}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold h-12 px-6 shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                Start Export
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button 
          onClick={() => navigate('/admin/notaries/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3 h-12 px-8 rounded-[1.25rem] font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          Create New Notary
        </Button>
      </div>
    </div>
  );
};
