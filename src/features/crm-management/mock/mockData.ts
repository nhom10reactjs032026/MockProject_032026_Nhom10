import type { Customer, Contact, Activity } from "../types";

export const mockCustomers: Customer[] = [
  {
    id: "#EXE-9921",
    name: "NexGen Ventures",
    type: "B2B",
    industry: "Technology",
    status: "Active",
    primaryContact: "Sarah Jenkins",
    primaryEmail: "s.jenkins@nexgen.com",
    primaryPhone: "+1(555)012-3456",
    jobs: 142,
    revenue: 1240500,
    tags: ["VIP"],
  },
  {
    id: "#EXE-8842",
    name: "Skyline Logistics",
    type: "B2B",
    industry: "Shipping",
    status: "Active",
    primaryContact: "Marcus Thorne",
    primaryEmail: "m.thorne@skyline.io",
    primaryPhone: "+1(555)098-7654",
    jobs: 89,
    revenue: 842000,
    tags: ["HIGH-VOLUME"],
  },
  {
    id: "#EXE-7719",
    name: "Blue Chip Media",
    type: "B2C",
    industry: "Media",
    status: "Inactive",
    primaryContact: "Elena Rodriguez",
    primaryEmail: "elena@bluechip.com",
    primaryPhone: "+1(555)234-5678",
    jobs: 45,
    revenue: 320150,
  },
  {
    id: "#EXE-5521",
    name: "Apex Manufacturing",
    type: "B2B",
    industry: "Manufacturing",
    status: "Active",
    primaryContact: "David Wu",
    primaryEmail: "d.wu@apex.com",
    primaryPhone: "+1(555)876-5432",
    jobs: 214,
    revenue: 2890000,
    tags: ["VIP"],
  },
];

export const mockGlobalLogisticsContacts: Contact[] = [
  {
    id: "01",
    name: "Jane Dupris",
    role: "Billing",
    email: "jane.d@enterprise.com",
    phone: "+1(555)012-3456",
    isPrimary: true,
    notificationPreferences: true,
  },
  {
    id: "02",
    name: "Marcus Knight",
    role: "Ordering",
    email: "m.knight@logistics.io",
    phone: "+1(555)098-7654",
    isPrimary: false,
    notificationPreferences: false,
  },
  {
    id: "03",
    name: "Sarah Chen",
    role: "Legal",
    email: "s.chen@creative.hub",
    phone: "+1(555)234-5678",
    isPrimary: false,
    notificationPreferences: true,
  },
  {
    id: "04",
    name: "Robert Blackstone",
    role: "Billing",
    email: "r.stone@global.corp",
    phone: "+1(555)876-5432",
    isPrimary: false,
    notificationPreferences: false,
  },
  {
    id: "05",
    name: "Elena Rodriguez",
    role: "Ordering",
    email: "elena.r@agency.net",
    phone: "+1(555)456-7890",
    isPrimary: false,
    notificationPreferences: false,
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Contract Renewed - Enterprise Tier",
    description:
      "Renewal agreement finalized for FY24 including high-priority SLA and expanded API access limits.",
    date: "Oct 24, 2023",
    type: "contract",
  },
  {
    id: "2",
    title: "Support Ticket Resolved",
    description:
      "Integration delay in the EMEA region resolved by engineering. Root cause: regional webhook timeout.",
    date: "Oct 18, 2023",
    type: "support",
  },
  {
    id: "3",
    title: "Q3 Business Review Completed",
    description:
      "Strategic alignment session with Sarah Chen. Customer satisfied with overall 12% increase in efficiency.",
    date: "Sep 30, 2023",
    type: "review",
  },
];

export const mockDashboardData = {
  totalCustomers: 1000,
  totalRevenue: 1000000,
  jobsByCustomers: 5000,
  b2bRevenue: 750000,
  b2cRevenue: 250000,
  customers: {
    b2b: 250,
    b2c: 750,
  },
  topClients: [
    { name: "Bank of America", value: "$1.2M" },
    { name: "Law Firm XYZ", value: "$850K" },
    { name: "Real Estate ABC", value: "$640k" },
  ],
};
