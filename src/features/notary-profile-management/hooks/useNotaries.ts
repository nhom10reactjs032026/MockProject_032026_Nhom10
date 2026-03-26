import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getNotariesList, 
  getNotaryDetail, 
  updateNotary,
  addCommission,
  updateCommission,
  deleteCommission
} from '../api/notary.service';
import type { Notary, NotaryFilters, Commission } from '../types/notary.types';

export const useNotaries = (filters?: NotaryFilters, page = 1) => {
  return useQuery({
    queryKey: ['notaries', filters, page],
    queryFn: () => getNotariesList(filters, page),
  });
};

export const useNotaryDetail = (id: string) => {
  return useQuery({
    queryKey: ['notary-detail', id],
    queryFn: () => getNotaryDetail(id),
    enabled: !!id,
  });
};

export const useUpdateNotary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Notary> }) => 
      updateNotary(id, data),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific detail query
      queryClient.invalidateQueries({ queryKey: ['notaries'] });
      queryClient.invalidateQueries({ queryKey: ['notary-detail', variables.id] });
    },
  });
};

export const useAddCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notaryId, data }: { notaryId: string; data: Omit<Commission, 'id' | 'status'> }) => 
      addCommission(notaryId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notary-detail', variables.notaryId] });
    },
  });
};

export const useUpdateCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notaryId, commissionId, data }: { notaryId: string; commissionId: string; data: Partial<Commission> }) => 
      updateCommission(notaryId, commissionId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notary-detail', variables.notaryId] });
    },
  });
};

export const useDeleteCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notaryId, commissionId }: { notaryId: string; commissionId: string }) => 
      deleteCommission(notaryId, commissionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notary-detail', variables.notaryId] });
    },
  });
};
