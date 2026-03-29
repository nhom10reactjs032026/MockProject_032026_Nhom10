import React, { useState, useMemo } from "react";
import { mockJobs } from "../data/mockData";
import type { Job } from "../types/scheduling.types";
import { JobFilter } from "../components/jobList/JobFilter"; 
import { JobStats } from "../components/jobList/JobStats";
import { JobTable } from  "../components/jobList/JobTable";
import { JobMobileCard } from "../components/jobList/JobMobileCard";
import { Pagination } from  "../components/jobList/Pagination";

interface JobListProps {
  onViewJob?: (job: Job) => void;
  onAssignJob?: (job: Job) => void;
}

const ITEMS_PER_PAGE = 8;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter jobs
  const filteredJobs = useMemo(() => {
    let result = [...mockJobs];
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        switch (key) {
          case "Client":
            result = result.filter(job => job.customerName === value);
            break;
          case "Service":
            result = result.filter(job => job.serviceType === value);
            break;
          case "State":
            result = result.filter(job => job.state === value);
            break;
          case "Status":
            result = result.filter(job => job.status === value);
            break;
        }
      }
    });
    
    return result;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    // Filters already applied via useMemo
    console.log("Filters applied:", filters);
  };

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
        {paginatedJobs.map((job) => (
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
        jobs={paginatedJobs}
        onViewJob={onViewJob}
        onAssignJob={onAssignJob}
      />

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredJobs.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#ebebeb]">
          <p className="text-gray-400">No jobs found matching your filters</p>
        </div>
      )}
    </div>
  );
};