export type CustomerType = "B2B" | "B2C";
export type ServiceType = "Mobile" | "RON" | "Loan signing";
export type JobStatus = "NEW" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Job {
  id: string;
  customerType: CustomerType;
  customerName: string;
  serviceType: ServiceType;
  state: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  note?: string;
  status: JobStatus;
  assignedNotary?: string;
}

export interface CreateJobForm {
  customerType: CustomerType;
  customerName: string;
  serviceType: ServiceType;
  state: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  note: string;
}

// ── Dispatch ──────────────────────────────────────────────────

export interface DispatchJob {
  id: string;
  service: string;
  client: string;
  location: string;
  time: string;
  signers: string;
  type: string;
  note?: string;
}

export interface SuitableNotary {
  id: string;
  name: string;
  rating: number;
  distance: string;
  services: string;
  jobs: number;
  available: string;
  exp: string;
  avatarInitials: string;
  avatarColor: string;
  verified: boolean;
}