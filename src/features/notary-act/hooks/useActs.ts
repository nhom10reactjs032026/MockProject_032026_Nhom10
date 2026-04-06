import { useState, useMemo } from 'react';
import type { Act, ActFilters } from '../types/act.types';
import { mockActs } from '../api/mockData';

export const useActs = () => {
  const [filters, setFilters] = useState<ActFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would use react-query or similar to fetch from an API
  // For now, we'll just filter our mock data synchronously
  const data = useMemo(() => {
    let result = [...mockActs];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(act =>
        act.actId.toLowerCase().includes(q) ||
        act.clientName.toLowerCase().includes(q) ||
        act.clientType.toLowerCase().includes(q)
      );
    }
    if (filters.type) {
      result = result.filter(act => act.type === filters.type);
    }
    if (filters.status) {
      result = result.filter(act => act.status === filters.status);
    }
    if (filters.state) {
      result = result.filter(act => act.state === filters.state);
    }
    if (filters.risk) {
      result = result.filter(act => act.risk === filters.risk);
    }

    return result;
  }, [filters]);

  return {
    data,
    isLoading,
    filters,
    setFilters
  };
};
