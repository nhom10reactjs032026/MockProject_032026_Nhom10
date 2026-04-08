import { useState, useCallback } from "react";
import { useNotaries, useDeleteNotary } from "../hooks/useNotaries";
import Papa from "papaparse";
import { NotaryFilters } from "../components/list/NotaryFilters";
import { NotaryListHeader } from "../components/list/NotaryListHeader";
import { NotaryTable } from "../components/list/NotaryTable";
import { NotaryPagination } from "../components/list/NotaryPagination";
import type { NotaryFilters as NotaryFiltersType } from "../types/notary.types";
import { toast } from "sonner";
export const NotaryManagementPage = () => {
  const [filters, setFilters] = useState<NotaryFiltersType>({
    status: "all",
    state: "all",
    serviceType: "all",
    search: "",
  });
  const [page, setPage] = useState(1);

  const { data: result, isLoading } = useNotaries(filters, page);
  const deleteMutation = useDeleteNotary();

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Notary deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notary");
    }
  }, [deleteMutation]);

  const handleFilterChange = useCallback(
    (key: keyof NotaryFiltersType, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1); // Reset to first page on filter change
    },
    [],
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);
  
  const handleExport = useCallback(() => {
    if (!result?.data || result.data.length === 0) {
      toast.error("No data available to export");
      return;
    }

    try {
      // Prepare data for export
      const exportData = result.data.map(n => ({
        ID: n.id,
        Name: n.name,
        Email: n.email,
        Phone: n.phone,
        Capability: n.capability,
        State: n.state,
        "Expiry Date": n.expiryDate,
        Branch: n.branch,
        Status: n.status
      }));

      const csv = Papa.unparse(exportData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `notary_registry_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Data exported successfully");
    } catch (error) {
      toast.error("Failed to export data");
    }
  }, [result]);

  return (
    <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
      <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-transparent min-h-screen">
        <NotaryListHeader onExport={handleExport} />

        <NotaryFilters filters={filters} onFilterChange={handleFilterChange} />

        <NotaryTable 
          notaries={result?.data || []} 
          isLoading={isLoading} 
          onDelete={handleDelete}
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
