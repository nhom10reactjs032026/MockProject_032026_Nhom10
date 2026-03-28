import { useNotaries } from '../hooks/useNotaries';
import { NotaryFilters } from '../components/list/NotaryFilters';
import { NotaryListHeader } from '../components/list/NotaryListHeader';
import { NotaryTable } from '../components/list/NotaryTable';

export const NotaryManagementPage = () => {
  const { data: notaries = [], isLoading } = useNotaries();

  return (
    <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
      <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-transparent min-h-screen">
        <NotaryListHeader />
        <NotaryFilters />
        <NotaryTable notaries={notaries} isLoading={isLoading} />
        
        {/* Pagination Footer Mockup */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 pb-10">
          <p>Showing 1 to 5 of 1,248 entries</p>
          <div className="flex gap-2">
             <button className="px-3 py-1 border rounded hover:bg-[#f8f8f8] flex items-center">&lt;</button>
             <button className="px-3 py-1 bg-[#c4a484] text-white rounded font-bold">1</button>
             <button className="px-3 py-1 border rounded hover:bg-[#f8f8f8]">2</button>
             <button className="px-3 py-1 border rounded hover:bg-[#f8f8f8]">3</button>
             <span className="px-1 text-gray-300">...</span>
             <button className="px-3 py-1 border rounded hover:bg-[#f8f8f8]">250</button>
             <button className="px-3 py-1 border rounded hover:bg-[#f8f8f8] cursor-pointer">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};
