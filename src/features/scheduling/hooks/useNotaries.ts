// features/scheduling/hooks/useNotaries.ts
import { useQuery } from '@tanstack/react-query';
import { notaryService } from '../services/notaryService';
import type { Notary } from '../types/scheduling.types';

export const notaryKeys = {
  all: ['notaries'] as const,
  lists: () => [...notaryKeys.all, 'list'] as const,
  list: (filters?: { serviceType?: string; state?: string; available?: boolean }) => 
    [...notaryKeys.lists(), filters] as const,
  details: () => [...notaryKeys.all, 'detail'] as const,
  detail: (id: string) => [...notaryKeys.details(), id] as const,
};

export const useNotaries = (filters?: { 
  serviceType?: string; 
  state?: string; 
  available?: boolean 
}) => {
  return useQuery({
    queryKey: notaryKeys.list(filters),
    queryFn: () => notaryService.getNotaries(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
    // Chỉ fetch khi có filters (tránh fetch không cần thiết)
    enabled: true,
  });
};

export const useNotaryDetail = (id: string) => {
  return useQuery({
    queryKey: notaryKeys.detail(id),
    queryFn: () => notaryService.getNotaryById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};