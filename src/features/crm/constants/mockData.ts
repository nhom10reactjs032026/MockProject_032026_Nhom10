import type { Job, JobStatus, Invoice, PaymentMethod, LogEntry } from '../types';

export const MOCK_JOBS: Job[] = [
  {
    id: '01',
    serviceType: {
      main: 'RON Closing',
      sub: 'Remote Online Notarization',
    },
    date: 'Oct 24, 2023',
    notaryId: 'NOT-8829-X',
    assignedNotary: {
      name: 'Jane Doe',
      initials: 'JD',
    },
    status: 'COMPLETED' as JobStatus,
  },
  {
    id: '02',
    serviceType: {
      main: 'Mobile Notary',
      sub: 'In-person signing',
    },
    date: 'Oct 25, 2023',
    notaryId: 'NOT-1102-A',
    assignedNotary: {
      name: 'Mark Smith',
      initials: 'MS',
    },
    status: 'IN-PROGRESS' as JobStatus,
  },
  {
    id: '03',
    serviceType: {
      main: 'Escrow Signing',
      sub: 'Residential Purchase',
    },
    date: 'Oct 26, 2023',
    notaryId: 'NOT-4552-Y',
    assignedNotary: {
      name: 'Robert White',
      initials: 'RW',
    },
    status: 'PENDING' as JobStatus,
  },
  {
    id: '04',
    serviceType: {
      main: 'Refinance Pack',
      sub: 'Lender Documents',
    },
    date: 'Oct 26, 2023',
    notaryId: 'NOT-0021-B',
    assignedNotary: {
      name: 'Alice Lee',
      initials: 'AL',
    },
    status: 'FAILED' as JobStatus,
  },
  {
    id: '05',
    serviceType: {
      main: 'Deed of Trust',
      sub: 'Legal Services',
    },
    date: 'Oct 27, 2023',
    notaryId: 'NOT-9932-C',
    assignedNotary: {
      name: 'Tom Klein',
      initials: 'TK',
    },
    status: 'CANCELLED' as JobStatus,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: '#INV-8829',
    date: 'Sep 28, 2023',
    amount: '$1,250.00',
    status: 'Paid',
  },
  {
    id: '#INV-8824',
    date: 'Sep 15, 2023',
    amount: '$3,200.00',
    status: 'Overdue',
  },
  {
    id: '#INV-8812',
    date: 'Aug 28, 2023',
    amount: '$4,500.00',
    status: 'Unpaid',
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'Visa',
    lastFour: '4482',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'ApplePay',
    lastFour: '1234',
  },
];

export const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    time: 'Oct 24, 2023',
    type: 'Meeting',
    summary: 'Discussed annual investment strategy and tax planning optimization for the fiscal year.',
    by: 'System',
  },
  {
    id: '2',
    time: 'Oct 24, 2023',
    type: 'Email',
    summary: "Follow-up on documentation requirements for Notary A's certification process.",
    by: 'Notary A',
  },
  {
    id: '3',
    time: 'Oct 24, 2023',
    type: 'Urgent',
    summary: 'Client reported issue with account access. Resolved via phone call session.',
    by: 'Admin',
  },
  {
    id: '4',
    time: 'Oct 24, 2023',
    type: 'Call',
    summary: 'Initial discovery call regarding new property acquisition project.',
    by: 'System',
  },
];

export const TABS = [
  'Profile',
  'Contacts',
  'Jobs & Service History',
  'Pricing & Contracts',
  'Billing & Invoices',
  'Communication Log',
  'Notes & Documents',
];
