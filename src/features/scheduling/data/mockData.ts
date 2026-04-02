import type { Job, DispatchJob, Notary } from "../types/scheduling.types";

// Dựa vào bảng jobs trong SQL
export const mockJobs: Job[] = [
  { 
    id: "JOB-001", 
    title: "Loan Signing for Acme Corp",
    customerType: "B2B", 
    customerName: "Acme Corp", 
    serviceType: "Mobile", 
    state: "Texas", 
    date: "2026-03-25", 
    timeStart: "09:00", 
    timeEnd: "11:00", 
    note: "Bring extra forms", 
    status: "NEW", 
    assignedNotary: "James Smith",
    createdBy: 1001,
    createdAt: "2026-03-20T10:00:00Z"
  },
  { 
    id: "JOB-002", 
    title: "RON for Jane Doe",
    customerType: "B2C", 
    customerName: "Jane Doe", 
    serviceType: "RON", 
    state: "California", 
    date: "2026-03-25", 
    timeStart: "13:00", 
    timeEnd: "14:00", 
    status: "PENDING", 
    assignedNotary: "Emily Johnson",
    createdBy: 1002,
    createdAt: "2026-03-21T09:30:00Z"
  },
  { 
    id: "JOB-003", 
    title: "Loan Signing for TechStart LLC",
    customerType: "B2B", 
    customerName: "TechStart LLC", 
    serviceType: "Loan signing", 
    state: "Florida", 
    date: "2026-03-26", 
    timeStart: "10:00", 
    timeEnd: "12:00", 
    note: "Client prefers morning", 
    status: "IN_PROGRESS", 
    assignedNotary: "Michael Williams",
    createdBy: 1003,
    createdAt: "2026-03-22T14:15:00Z"
  },
  { 
    id: "JOB-004", 
    title: "Mobile Notary for Robert Chen",
    customerType: "B2C", 
    customerName: "Robert Chen", 
    serviceType: "Mobile", 
    state: "New York", 
    date: "2026-03-27", 
    timeStart: "14:00", 
    timeEnd: "15:30", 
    status: "COMPLETED", 
    assignedNotary: "Jessica Brown",
    createdBy: 1004,
    createdAt: "2026-03-23T11:20:00Z"
  },
  { 
    id: "JOB-005", 
    title: "RON for Global Finance Inc",
    customerType: "B2B", 
    customerName: "Global Finance Inc", 
    serviceType: "RON", 
    state: "Texas", 
    date: "2026-03-28", 
    timeStart: "11:00", 
    timeEnd: "13:00", 
    status: "NEW",
    createdBy: 1005,
    createdAt: "2026-03-24T08:45:00Z"
  },
];

// Dựa vào bảng states trong SQL
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

// Dựa vào bảng notaries và notary_commissions trong SQL
export const mockDispatchJob: DispatchJob = {
  id: "JOB-003",
  service: "Loan signing",
  client: "TechStart LLC",
  location: "Florida",
  time: "Mar 26, 10:00–12:00am",
  signers: "2 persons",
  type: "Loan Signing",
  note: "Client prefers morning",
};

// Dựa vào bảng notaries trong SQL
export const mockSuitableNotaries: Notary[] = [
  { 
    id: "1", 
    name: "James Smith", 
    fullName: "James Smith",
    email: "j.smith@mail.com",
    phone: "(555) 123-4567",
    status: "ACTIVE",
    commissionNumber: "23456789",
    expirationDate: "2025-01-01",
    rating: 420, 
    distance: "2.4 mi away", 
    services: "RON + Mobile", 
    jobs: 4, 
    available: "Available 9–11am", 
    exp: "Dec 2028", 
    avatarInitials: "JS", 
    avatarColor: "#2563eb", 
    verified: true 
  },
  { 
    id: "2", 
    name: "Emily Johnson", 
    fullName: "Emily Johnson",
    email: "emily.j@mail.com",
    phone: "(555) 234-5678",
    status: "ACTIVE",
    commissionNumber: "87654321",
    expirationDate: "2026-05-10",
    rating: 410, 
    distance: "2.9 mi away", 
    services: "RON + Mobile", 
    jobs: 3, 
    available: "Available 9–11am", 
    exp: "Dec 2028", 
    avatarInitials: "EJ", 
    avatarColor: "#7c3aed", 
    verified: true 
  },
  { 
    id: "3", 
    name: "Michael Williams", 
    fullName: "Michael Williams",
    email: "m.williams@mail.com",
    phone: "(555) 345-6789",
    status: "ACTIVE",
    commissionNumber: "99887766",
    expirationDate: "2023-03-15",
    rating: 390, 
    distance: "2.4 mi away", 
    services: "RON + Mobile", 
    jobs: 2, 
    available: "Available 9–11am", 
    exp: "Dec 2028", 
    avatarInitials: "MW", 
    avatarColor: "#0891b2", 
    verified: true 
  },
  { 
    id: "4", 
    name: "Jessica Brown", 
    fullName: "Jessica Brown",
    email: "jessica.b@mail.com",
    phone: "(555) 456-7890",
    status: "INACTIVE",
    commissionNumber: "GG123456",
    expirationDate: "2027-07-20",
    rating: 360, 
    distance: "2.4 mi away", 
    services: "RON + Mobile", 
    jobs: 1, 
    available: "Available 9–11am", 
    exp: "Dec 2028", 
    avatarInitials: "JB", 
    avatarColor: "#059669", 
    verified: true 
  },
];

// Dựa vào bảng jobs và digital_signatures trong SQL
export const mockJobDetail = {
  id: "JOB-003",
  title: "Loan Signing for TechStart LLC",
  client: {
    name: "TechStart LLC",
    type: "Corporate / Legal",
    contact: "Sarah Mitchell",
    email: "s.mitchell@techstart.com",
    address: "450 Market St, Ste 1200, San Francisco, CA 94111",
    ref: "REF-8842-X",
  },
  service: {
    name: "Loan Signing",
    signers: ["David Chen", "Elena Rossi"],
    docs: "Mortgage Deed, Affidavit of Title (4 pages)",
    date: "Mar 26, 2026",
    time: "10:00 AM - 12:00 PM",
    state: "Florida",
    fee: 125,
    meetingLink: "",
  },
  notary: {
    id: "3",
    name: "Michael Williams",
    phone: "(555) 345-6789",
    cert: "FL-NOT-99887766 (Exp. MAR 2023)",
    email: "m.williams@mail.com",
    distance: "3.2 Miles",
    rating: 4.8,
  },
  signatures: [
    {
      id: 1,
      userId: 1003,
      signedAt: "2026-03-26T10:30:00Z",
      verificationStatus: "VERIFIED",
    }
  ]
};

// Dựa vào bảng jobs cho calendar view
export const mockCalendarJobs = [
  { id: "JOB-001", day: 1, startHour: 9, duration: 2, customer: "Acme Corp", type: "Mobile", status: "NEW" },
  { id: "JOB-002", day: 1, startHour: 13, duration: 1, customer: "Jane Doe", type: "RON", status: "PENDING" },
  { id: "JOB-003", day: 2, startHour: 10, duration: 2, customer: "TechStart LLC", type: "Loan signing", status: "IN_PROGRESS" },
  { id: "JOB-004", day: 3, startHour: 14, duration: 2, customer: "Robert Chen", type: "Mobile", status: "COMPLETED" },
  { id: "JOB-005", day: 4, startHour: 11, duration: 2, customer: "Global Finance Inc", type: "RON", status: "NEW" },
];