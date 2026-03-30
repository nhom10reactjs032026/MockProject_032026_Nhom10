import { useState, useCallback } from 'react';
import { useNotaries } from '../hooks/useNotaries';
import { NotaryFilters } from '../components/list/NotaryFilters';
import { NotaryListHeader } from '../components/list/NotaryListHeader';
import { NotaryTable } from '../components/list/NotaryTable';
import { NotaryPagination } from '../components/list/NotaryPagination';
import type { NotaryFilters as NotaryFiltersType } from '../types/notary.types';

export const NotaryManagementPage = () => {
  const [filters, setFilters] = useState<NotaryFiltersType>({
    status: 'all',
    state: 'all',
    serviceType: 'all',
    search: '',
  });
  const [page, setPage] = useState(1);

  const { data: result, isLoading } = useNotaries(filters, page);

  const handleFilterChange = useCallback((key: keyof NotaryFiltersType, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
      <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-transparent min-h-screen">
        <NotaryListHeader />
        
        <NotaryFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <NotaryTable 
          notaries={result?.data || []} 
          isLoading={isLoading} 
        />
        
        {result && result.total > 0 && (
          <NotaryPagination
            currentPage={page}
            totalEntries={result.total}
            pageSize={result.pageSize}
            totalPages={result.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
