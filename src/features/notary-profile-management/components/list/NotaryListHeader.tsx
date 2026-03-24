import { Button } from '@/components/ui/button';
import { Plus, Flag } from 'lucide-react';

export const NotaryListHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notary Profile List</h1>
      <div className="flex items-center gap-3">
        <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-100 flex items-center gap-2 h-10 px-5">
          <Plus size={18} />
          Create Notary
        </Button>
        <Button variant="destructive" className="bg-rose-500 hover:bg-rose-600 flex items-center gap-2 h-10 px-5 shadow-md shadow-rose-100">
          <Flag size={18} />
          Export
        </Button>
      </div>
    </div>
  );
};
