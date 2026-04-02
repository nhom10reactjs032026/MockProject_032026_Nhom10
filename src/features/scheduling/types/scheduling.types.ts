export type CustomerType = "B2B" | "B2C";
export type ServiceType = "Mobile" | "RON" | "Loan signing";
export type JobStatus = "NEW" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Job {
  id: string;
  title?: string;
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
  createdBy?: number;
  createdAt?: string;
  originalDocUrl?: string;
  finalDocUrl?: string;
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

export interface Notary {
  id: string;
  userId?: number;
  name: string;
  fullName?: string;
  email?: string;
  phone?: string;
  status?: string;
  commissionNumber?: string;
  expirationDate?: string;
  rating?: number;
  distance?: string;
  services?: string;
  jobs?: number;
  available?: string;
  exp?: string;
  avatarInitials: string;
  avatarColor: string;
  verified: boolean;
}

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

export interface DigitalSignature {
  id: number;
  jobId: number;
  userId: number;
  certificateId: number;
  deviceId: number;
  signatureValue: string;
  documentHash: string;
  signedAt: string;
  ipAddress: string;
  verificationStatus: string;
}