import { notarialJournalApiClient } from "./client";
import type {
  ComplianceAuditLog,
  JournalEntriesListResponse,
  JournalEntryDetailResponse,
  JournalEntrySignerResponse,
  JournalEntryStatus,
  MissingSignatureRecipient,
  NotarialJournalDashboardResponse,
  SendMissingSignatureRemindersRequest,
  SendMissingSignatureRemindersResponse,
  SetThumbprintDecisionRequest,
  SetThumbprintDecisionResponse,
  ThumbprintAuditLog,
  ThumbprintBatchResponse,
} from "./types";

export type ListJournalEntriesParams = {
  id?: string;
  status?: JournalEntryStatus | "All";
  notaryId?: string;
  notaryQuery?: string;
  actType?: string | "All";
  stateCode?: string | "All";
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
};

export const notarialJournalApi = {
  async getDashboard(params: ListJournalEntriesParams = {}) {
    const res =
      await notarialJournalApiClient.get<NotarialJournalDashboardResponse>(
        "/dashboard",
        { params },
      );
    return res.data;
  },

  async listJournalEntries(params: ListJournalEntriesParams = {}) {
    const res = await notarialJournalApiClient.get<JournalEntriesListResponse>(
      "/journal-entries",
      { params },
    );
    return res.data;
  },

  async listActTypes() {
    const res = await notarialJournalApiClient.get<string[]>("/act-types");
    return res.data;
  },

  async listStates() {
    const res =
      await notarialJournalApiClient.get<
        Array<{ stateCode: string; stateName: string }>
      >("/states");
    return res.data;
  },

  async getJournalEntryDetail(id: string) {
    const res = await notarialJournalApiClient.get<JournalEntryDetailResponse>(
      `/journal-entries/${encodeURIComponent(id)}`,
    );
    return res.data;
  },

  async getSignerInfo(id: string) {
    const res = await notarialJournalApiClient.get<JournalEntrySignerResponse>(
      `/journal-entries/${encodeURIComponent(id)}/signer`,
    );
    return res.data;
  },

  // SC_010
  async listMissingSignatureRecipients(params?: { stateCode?: string }) {
    const res = await notarialJournalApiClient.get<MissingSignatureRecipient[]>(
      "/compliance/missing-signatures/recipients",
      { params },
    );
    return res.data;
  },

  async sendMissingSignatureReminders(
    payload: SendMissingSignatureRemindersRequest,
  ) {
    const res =
      await notarialJournalApiClient.post<SendMissingSignatureRemindersResponse>(
        "/compliance/missing-signatures/send",
        payload,
      );
    return res.data;
  },

  // SC_011
  async listMissingThumbprintsBatch(params: {
    stateCode: string;
    page: number;
    pageSize: number;
  }) {
    const res = await notarialJournalApiClient.get<ThumbprintBatchResponse>(
      "/compliance/missing-thumbprints/batch",
      { params },
    );
    return res.data;
  },

  async setMissingThumbprintsDecision(payload: SetThumbprintDecisionRequest) {
    const res =
      await notarialJournalApiClient.post<SetThumbprintDecisionResponse>(
        "/compliance/missing-thumbprints/decision",
        payload,
      );
    return res.data;
  },

  // SC_010 Audit
  async getComplianceAuditLogs() {
    const res = await notarialJournalApiClient.get<ComplianceAuditLog[]>(
      "/compliance/audit-logs",
    );
    return res.data;
  },

  // SC_011 Audit
  async getThumbprintAuditLogs() {
    const res = await notarialJournalApiClient.get<ThumbprintAuditLog[]>(
      "/compliance/missing-thumbprints/audit-logs",
    );
    return res.data;
  },
};
