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
    const cleanSearch = filters.search.replace(/\D/g, ''); // For phone number matching

    filteredData = filteredData.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchLower);
      const emailMatch = item.email?.toLowerCase().includes(searchLower);
      
      // Normalize both phone numbers for robust matching (FUNC_08)
      const cleanPhone = item.phone?.replace(/\D/g, '') || '';
      const phoneMatch = cleanPhone.includes(cleanSearch) || (item.phone?.includes(filters.search!) ?? false);

      return nameMatch || emailMatch || (cleanSearch.length > 0 && phoneMatch);
    });
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

  // Sorting ascending by Notary ID column (GUI_07)
  filteredData.sort((a, b) => a.id.localeCompare(b.id));

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

export const createNotary = async (data: Omit<Notary, 'id' | 'status'>): Promise<Notary> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Check for duplicate email (FUNC_05)
  const existing = MOCK_NOTARIES.find(n => n.email.toLowerCase() === data.email.toLowerCase());
  if (existing) {
    const error = new Error('This email is already in use');
    (error as any).field = 'email';
    throw error;
  }

  const newNotary: Notary = {
    ...data,
    id: `NT-${String(MOCK_NOTARIES.length + 1).padStart(3, '0')}`, // Unique ID generation
    status: 'Active', // Default status for new notary
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`,
    capability: data.capability || 'Mobile Notary',
  };
  
  MOCK_NOTARIES.unshift(newNotary); // Add to beginning for list display
  return newNotary;
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

  // Check for duplicate email (FUNC_05)
  if (data.email) {
    const existing = MOCK_NOTARIES.find(n => n.email.toLowerCase() === data.email?.toLowerCase() && n.id !== id);
    if (existing) {
      const error = new Error('This email is already in use.');
      (error as any).field = 'email';
      throw error;
    }
  }
  
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

  if (!notary.commissions) notary.commissions = [];
  notary.commissions = [newCommission, ...notary.commissions];
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
