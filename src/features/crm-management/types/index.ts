export type Customer = {
  id: string;
  name: string;
  type: "B2B" | "B2C";
  industry: string;
  status: "Active" | "Inactive";
  primaryContact: string;
  primaryEmail: string;
  primaryPhone: string;
  jobs: number;
  revenue: number;
  tags?: string[];
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
  notificationPreferences?: boolean;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  date: string;
  type?: "contract" | "support" | "review";
  isRecent?: boolean;
};

export type TopClientData = {
  name: string;
  value: string;
  iconType: "bank" | "law" | "building";
};

export type OverdueInvoice = {
  client: string;
  amount: string;
  status: string;
};

export type ContractExpiring = {
  contract: string;
  expiration: string;
};

export type CustomerProfileDetail = {
  name: string;
  status: string;
  type: string;
  volume: string;
  address: string;
  industry: string;
  taxId: string;
  contactInitials: string;
  contactName: string;
  contactRole: string;
  annualJobs: number;
  annualRevenue: string;
  avgTurnaround: number;
};

export interface DashboardMetrics {
  totalCustomers: number;
  totalRevenue: number;
  jobsByCustomers: number;
  b2bRevenue: number;
  b2cRevenue: number;
  customers: {
    b2b: number;
    b2c: number;
  };
  jobs: {
    b2b: number;
    b2c: number;
  };
}

export interface HolidayAnnouncement {
  title: string;
  dateRange: string;
  content: string;
  status: "upcoming" | "active";
}
