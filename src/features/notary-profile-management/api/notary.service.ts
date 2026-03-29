import type { Notary, NotaryFilters, PaginatedResult, Commission } from '../types/notary.types';
import { MOCK_NOTARIES } from './notary.mock';

export const getNotariesList = async (
  filters?: NotaryFilters,
  page = 1,
  pageSize = 5
): Promise<PaginatedResult<Notary>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredData = [...MOCK_NOTARIES];

  // Search logic (Name, Email, Phone)
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.email?.toLowerCase().includes(searchLower) ||
        item.phone?.includes(searchLower)
    );
  }

  // Filter by Status
  if (filters?.status && filters.status !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.status.toLowerCase() === filters.status?.toLowerCase()
    );
  }

  // Filter by State
  if (filters?.state && filters.state !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.state.toLowerCase() === filters.state?.toLowerCase()
    );
  }

  // Filter by Service Type (Capability)
  if (filters?.serviceType && filters.serviceType !== 'all') {
    filteredData = filteredData.filter((item) =>
      item.capability.toLowerCase().includes(filters.serviceType!.toLowerCase())
    );
  }

  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = filteredData.slice(start, end);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
  };
};

export const getNotaryDetail = async (id: string): Promise<Notary | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_NOTARIES.find((item) => item.id === id);
};

export const updateNotary = async (id: string, data: Partial<Notary>): Promise<Notary> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const index = MOCK_NOTARIES.findIndex(n => n.id === id);
  if (index === -1) throw new Error('Notary not found');
  
  const updatedNotary = { ...MOCK_NOTARIES[index], ...data };
  MOCK_NOTARIES[index] = updatedNotary;
  
  return updatedNotary;
};

export const addCommission = async (notaryId: string, commission: Omit<Commission, 'id' | 'status'>): Promise<Commission> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const notary = MOCK_NOTARIES.find(n => n.id === notaryId);
  if (!notary) throw new Error('Notary not found');

  const newCommission: Commission = {
    ...commission,
    id: `#${Math.floor(Math.random() * 10000)}`,
    status: new Date(commission.expiryDate) > new Date() ? 'Valid' : 'Expired'
  };

  notary.commissions = [newCommission, ...(notary.commissions || [])];
  return newCommission;
};

export const updateCommission = async (notaryId: string, commissionId: string, data: Partial<Commission>): Promise<Commission> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const notary = MOCK_NOTARIES.find(n => n.id === notaryId);
  if (!notary || !notary.commissions) throw new Error('Notary or commissions not found');

  const index = notary.commissions.findIndex(c => c.id === commissionId);
  if (index === -1) throw new Error('Commission not found');

  const updated = { ...notary.commissions[index], ...data };
  notary.commissions[index] = updated;
  return updated;
};

export const deleteCommission = async (notaryId: string, commissionId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const notary = MOCK_NOTARIES.find(n => n.id === notaryId);
  if (!notary || !notary.commissions) throw new Error('Notary or commissions not found');

  notary.commissions = notary.commissions.filter(c => c.id !== commissionId);
};
