import { useQuery } from '@tanstack/react-query';
import { getNotariesList } from '../api/notary.service';

export const useNotaries = () => {
  return useQuery({
    queryKey: ['notaries'],
    queryFn: getNotariesList,
  });
};
