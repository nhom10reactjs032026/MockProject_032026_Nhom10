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
  type: "contract" | "support" | "review";
};
