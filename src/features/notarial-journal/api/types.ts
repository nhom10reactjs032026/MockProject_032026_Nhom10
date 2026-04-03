export type JournalEntryStatus =
  | "Completed"
  | "Draft"
  | "Action Required"
  | "Locked";

export type NotarialJournalDashboardResponse = {
  totalJournalEntries: number;
  totalJournalEntriesChange: string; // e.g. "+12%"
  countsByStatus: {
    draft: number;
    completed: number;
    actionRequired: number;
    actionRequiredChange: string;
    locked: number;
  };
  totalFeesCollected: number;
  totalFeesCollectedChange: string;
  activeNotaries: number;
  activeNotariesChange: string;
};

export type JournalEntryListItem = {
  id: string;
  dateTime: string; // ISO string
  notaryName: string;
  stateCode?: string | null;
  stateName?: string | null;
  actType: string;
  signerName: string;
  fee: number;
  status: JournalEntryStatus;
  riskFlags: "None" | "Warning";
};

export type JournalEntriesListResponse = {
  items: JournalEntryListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type JournalEntryDetailResponse = {
  id: string;
  status: JournalEntryStatus;
  createdAt: string;
  signedAt: string;
  actType: string;
  linkedNotarialActId: string | null;
  venue: {
    stateCode: string | null;
    stateName: string | null;
    county: string | null;
  };
  notary: {
    id: string;
    name: string;
    commissionNumber: string | null;
    commissionState: string | null;
    commissionExpirationDate: string | null;
  };
  signer: {
    id: string;
    fullName: string;
  } | null;
  fees: {
    baseNotarialFee: number;
    serviceFee: number;
    travelFee: number;
    convenienceFee: number;
    rushFee: number;
    totalAmount: number;
    notaryShare: number;
    companyShare: number;
  };
  payment: {
    amount: number;
    status: string;
    gateway: string;
  } | null;
};

export type JournalEntrySignerResponse = {
  journalEntryId: string;
  signer: {
    id: string;
    fullName: string;
    residentialAddress: string | null;
  };
  identification: {
    idType: string | null;
    issuingAuthority: string | null;
    idNumber: string | null;
    expirationDate: string | null;
  };
  verification: {
    status: "PENDING" | "VERIFIED" | "FAILED";
    method: string | null;
  };
  updatedAt: string;
};

// SC_010
export type MissingSignatureRecipient = {
  notaryId: string;
  notaryName: string;
  email: string | null;
  count: number;
  entryIds: string[];
};

export type SendMissingSignatureRemindersRequest = {
  notaryIds: string[];
  subject: string;
  content: string;
};

export type SendMissingSignatureRemindersResponse = {
  sent: number;
  timeStamp: string;
};

// SC_011
export type ThumbprintDecision = "require" | "waive";

export type ThumbprintBatchItem = {
  journalEntryId: string;
  dateTime: string;
  notaryName: string;
  stateCode: string | null;
  stateName: string | null;
  actType: string;
  decision: ThumbprintDecision | null;
};

export type ThumbprintBatchResponse = {
  items: ThumbprintBatchItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type SetThumbprintDecisionRequest = {
  journalEntryId: string;
  decision: ThumbprintDecision;
  changedBy?: string;
};

export type SetThumbprintDecisionResponse = {
  journalEntryId: string;
  decision: ThumbprintDecision;
  createdAt: string;
};

// SC_010 Audit
export type ComplianceAuditLog = {
  id: string;
  action: string;
  notaryId: string;
  email: string | null;
  subject: string;
  content: string;
  timeStamp: string;
};

// SC_011 Audit
export type ThumbprintAuditLog = {
  id: string;
  journalEntryId: string;
  action: "REQUIRE" | "WAIVE";
  changedBy: string;
  createdAt: string;
};
