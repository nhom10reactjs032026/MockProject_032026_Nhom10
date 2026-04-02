import { http, HttpResponse } from "msw";
import { getMockNotarialJournalDb } from "./csvTables";

function toNumber(value: string | undefined): number {
  const n = Number(String(value ?? "").trim());
  return Number.isFinite(n) ? n : 0;
}

function mapStatus(
  raw: string,
): "Completed" | "Draft" | "Action Required" | "Locked" {
  const s = (raw ?? "").toUpperCase();
  if (s === "COMPLETED" || s === "PAID") return "Completed";
  if (s === "LOCKED") return "Locked";
  if (s === "ACTION_REQUIRED" || s === "REQUIRES_ACTION")
    return "Action Required";
  // Default mapping for CSV values like PENDING
  return "Draft";
}

function isoLikeFromId(id: string): string {
  // Deterministic pseudo timestamp for mocks
  const base = new Date("2023-10-20T08:00:00Z").getTime();
  const deltaDays = toNumber(id) % 20;
  const ts = new Date(base + deltaDays * 24 * 3600 * 1000);
  return ts.toISOString();
}

function pickCountyFromState(stateCode: string): string {
  const map: Record<string, string> = {
    CA: "Los Angeles",
    TX: "Travis",
    NY: "Kings",
    FL: "Miami-Dade",
    WA: "King",
  };
  return map[stateCode] ?? "Unknown";
}

function createPaymentStatusByRequestId(
  db: ReturnType<typeof getMockNotarialJournalDb>,
) {
  const map = new Map<string, string>();
  for (const p of db.payments) map.set(p.request_id, p.status);
  return map;
}

function getMappedEntryStatus(
  rawStatus: string,
  paymentStatus: string | undefined,
): "Completed" | "Draft" | "Action Required" | "Locked" {
  if ((paymentStatus ?? "").toLowerCase() === "unpaid")
    return "Action Required";
  return mapStatus(rawStatus);
}

type MissingSignatureRecipient = {
  notaryId: string;
  notaryName: string;
  email: string | null;
  count: number;
  entryIds: string[];
};

type SentReminderLog = {
  id: string;
  notaryId: string;
  email: string | null;
  subject: string;
  content: string;
  timeStamp: string;
};

type ThumbprintBatchItem = {
  journalEntryId: string;
  dateTime: string;
  notaryName: string;
  stateCode: string | null;
  stateName: string | null;
  actType: string;
  decision: "require" | "waive" | null;
};

type ThumbprintAuditLog = {
  id: string;
  journalEntryId: string;
  action: "REQUIRE" | "WAIVE";
  changedBy: string;
  createdAt: string;
};

const sentReminderLogs: SentReminderLog[] = [];
const thumbprintDecisionByEntryId = new Map<string, "require" | "waive">();
const thumbprintAuditLogs: ThumbprintAuditLog[] = [];

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function getStateForNotary(
  db: ReturnType<typeof getMockNotarialJournalDb>,
  notaryId: string,
) {
  const commission = db.commissions.find((c) => c.notary_id === notaryId);
  const stateCode = (commission?.commission_state ?? "").trim();
  const stateName = stateCode
    ? (db.states.find((s) => s.state_code === stateCode)?.state_name ?? null)
    : null;
  return { stateCode: stateCode || null, stateName };
}

function hasMissingSignerSignature(
  db: ReturnType<typeof getMockNotarialJournalDb>,
  journalEntryId: string,
) {
  const act = db.notaryActs.find((a) => a.request_id === journalEntryId);
  if (!act) return false;

  const signatures = db.signatures.filter((s) => s.act_id === act.id);
  if (signatures.length === 0) return true;

  return signatures.some((s) => {
    const status = (s.status ?? "").toUpperCase();
    const sig = (s.signature_data ?? "").trim();
    return status !== "SIGNED" || sig.length === 0;
  });
}

