import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  notarialJournalApi,
  type ListJournalEntriesParams,
} from "./notarialJournalApi";
import type {
  SendMissingSignatureRemindersRequest,
  SetThumbprintDecisionRequest,
} from "./types";

export const notarialJournalQueryKeys = {
  dashboard: (notaryId?: string) =>
    ["notarial-journal", "dashboard", { notaryId }] as const,
  actTypes: () => ["notarial-journal", "act-types"] as const,
  states: () => ["notarial-journal", "states"] as const,
  journalEntries: (params: ListJournalEntriesParams) =>
    ["notarial-journal", "journal-entries", params] as const,
  journalEntryDetail: (id: string) =>
    ["notarial-journal", "journal-entry", id] as const,
  signerInfo: (id: string) =>
    ["notarial-journal", "journal-entry", id, "signer"] as const,

  // SC_010
  missingSignatureRecipients: (params: { stateCode?: string } = {}) =>
    ["notarial-journal", "compliance", "missing-signatures", params] as const,

  // SC_011
  missingThumbprintsBatch: (params: {
    stateCode: string;
    page: number;
    pageSize: number;
  }) =>
    ["notarial-journal", "compliance", "missing-thumbprints", params] as const,
};

export function useNotarialJournalDashboard(notaryId?: string) {
  return useQuery({
    queryKey: notarialJournalQueryKeys.dashboard(notaryId),
    queryFn: () => notarialJournalApi.getDashboard(notaryId),
  });
}

export function useJournalEntries(params: ListJournalEntriesParams) {
  return useQuery({
    queryKey: notarialJournalQueryKeys.journalEntries(params),
    queryFn: () => notarialJournalApi.listJournalEntries(params),
  });
}

export function useActTypes() {
  return useQuery({
    queryKey: notarialJournalQueryKeys.actTypes(),
    queryFn: () => notarialJournalApi.listActTypes(),
  });
}

export function useStates() {
  return useQuery({
    queryKey: notarialJournalQueryKeys.states(),
    queryFn: () => notarialJournalApi.listStates(),
  });
}

export function useJournalEntryDetail(id: string | undefined) {
  return useQuery({
    queryKey: id
      ? notarialJournalQueryKeys.journalEntryDetail(id)
      : ["notarial-journal", "journal-entry", "missing-id"],
    queryFn: () => {
      if (!id) throw new Error("Missing journal entry id");
      return notarialJournalApi.getJournalEntryDetail(id);
    },
    enabled: Boolean(id),
  });
}

export function useJournalEntrySignerInfo(id: string | undefined) {
  return useQuery({
    queryKey: id
      ? notarialJournalQueryKeys.signerInfo(id)
      : ["notarial-journal", "journal-entry", "missing-id", "signer"],
    queryFn: () => {
      if (!id) throw new Error("Missing journal entry id");
      return notarialJournalApi.getSignerInfo(id);
    },
    enabled: Boolean(id),
  });
}

// SC_010
export function useMissingSignatureRecipients(params?: { stateCode?: string }) {
  return useQuery({
    queryKey: notarialJournalQueryKeys.missingSignatureRecipients(params ?? {}),
    queryFn: () => notarialJournalApi.listMissingSignatureRecipients(params),
  });
}

export function useSendMissingSignatureReminders() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendMissingSignatureRemindersRequest) =>
      notarialJournalApi.sendMissingSignatureReminders(payload),
    onSuccess: () => {
      // Recipient list doesn't strictly change, but refreshing keeps UI consistent.
      void queryClient.invalidateQueries({
        queryKey: ["notarial-journal", "compliance", "missing-signatures"],
      });
    },
  });
}

// SC_011
export function useMissingThumbprintsBatch(params: {
  stateCode: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: notarialJournalQueryKeys.missingThumbprintsBatch(params),
    queryFn: () => notarialJournalApi.listMissingThumbprintsBatch(params),
  });
}

export function useSetMissingThumbprintsDecision() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SetThumbprintDecisionRequest) =>
      notarialJournalApi.setMissingThumbprintsDecision(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notarial-journal", "compliance", "missing-thumbprints"],
      });
    },
  });
}
