import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/jobService';
import { useJobStore } from '../store/useJobStore';
import { useUIStore } from '../store/useUIStore';
import type { CreateJobForm } from '../types/scheduling.types';

export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: any) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
};

export const useJobs = () => {
  const { filters, setJobs, setTotal, setLoading, setError } = useJobStore();
  
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: async () => {
      setLoading(true);
      try {
        const { data, total } = await jobService.getJobs({
          status: filters.status,
          search: filters.search,
          page: filters.page,
          limit: filters.limit,
        });
        setJobs(data);
        setTotal(total);
        return { data, total };
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { showToast } = useUIStore();
  
  return useMutation({
    mutationFn: (data: CreateJobForm) => jobService.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      showToast('Job created successfully!', 'success');
    },
    onError: (error: any) => {
      showToast(error.message || 'Failed to create job', 'error');
    },
  });
};

export const useAssignNotary = () => {
  const queryClient = useQueryClient();
  const { showToast } = useUIStore();
  
  return useMutation({
    mutationFn: ({ jobId, notaryId }: { jobId: string; notaryId: string }) =>
      jobService.assignNotary(jobId, notaryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.jobId) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      showToast('Notary assigned successfully!', 'success');
    },
    onError: (error: any) => {
      showToast(error.message || 'Failed to assign notary', 'error');
    },
  });
};

export const useJobDetail = (id: string) => {
  const { setSelectedJob, setLoading, setError } = useJobStore();
  
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: async () => {
      setLoading(true);
      try {
        const data = await jobService.getJobById(id);
        setSelectedJob(data);
        return data;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};