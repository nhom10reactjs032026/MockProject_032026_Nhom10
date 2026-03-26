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
  const startEntry = (currentPage - 1) * pageSize + 1;
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
    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 pb-10">
      <p>
        Showing {startEntry} to {endEntry} of {totalEntries.toLocaleString()} entries
      </p>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-gray-100 hover:bg-gray-50 text-slate-400"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </Button>

        {getPages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? 'default' : 'outline'}
            className={`h-9 min-w-[36px] px-2 ${
              page === currentPage
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-none'
                : 'border-gray-100 hover:bg-gray-50 text-slate-600'
            } ${page === '...' ? 'cursor-default pointer-events-none border-none' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-gray-100 hover:bg-gray-50 text-slate-400"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
