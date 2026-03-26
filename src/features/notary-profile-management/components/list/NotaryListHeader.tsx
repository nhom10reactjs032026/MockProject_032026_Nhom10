import { Button } from '@/components/ui/button';
import { Plus, Flag } from 'lucide-react';

export const NotaryListHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notary Profile List</h1>
      <div className="flex items-center gap-3">
        <Button className="bg-[#c4a484] hover:bg-[#b09376] text-white flex items-center gap-2 h-10 px-5 rounded-sm font-bold tracking-wide uppercase text-xs">
          <Plus size={16} />
          Create Notary
        </Button>
        <Button variant="outline" className="text-[#c4a484] border-[#c4a484] hover:bg-[#fdf6ef] hover:text-[#c4a484] flex items-center gap-2 h-10 px-5 rounded-sm font-bold tracking-wide uppercase text-xs">
          <Flag size={16} />
          Export
        </Button>
      </div>
    </div>
  );
};
