import Papa from "papaparse";

import journalEntriesCsv from "../../../../mockupdata/Data Sample - JOURNAL_ENTRIES.csv?raw";
import signersCsv from "../../../../mockupdata/Data Sample - SIGNERS.csv?raw";
import notariesCsv from "../../../../mockupdata/Data Sample - notaries.csv?raw";
import notaryActsCsv from "../../../../mockupdata/Data Sample - notary_acts.csv?raw";
import notaryCommissionsCsv from "../../../../mockupdata/Data Sample - Notary_commissions.csv?raw";
import feeBreakdownsCsv from "../../../../mockupdata/Data Sample - FEE_BREAKDOWNS.csv?raw";
import paymentsCsv from "../../../../mockupdata/Data Sample - payment.csv?raw";
import statesCsv from "../../../../mockupdata/Data Sample - states.csv?raw";
import usersCsv from "../../../../mockupdata/Data Sample - users.csv?raw";
import biometricDataCsv from "../../../../mockupdata/Data Sample - BIOMETRIC_DATA.csv?raw";
import signaturesCsv from "../../../../mockupdata/Data Sample - signature.csv?raw";

export type JournalEntryRow = {
  id: string;
  notary_id: string;
  notarial_fee: string;
  status: string;
};

export type SignerRow = {
  id: string;
  journal_entry_id: string;
  full_name: string;
};

export type NotaryRow = {
  id: string;
  user_id: string;
  full_name: string;
  status: string;
  residential_address?: string;
  email?: string;
  phone?: string;
};

export type NotaryActRow = {
  id: string;
  request_id: string;
  notary_id: string;
  jurisdiction_id: string;
  type: string;
  status: string;
};

export type NotaryCommissionRow = {
  id: string;
  notary_id: string;
  commission_state: string;
  commission_number: string;
  issue_date: string;
  expiration_date: string;
  status: string;
};

export type FeeBreakdownRow = {
  id: string;
  journal_entry_id: string;
  base_notarial_fee: string;
  service_fee: string;
  travel_fee: string;
  convenience_fee: string;
  rush_fee: string;
  total_amount: string;
  notary_share: string;
  company_share: string;
};

export type PaymentRow = {
  id: string;
  request_id: string;
  amount: string;
  status: string;
  gateway: string;
};

export type StateRow = {
  id: string;
  state_code: string;
  state_name: string;
};

export type UserRow = {
  id: string;
  email: string;
  phone_number: string;
  status: string;
  created_at: string;
  full_name: string;
  dob: string;
  address: string;
  Id_role: string;
};

export type BiometricDataRow = {
  id: string;
  signer_id: string;
  signature_image: string;
};

export type SignatureRow = {
  id: string;
  act_id: string;
  user_id: string;
  order_index: string;
  signature_data: string;
  status: string;
};

function parseCsv<T extends Record<string, string>>(csv: string): T[] {
  const result = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
  });

  if (result.errors?.length) {
    // In mock mode, fail soft: return whatever parsed.
  }

  return (result.data ?? []).filter(Boolean);
}

export type MockNotarialJournalDb = {
  journalEntries: JournalEntryRow[];
  signers: SignerRow[];
  notaries: NotaryRow[];
  notaryActs: NotaryActRow[];
  commissions: NotaryCommissionRow[];
  feeBreakdowns: FeeBreakdownRow[];
  payments: PaymentRow[];
  states: StateRow[];
  users: UserRow[];
  biometricData: BiometricDataRow[];
  signatures: SignatureRow[];
};

let cachedDb: MockNotarialJournalDb | null = null;

export function getMockNotarialJournalDb(): MockNotarialJournalDb {
  if (cachedDb) return cachedDb;

  cachedDb = {
    journalEntries: parseCsv<JournalEntryRow>(journalEntriesCsv),
    signers: parseCsv<SignerRow>(signersCsv),
    notaries: parseCsv<NotaryRow>(notariesCsv),
    notaryActs: parseCsv<NotaryActRow>(notaryActsCsv),
    commissions: parseCsv<NotaryCommissionRow>(notaryCommissionsCsv),
    feeBreakdowns: parseCsv<FeeBreakdownRow>(feeBreakdownsCsv),
    payments: parseCsv<PaymentRow>(paymentsCsv),
    states: parseCsv<StateRow>(statesCsv),
    users: parseCsv<UserRow>(usersCsv),
    biometricData: parseCsv<BiometricDataRow>(biometricDataCsv),
    signatures: parseCsv<SignatureRow>(signaturesCsv),
  };

  return cachedDb;
}
