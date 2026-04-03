import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NotaryPaginationProps {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const NotaryPagination = ({
  currentPage,
  totalEntries,
  pageSize,
  totalPages,
  onPageChange,
}: NotaryPaginationProps) => {
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-500 pb-20 animate-in fade-in duration-1000">
      <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm group">
        <p className="font-medium tracking-tight text-slate-400">
          Showing <span className="text-slate-900 font-black"> {startEntry.toLocaleString()} </span> to 
          <span className="text-slate-900 font-black"> {endEntry.toLocaleString()} </span> 
          of <span className="text-blue-600 font-black"> {totalEntries.toLocaleString()} </span> entries
        </p>
      </div>

      <div className="flex gap-2 items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl shadow-none"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={18} />
        </Button>

        <div className="flex items-center gap-1.5 mx-2">
          {getPages().map((page, index) => (
            <Button
              key={index}
              className={`h-10 min-w-[40px] px-3 font-bold transition-all rounded-xl shadow-none ${
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700'
                  : 'bg-transparent border-none text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              } ${page === '...' ? 'cursor-default pointer-events-none' : ''}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl shadow-none"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};
