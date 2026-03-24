import type { Notary } from '../types/notary.types';
import { MOCK_NOTARIES } from './notary.mock';

export const getNotariesList = async (): Promise<Notary[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_NOTARIES;
};
