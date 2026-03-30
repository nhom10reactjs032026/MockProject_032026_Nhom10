export type JobStatus = 'COMPLETED' | 'IN-PROGRESS' | 'PENDING' | 'FAILED' | 'CANCELLED';

export interface AssignedNotary {
  name: string;
  avatarUrl?: string;
  initials: string;
}

export interface Job {
  id: string;
  serviceType: {
    main: string;
    sub: string;
  };
  date: string;
  notaryId: string;
  assignedNotary: AssignedNotary;
  status: JobStatus;
}

export interface CrmStats {
  onTimeRate: number;
  canceledRate: number;
}

// --- Billing Types ---
export type InvoiceStatus = 'Paid' | 'Overdue' | 'Unpaid';

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

export type PaymentMethodType = 'Visa' | 'ApplePay';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  lastFour: string;
  isDefault?: boolean;
}

// --- Communication Log Types ---
export type LogType = 'Meeting' | 'Email' | 'Urgent' | 'Call';

export interface LogEntry {
  id: string;
  time: string;
  type: LogType;
  summary: string;
  by: string;
}
