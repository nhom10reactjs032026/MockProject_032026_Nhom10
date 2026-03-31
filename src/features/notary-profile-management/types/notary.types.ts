export type NotaryStatus = 'Active' | 'Expired' | 'Deactive';
export type CommissionStatus = 'Valid' | 'Not eligible' | 'Expired' | 'Pending';

export interface Commission {
  id: string;
  commissionNumber: string;
  state: string;
  issueDate: string;
  expiryDate: string;
  status: CommissionStatus;
}

export interface Notary {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  name: string; // Combined for convenience in list
  email: string;
  phone: string;
  capability: string;
  state: string;
  expiryDate: string;
  branch: string;
  status: NotaryStatus;
  commissionNumber?: string;
  addressLine1?: string;
  city?: string;
  zipCode?: string;
  languages?: string;
  rating?: number;
  totalReviews?: number;
  dob?: string;
  commissionStatus?: string;
  bondStatus?: string;
  insuranceStatus?: string;
  insuranceExpiry?: string;
  commissions?: Commission[];
}

export type NotaryFilters = {
  status?: string;
  state?: string;
  serviceType?: string;
  search?: string;
};

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
