import { create } from 'zustand';
import type { Job, JobStatus } from '../types/scheduling.types';

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  filters: {
    status?: JobStatus;
    search?: string;
    page: number;
    limit: number;
  };
  total: number;
  isLoading: boolean;
  error: string | null;
  
  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setFilters: (filters: Partial<JobState['filters']>) => void;
  setTotal: (total: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  jobs: [],
  selectedJob: null,
  filters: {
    page: 1,
    limit: 10,
  },
  total: 0,
  isLoading: false,
  error: null,
};

export const useJobStore = create<JobState>((set) => ({
  ...initialState,

  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setTotal: (total) => set({ total }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));