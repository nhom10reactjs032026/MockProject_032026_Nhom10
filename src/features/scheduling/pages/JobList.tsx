import React from "react";
import { useJobs } from "../hooks/useJobs";
import { useJobStore } from "../store/useJobStore";
import { useUIStore } from "../store/useUIStore";
import type { Job, JobStatus } from "../types/scheduling.types";
import { JobFilter } from "../components/jobList/JobFilter";
import { JobStats } from "../components/jobList/JobStats";
import { JobTable } from "../components/jobList/JobTable";
import { JobMobileCard } from "../components/jobList/JobMobileCard";
import { Pagination } from "../components/jobList/Pagination";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface JobListProps {
  onViewJob?: (job: Job) => void;
  onAssignJob?: (job: Job) => void;
}

// Filter options
const FILTERS = [
  { label: "Client", options: ["Acme Corp", "TechStart LLC", "Global Finance Inc"] },
  { label: "Service", options: ["Mobile", "RON", "Loan signing"] },
  { label: "State", options: ["Texas", "California", "Florida", "New York"] },
  { label: "Status", options: ["NEW", "PENDING", "IN_PROGRESS", "COMPLETED"] },
  { label: "Date", options: ["Today", "Tomorrow", "This Week", "Next Week"] },
];

// Stats data
const STATS = [
  { label: "Unassigned Jobs", value: "12", subText: "4 requiring immediate action" },
  { label: "Pending Acceptance", value: "08", subText: "Awaiting notary confirmation" },
  { label: "Avg. Fulfillment", value: "42m", subText: "From request to assignment" },
];

export const JobList: React.FC<JobListProps> = ({ onViewJob, onAssignJob }) => {
  // ✅ Lấy state và actions từ Zustand store
  const { 
    jobs, 
    filters, 
    total, 
    isLoading, 
    error,
    setFilters,
  } = useJobStore();
  
  const { showToast } = useUIStore();
  
  // ✅ Gọi React Query hook để fetch data
  const { refetch, isFetching } = useJobs();

  // ✅ Theo dõi loading state
  const isPageLoading = isLoading || isFetching;

  // ✅ Handle filter change
  const handleFilterChange = (filterName: string, value: string) => {
    const filterKey = filterName.toLowerCase();
    setFilters({ 
      [filterKey]: value === "all" ? undefined : value,
      page: 1 
    });
  };

  const handleApplyFilters = () => {
    refetch();
    showToast("Filters applied", "info");
  };

  // ✅ Handle page change
  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  // ✅ Show loading state
  if (isPageLoading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // ✅ Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#c4a484] text-white rounded-lg hover:bg-[#b89474]"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Calculate pagination
  const totalPages = Math.ceil(total / filters.limit);
  const currentPage = filters.page || 1;

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <JobFilter 
        filters={FILTERS}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Stats */}
      <JobStats stats={STATS} />

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-3">
        {jobs.map((job) => (
          <JobMobileCard
            key={job.id}
            job={job}
            onView={onViewJob}
            onAssign={onAssignJob}
          />
        ))}
      </div>

      {/* Desktop Table */}
      <JobTable 
        jobs={jobs}
        onViewJob={onViewJob}
        onAssignJob={onAssignJob}
      />

      {/* Pagination */}
      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={total}
          itemsPerPage={filters.limit}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {total === 0 && !isPageLoading && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#ebebeb]">
          <p className="text-gray-400">No jobs found matching your filters</p>
        </div>
      )}
    </div>
  );
};