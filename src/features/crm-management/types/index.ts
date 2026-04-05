/**
 * Customer base interface representing core business entities
 */
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

/**
 * Defines a primary or secondary contact person for a customer
 */
export type Contact = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
  notificationPreferences?: boolean;
};

/**
 * Defines timeline/milestone tracking items for a profile
 */
export type Activity = {
  id: string;
  title: string;
  description: string;
  date: string;
  type?: "contract" | "support" | "review";
  isRecent?: boolean;
};

/**
 * Metric representation for the Top Clients dashboard widget
 */
export type TopClientData = {
  name: string;
  value: string;
  iconType: "bank" | "law" | "building";
};

/**
 * Structure for urgent overdue invoice tracking
 */
export type OverdueInvoice = {
  client: string;
  amount: string;
  status: string;
};

/**
 * Structure for contract renewal tracking
 */
export type ContractExpiring = {
  contract: string;
  expiration: string;
};

/**
 * Extended profile details specifically used on the Customer Detail page
 */
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

/**
 * Aggregated global data required for the main dashboard display
 */
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

/**
 * Application-wide broadcasting message structure
 */
export interface HolidayAnnouncement {
  title: string;
  dateRange: string;
  content: string;
  status: "upcoming" | "active";
}
