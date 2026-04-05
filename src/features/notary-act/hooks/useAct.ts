import { useState, useEffect } from 'react';
import type { Act } from '../types/act.types';
import { mockActs } from '../api/mockData';

export const useAct = (id: string | undefined) => {
  const [act, setAct] = useState<Act | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    // Simulate network delay
    const timer = setTimeout(() => {
      const foundAct = mockActs.find(a => a.id === id) || mockActs[0];
      setAct(foundAct);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  return { act, isLoading };
};