function isMissingThumbprint(
  db: ReturnType<typeof getMockNotarialJournalDb>,
  journalEntryId: string,
) {
  // No explicit thumbprint_image column exists in provided CSV tables.
  // Mock rule: for CA entries, require thumbprint for common act types and deterministically mark some as missing.
  const act = db.notaryActs.find((a) => a.request_id === journalEntryId);
  const actType = (act?.type ?? "").trim();

  const requiresForAct =
    actType === "ACKNOWLEDGMENT" ||
    actType === "JURAT" ||
    actType === "OATH_AFFIRMATION" ||
    actType === "OATH";

  if (!requiresForAct) return false;
  const n = Number(journalEntryId);
  if (!Number.isFinite(n)) return false;
  return n % 2 === 1;
}

export const notarialJournalHandlers = [
  http.get("/api/notarial-journal/act-types", () => {
    const db = getMockNotarialJournalDb();
    const types = Array.from(
      new Set(
        db.notaryActs
          .map((a) => (a.type ?? "").trim())
          .filter((t) => t.length > 0),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return HttpResponse.json(types);
  }),

  http.get("/api/notarial-journal/states", () => {
    const db = getMockNotarialJournalDb();
    const states = (db.states ?? [])
      .map((s) => ({
        stateCode: (s.state_code ?? "").trim(),
        stateName: (s.state_name ?? "").trim(),
      }))
      .filter((s) => s.stateCode.length > 0 && s.stateName.length > 0)
      .sort((a, b) => a.stateName.localeCompare(b.stateName));

    return HttpResponse.json(states);
  }),

  // SC_010: Email Notaries — recipients grouped by notary.
  http.get(
    "/api/notarial-journal/compliance/missing-signatures/recipients",
    ({ request }) => {
      const db = getMockNotarialJournalDb();
      const url = new URL(request.url);
      const stateCode = (url.searchParams.get("stateCode") ?? "")
        .trim()
        .toUpperCase();

      const recipientsMap = new Map<string, MissingSignatureRecipient>();

      for (const entry of db.journalEntries) {
        if (!hasMissingSignerSignature(db, entry.id)) continue;

        const { stateCode: notaryStateCode } = getStateForNotary(
          db,
          entry.notary_id,
        );
        if (stateCode && (notaryStateCode ?? "").toUpperCase() !== stateCode)
          continue;

        const notary = db.notaries.find((n) => n.id === entry.notary_id);
        const notaryName = notary?.full_name ?? `Notary #${entry.notary_id}`;
        const user = notary?.user_id
          ? db.users.find((u) => u.id === notary.user_id)
          : undefined;
        const email = user?.email ?? null;

        const existing = recipientsMap.get(entry.notary_id);
        if (existing) {
          existing.count += 1;
          existing.entryIds.push(entry.id);
        } else {
          recipientsMap.set(entry.notary_id, {
            notaryId: entry.notary_id,
            notaryName,
            email,
            count: 1,
            entryIds: [entry.id],
          });
        }
      }

      let recipients = Array.from(recipientsMap.values()).sort((a, b) =>
        a.notaryName.localeCompare(b.notaryName),
      );

      if (recipients.length === 0) {
        // Keep the screen usable even if CSVs have no "missing" rows.
        recipients = db.notaries.slice(0, 3).map((n, idx) => {
          const u = db.users.find((x) => x.id === n.user_id);
          return {
            notaryId: n.id,
            notaryName: n.full_name,
            email: u?.email ?? null,
            count: 5 - idx * 2,
            entryIds: [String(1 + idx), String(4 + idx), String(7 + idx)].slice(
              0,
              Math.max(1, 3 - idx),
            ),
          };
        });
      }

      return HttpResponse.json(recipients);
    },
  ),

  // SC_010: send reminders (mock) -> write to in-memory log.
  http.post(
    "/api/notarial-journal/compliance/missing-signatures/send",
    async ({ request }) => {
      const db = getMockNotarialJournalDb();
      const body = (await request.json()) as {
        notaryIds: string[];
        subject: string;
        content: string;
      };

      const notaryIds = Array.isArray(body?.notaryIds) ? body.notaryIds : [];
      const subject = String(body?.subject ?? "");
      const content = String(body?.content ?? "");

      const timeStamp = nowIso();
      for (const notaryId of notaryIds) {
        const notary = db.notaries.find((n) => n.id === notaryId);
        const user = notary?.user_id
          ? db.users.find((u) => u.id === notary.user_id)
          : undefined;

        sentReminderLogs.unshift({
          id: makeId("reminder"),
          notaryId,
          email: user?.email ?? null,
          subject,
          content,
          timeStamp,
        });
      }

      return HttpResponse.json({ sent: notaryIds.length, timeStamp });
    },
  ),

  // SC_010: Audit logs — return sent reminder logs.
  http.get(
    "/api/notarial-journal/compliance/audit-logs",
    () => {
      const logs = sentReminderLogs.map((log) => ({
        ...log,
        action: "Reminder Email Sent",
      }));
      return HttpResponse.json(logs);
    },
  ),

  // SC_011: Review Batch — list entries missing thumbprints.
  http.get(
    "/api/notarial-journal/compliance/missing-thumbprints/batch",
    ({ request }) => {
      const db = getMockNotarialJournalDb();
      const url = new URL(request.url);
      const stateCode = (url.searchParams.get("stateCode") ?? "CA")
        .trim()
        .toUpperCase();
      const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
      const pageSize = Math.max(
        1,
        Math.min(100, Number(url.searchParams.get("pageSize") ?? 24)),
      );

      const candidates = db.journalEntries
        .filter((e) => {
          const { stateCode: sc } = getStateForNotary(db, e.notary_id);
          return (sc ?? "").toUpperCase() === stateCode;
        })
        .filter((e) => isMissingThumbprint(db, e.id));

      const total = candidates.length;
      const start = (page - 1) * pageSize;
      const pageEntries = candidates.slice(start, start + pageSize);

      const items: ThumbprintBatchItem[] = pageEntries.map((e) => {
        const notary = db.notaries.find((n) => n.id === e.notary_id);
        const act = db.notaryActs.find((a) => a.request_id === e.id);
        const { stateCode, stateName } = getStateForNotary(db, e.notary_id);
        const decision = thumbprintDecisionByEntryId.get(e.id) ?? null;
        return {
          journalEntryId: e.id,
          dateTime: isoLikeFromId(e.id),
          notaryName: notary?.full_name ?? `Notary #${e.notary_id}`,
          stateCode,
          stateName,
          actType: act?.type ?? "UNKNOWN",
          decision,
        };
      });

      return HttpResponse.json({ items, total, page, pageSize });
    },
  ),

  // SC_011: Require/Waive decision (mock) + audit log.
  http.post(
    "/api/notarial-journal/compliance/missing-thumbprints/decision",
    async ({ request }) => {
      const body = (await request.json()) as {
        journalEntryId: string;
        decision: "require" | "waive";
        changedBy?: string;
      };

      const journalEntryId = String(body?.journalEntryId ?? "");
      const decision = body?.decision;
      const changedBy = String(body?.changedBy ?? "999");

      if (!journalEntryId || (decision !== "require" && decision !== "waive")) {
        return HttpResponse.json(
          { message: "Invalid payload" },
          { status: 400 },
        );
      }

      thumbprintDecisionByEntryId.set(journalEntryId, decision);
      const createdAt = nowIso();
      thumbprintAuditLogs.unshift({
        id: makeId("thumbprint_audit"),
        journalEntryId,
        action: decision === "require" ? "REQUIRE" : "WAIVE",
        changedBy,
        createdAt,
      });

      return HttpResponse.json({ journalEntryId, decision, createdAt });
    },
  ),

  // SC_011: Audit logs — return thumbprint review decision logs.
  http.get(
    "/api/notarial-journal/compliance/missing-thumbprints/audit-logs",
    () => {
      return HttpResponse.json(thumbprintAuditLogs);
    },
  ),

  http.get("/api/notarial-journal/dashboard", ({ request }) => {
    const db = getMockNotarialJournalDb();
    const url = new URL(request.url);
    const notaryId = url.searchParams.get("notaryId");

    const paymentStatusByRequestId = createPaymentStatusByRequestId(db);

    const entries = notaryId
      ? db.journalEntries.filter((e) => e.notary_id === notaryId)
      : db.journalEntries;

    const totalJournalEntries = entries.length;
    const statusCounts = entries.reduce(
      (acc, e) => {
        const status = getMappedEntryStatus(
          e.status,
          paymentStatusByRequestId.get(e.id),
        );
        acc[status] += 1;
        return acc;
      },
      { Completed: 0, Draft: 0, "Action Required": 0, Locked: 0 } as Record<
        "Completed" | "Draft" | "Action Required" | "Locked",
        number
      >,
    );

    const feeRows = db.feeBreakdowns.filter((f) =>
      entries.some((e) => e.id === f.journal_entry_id),
    );
    const totalFeesCollected = feeRows.reduce(
      (sum, f) => sum + toNumber(f.total_amount),
      0,
    );

    const activeNotaries = db.notaries.filter((n) =>
      (n.status ?? "").toUpperCase().includes("ACTIVE"),
    ).length;

    return HttpResponse.json({
      totalJournalEntries,
      countsByStatus: {
        draft: statusCounts["Draft"],
        completed: statusCounts["Completed"],
        actionRequired: statusCounts["Action Required"],
        locked: statusCounts["Locked"],
      },
      totalFeesCollected,
      activeNotaries,
    });
  }),

  http.get("/api/notarial-journal/journal-entries", ({ request }) => {
    const db = getMockNotarialJournalDb();
    const url = new URL(request.url);

    const paymentStatusByRequestId = createPaymentStatusByRequestId(db);

    const status = url.searchParams.get("status");
    const notaryId = url.searchParams.get("notaryId");
    const notaryQuery = url.searchParams.get("notaryQuery");
    const actType = url.searchParams.get("actType");
    const stateCode = url.searchParams.get("stateCode");
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const pageSize = Math.max(
      1,
      Math.min(100, Number(url.searchParams.get("pageSize") ?? 20)),
    );

    let entries = db.journalEntries.slice();
    if (notaryId) entries = entries.filter((e) => e.notary_id === notaryId);
    if (notaryQuery && notaryQuery.trim().length > 0) {
      const q = notaryQuery.trim().toLowerCase();
      entries = entries.filter((e) => {
        const notary = db.notaries.find((n) => n.id === e.notary_id);
        const name = (notary?.full_name ?? "").toLowerCase();
        return e.notary_id.toLowerCase().includes(q) || name.includes(q);
      });
    }
    if (status && status !== "All") {
      entries = entries.filter(
        (e) =>
          getMappedEntryStatus(e.status, paymentStatusByRequestId.get(e.id)) ===
          status,
      );
    }
    if (actType && actType !== "All") {
      entries = entries.filter((e) => {
        const act = db.notaryActs.find((a) => a.request_id === e.id);
        return (act?.type ?? "").trim() === actType;
      });
    }
    if (stateCode && stateCode !== "All") {
      const sc = stateCode.trim().toUpperCase();
      entries = entries.filter((e) => {
        const commission = db.commissions.find(
          (c) => c.notary_id === e.notary_id,
        );
        return (commission?.commission_state ?? "").trim().toUpperCase() === sc;
      });
    }

    const total = entries.length;
    const start = (page - 1) * pageSize;
    const pageEntries = entries.slice(start, start + pageSize);

    const items = pageEntries.map((e) => {
      const notary = db.notaries.find((n) => n.id === e.notary_id);
      const commission = db.commissions.find(
        (c) => c.notary_id === e.notary_id,
      );
      const signer = db.signers.find((s) => s.journal_entry_id === e.id);
      const act = db.notaryActs.find((a) => a.request_id === e.id);
      const fee = db.feeBreakdowns.find((f) => f.journal_entry_id === e.id);
      const paymentStatus = paymentStatusByRequestId.get(e.id);

      const mappedStatus = getMappedEntryStatus(e.status, paymentStatus);

      const stateCode = (commission?.commission_state ?? "").trim();
      const stateName = stateCode
        ? (db.states.find((s) => s.state_code === stateCode)?.state_name ??
          null)
        : null;

      return {
        id: e.id,
        dateTime: isoLikeFromId(e.id),
        notaryName: notary?.full_name ?? `Notary #${e.notary_id}`,
        stateCode: stateCode || null,
        stateName,
        actType: act?.type ?? "UNKNOWN",
        signerName: signer?.full_name ?? "-",
        fee: fee ? toNumber(fee.total_amount) : toNumber(e.notarial_fee),
        status: mappedStatus,
        riskFlags: mappedStatus === "Action Required" ? "Warning" : "None",
      };
    });

    return HttpResponse.json({
      items,
      total,
      page,
      pageSize,
    });
  }),

  http.get("/api/notarial-journal/journal-entries/:id", ({ params }) => {
    const db = getMockNotarialJournalDb();
    const id = String(params.id);

    const entry = db.journalEntries.find((e) => e.id === id);
    if (!entry) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const notary = db.notaries.find((n) => n.id === entry.notary_id);
    const commission = db.commissions.find(
      (c) => c.notary_id === entry.notary_id,
    );
    const act = db.notaryActs.find((a) => a.request_id === id);
    const fee = db.feeBreakdowns.find((f) => f.journal_entry_id === id);
    const payment = db.payments.find((p) => p.request_id === id);
    const signer = db.signers.find((s) => s.journal_entry_id === id);

    const commissionState = commission?.commission_state ?? "";
    const stateName = db.states.find(
      (s) => s.state_code === commissionState,
    )?.state_name;

    return HttpResponse.json({
      id,
      status:
        payment?.status === "unpaid"
          ? "Action Required"
          : mapStatus(entry.status),
      createdAt: isoLikeFromId(id),
      signedAt: isoLikeFromId(String(Number(id) + 1)),
      actType: act?.type ?? "UNKNOWN",
      linkedNotarialActId: act?.id ? `NA-${act.id}` : null,
      venue: {
        stateCode: commissionState || null,
        stateName: stateName || null,
        county: commissionState ? pickCountyFromState(commissionState) : null,
      },
      notary: {
        id: entry.notary_id,
        name: notary?.full_name ?? `Notary #${entry.notary_id}`,
        commissionNumber: commission?.commission_number ?? null,
        commissionState: commission?.commission_state ?? null,
        commissionExpirationDate: commission?.expiration_date ?? null,
      },
      signer: signer
        ? {
            id: signer.id,
            fullName: signer.full_name,
          }
        : null,
      fees: fee
        ? {
            baseNotarialFee: toNumber(fee.base_notarial_fee),
            serviceFee: toNumber(fee.service_fee),
            travelFee: toNumber(fee.travel_fee),
            convenienceFee: toNumber(fee.convenience_fee),
            rushFee: toNumber(fee.rush_fee),
            totalAmount: toNumber(fee.total_amount),
            notaryShare: toNumber(fee.notary_share),
            companyShare: toNumber(fee.company_share),
          }
        : {
            baseNotarialFee: toNumber(entry.notarial_fee),
            serviceFee: 0,
            travelFee: 0,
            convenienceFee: 0,
            rushFee: 0,
            totalAmount: toNumber(entry.notarial_fee),
            notaryShare: 0,
            companyShare: 0,
          },
      payment: payment
        ? {
            amount: toNumber(payment.amount),
            status: payment.status,
            gateway: payment.gateway,
          }
        : null,
    });
  }),

  http.get("/api/notarial-journal/journal-entries/:id/signer", ({ params }) => {
    const db = getMockNotarialJournalDb();
    const id = String(params.id);

    const signer = db.signers.find((s) => s.journal_entry_id === id);
    if (!signer) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json({
      journalEntryId: id,
      signer: {
        id: signer.id,
        fullName: signer.full_name,
        residentialAddress: null,
      },
      identification: {
        idType: null,
        issuingAuthority: null,
        idNumber: null,
        expirationDate: null,
      },
      verification: {
        status: "PENDING",
        method: null,
      },
      updatedAt: new Date().toISOString(),
    });
  }),
];
