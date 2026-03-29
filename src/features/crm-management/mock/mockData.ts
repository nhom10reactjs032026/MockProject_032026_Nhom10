import type {
  Customer,
  Contact,
  Activity,
  TopClientData,
  HolidayAnnouncement,
} from "../types";

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

  jobs: {
    b2b: 2750,
    b2c: 1250,
  },

  topClients: [
    { name: "Bank of America", value: "$1.2M" },
    { name: "Law Firm XYZ", value: "$850K" },
    { name: "Real Estate ABC", value: "$640k" },
  ],
};

export const mockTimelineActivities: Activity[] = [
  {
    id: "1",
    title: "Contract Renewed - Enterprise Tier",
    description:
      "Renewal agreement finalized for FY24 including high-priority SLA and expanded API access limits.",
    date: "Oct 24, 2023",
    isRecent: true,
  },
  {
    id: "2",
    title: "Support Ticket Resolved",
    description:
      "Integration delay in the EMEA region resolved by engineering. Root cause: regional webhook timeout.",
    date: "Oct 18, 2023",
    isRecent: false,
  },
  {
    id: "3",
    title: "Q3 Business Review Completed",
    description:
      "Strategic alignment session with Sarah Chen. Customer satisfied with overall 12% increase in efficiency.",
    date: "Sept 30, 2023",
    isRecent: false,
  },
];

export const mockTopClients: TopClientData[] = [
  { name: "Bank of America", value: "$1.2M", iconType: "bank" },
  { name: "Law Firm XYZ", value: "$850K", iconType: "law" },
  { name: "Real Estate ABC", value: "$640k", iconType: "building" },
];

export const mockOverdueInvoices = [
  { client: "Oracle Corp", amount: "$12,400", status: "12 Days Late" },
  { client: "Morgan Stanley", amount: "$8,900", status: "4 Days Late" },
  { client: "FedEx Express", amount: "$3,250", status: "18 Days Late" },
];

export const mockContractsExpiring = [
  { contract: "SaaS Renewal - Adobe", expiration: "Oct 24, 2023" },
  { contract: "Cloud Infra - AWS", expiration: "Nov 02, 2023" },
  { contract: "Security - Crowdstrike", expiration: "Nov 15, 2023" },
];

export const mockCustomerProfileDetail = {
  name: "Global Logistics Corp",
  status: "ACTIVE",
  type: "B2B",
  volume: "High-Volume",
  address: "1221 Avenue of the Americas, Floor 42, New York, NY 10020",
  industry: "Supply Chain & Freight",
  taxId: "NY-882-9910-X",
  contactInitials: "SC",
  contactName: "Sarah Chen",
  contactRole: "Director of Operations",
  annualJobs: 1422,
  annualRevenue: "$2.84M",
  avgTurnaround: 4.2,
};

export const mockHolidayAnnouncement: HolidayAnnouncement = {
  title: "Thông báo nghỉ lễ Giải phóng miền Nam & Quốc tế Lao động",
  dateRange: "30/04/2026 - 03/05/2026",
  content:
    "Hệ thống CRM sẽ tạm ngưng các tiến trình tự động gửi mail marketing. Đội ngũ hỗ trợ sẽ phản hồi chậm hơn thường lệ trong thời gian này.",
  status: "upcoming",
};
