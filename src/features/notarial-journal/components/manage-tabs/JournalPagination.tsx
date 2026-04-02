import { ChevronLeft, ChevronRight } from "lucide-react";

interface JournalPaginationProps {
  startIndex: number;
  endIndex: number;
  total: number;
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  pageButtons: Array<number | "ellipsis">;
  goToPage: (page: number) => void;
}

export const JournalPagination = ({
  startIndex,
  endIndex,
  total,
  currentPage,
  totalPages,
  isFetching,
  pageButtons,
  goToPage,
}: JournalPaginationProps) => {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground font-medium text-center sm:text-left">
        Showing {startIndex} to {endIndex} of {total.toLocaleString()} entries
      </span>
      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1 || isFetching}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pageButtons.map((p, idx) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground font-bold text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              className={
                p === currentPage
                  ? "w-8 h-8 flex items-center justify-center bg-[#c4a484] text-white font-bold text-sm rounded-md"
                  : "w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-md transition-colors"
              }
              onClick={() => goToPage(p)}
              disabled={isFetching}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          )
        )}
        <button
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages || isFetching}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
