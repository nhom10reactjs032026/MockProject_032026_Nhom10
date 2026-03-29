import { useActs } from '../hooks/useActs';
import { ActFilters } from '../components/list/ActFilters';
import { ActListHeader } from '../components/list/ActListHeader';
import { ActTable } from '../components/list/ActTable';
import { ActStats } from '../components/list/ActStats';

export const ActListPage = () => {
  const { data: acts = [], isLoading, filters, setFilters } = useActs();

  return (
    <div className="animate-in fade-in duration-500 bg-[#f8fbff]/30 min-h-screen">
      <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ActListHeader />
        <ActFilters filters={filters} setFilters={setFilters} />
        <ActTable acts={acts} isLoading={isLoading} />
        
        {/* Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>Showing 1 to {acts.length} of {acts.length} entries</p>
          <div className="flex gap-2">
             <button className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 flex items-center transition-colors">&lt;</button>
             <button className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-sm font-medium">1</button>
             <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">2</button>
             <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">3</button>
             <span className="px-2 py-1 flex items-end text-gray-400">...</span>
             <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">142</button>
             <button className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">&gt;</button>
          </div>
        </div>

        <ActStats />
      </div>
    </div>
  );
};
