import { useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

import {
  useMissingThumbprintsBatch,
  useSetMissingThumbprintsDecision,
} from "../../api";
import { formatDate } from "../../utils/format";
import { withAdminGuard } from "../../hocs/withAdminGuard";

function formatActTypeLabel(value: string) {
  const normalized = (value ?? "").trim();
  if (!normalized) return "-";
  return normalized
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatEntryId(journalEntryId: string, stateCode: string | null) {
  return `JRN-${stateCode ?? "XX"}-${journalEntryId.padStart(5, "0")}`;
}

function BatchReviewMissingThumbprintsDialogBase(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { open, onOpenChange } = props;

  // ── Req 7: Authorization check ──────────────────────────────────────────────
  const { user } = useAuthStore();


  // ── Req 1: Only thumbprint-flagged entries ──────────────────────────────────
  const { data, isFetching } = useMissingThumbprintsBatch({
    page: 1,
    pageSize: 24,
    stateCode: "CA",
  });
  const decisionMutation = useSetMissingThumbprintsDecision();

  const rows = useMemo(() => data?.items ?? [], [data?.items]);

  // ── Req 2, 3, 5: Local decision state (persists via API) ───────────────────
  const [localDecisionById, setLocalDecisionById] = useState<
    Record<string, "require" | "waive" | undefined>
  >({});

  // ── Req 4: Progress indicator ──────────────────────────────────────────────
  const reviewedCount = useMemo(() => {
    return rows.filter((r) => localDecisionById[r.journalEntryId] ?? r.decision)
      .length;
  }, [rows, localDecisionById]);

  // ── Req 9: Empty state check ───────────────────────────────────────────────
  const allReviewed = rows.length > 0 && reviewedCount === rows.length;
  const noFlaggedEntries = !isFetching && rows.length === 0;

  // ── Req 2, 3, 8: Set decision with toast + audit logging via API ───────────
  async function setDecision(
    journalEntryId: string,
    decision: "require" | "waive",
    stateCode: string | null,
  ) {
    const prev = localDecisionById[journalEntryId];
    setLocalDecisionById((p) => ({ ...p, [journalEntryId]: decision }));
    try {
      await decisionMutation.mutateAsync({
        journalEntryId,
        decision,
        changedBy: user?.name ?? user?.email ?? String(user?.id ?? "unknown"),
      });
      const entryLabel = formatEntryId(journalEntryId, stateCode);
      toast.success(
        `Thumbprint ${decision === "require" ? "required" : "waived"} for ${entryLabel}`,
        {
          description:
            decision === "require"
              ? "Compliance issue will remain active until resolved."
              : "Missing-thumbprint alert cleared for this entry.",
        },
      );
    } catch {
      // Rollback on failure
      setLocalDecisionById((p) => {
        const next = { ...p };
        if (prev) next[journalEntryId] = prev;
        else delete next[journalEntryId];
        return next;
      });
      toast.error("Failed to save decision", {
        description: "Please try again.",
      });
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "sm:max-w-6xl w-full max-w-[calc(100%-2rem)] rounded-xl p-0 gap-0 overflow-hidden",
        )}
      >
        {/* Header with progress indicator (Req 4) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebebeb] bg-white">
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <button
                className="w-9 h-9 flex items-center justify-center hover:bg-[#f8f8f8] transition-colors"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            </DialogClose>
            <DialogTitle className="text-[24px] font-bold text-foreground">
              Batch Review: Missing Thumbprints
            </DialogTitle>
          </div>
          <div className="flex items-center gap-3">
            {/* Req 4: Progress bar */}
            {rows.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${(reviewedCount / rows.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                  {reviewedCount}/{rows.length} Reviewed
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-sky-50 border-b border-sky-200">
          <div className="text-sm text-foreground">
            Please review <span className="font-semibold">State</span> and{" "}
            <span className="font-semibold">Act Type</span> to determine if
            thumbprints are legally required. You can Require or Waive this
            requirement.
          </div>
        </div>

        <div className="px-6 py-4 overflow-auto max-h-[70vh] bg-white">
          {/* Req 9: Empty state when no thumbprint issues remain */}
          {(noFlaggedEntries || allReviewed) && !isFetching ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div className="p-4 bg-green-50 rounded-full">
                <Inbox className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {allReviewed
                  ? "All Entries Reviewed"
                  : "No Thumbprint Issues Found"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {allReviewed
                  ? "All flagged entries have been reviewed. No remaining thumbprint issues."
                  : "There are currently no entries with missing thumbprints that require review."}
              </p>
            </div>
          ) : (
            <Table className="min-w-[1100px]">
              <TableHeader className="bg-[#f8f8f8]">
                <TableRow className="border-b border-[#ebebeb]">
                  <TableHead className="w-[44px] px-4">
                    <input type="checkbox" aria-label="Select all" />
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground">
                    Entry ID
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground">
                    Notary Name
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground">
                    State
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground">
                    Act Type
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground text-right pr-4">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="px-4 py-8 text-sm text-muted-foreground"
                    >
                      {isFetching ? "Loading…" : "No entries found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => {
                    // Req 1: Format entry ID as JRN-CA-XXXXX
                    const displayId = formatEntryId(
                      r.journalEntryId,
                      r.stateCode,
                    );
                    const actLabel = formatActTypeLabel(r.actType);
                    // Req 5: Decision persists via server + local state
                    const decision =
                      localDecisionById[r.journalEntryId] ??
                      r.decision ??
                      undefined;

                    return (
                      <TableRow
                        key={r.journalEntryId}
                        className={cn(
                          "border-b border-[#ebebeb]",
                          decision === "require" && "bg-orange-50/50",
                          decision === "waive" && "bg-green-50/50",
                        )}
                      >
                        <TableCell className="px-4 py-3">
                          <input
                            type="checkbox"
                            aria-label={`Select ${displayId}`}
                          />
                        </TableCell>
                        <TableCell className="py-3 text-sm font-semibold text-foreground whitespace-nowrap">
                          {displayId}
                        </TableCell>
                        <TableCell className="py-3 text-sm text-muted-foreground whitespace-nowrap">
                          {formatDate(r.dateTime)}
                        </TableCell>
                        <TableCell className="py-3 text-sm text-foreground whitespace-nowrap">
                          {r.notaryName}
                        </TableCell>
                        <TableCell className="py-3 text-sm text-foreground whitespace-nowrap">
                          {r.stateName ?? r.stateCode ?? "-"}
                        </TableCell>
                        <TableCell className="py-3 text-sm text-foreground whitespace-nowrap">
                          {actLabel}
                        </TableCell>
                        {/* Req 2, 3: Decision status column */}
                        <TableCell className="py-3">
                          {decision === "require" ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 border border-orange-200 rounded-full px-2.5 py-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              Required
                            </span>
                          ) : decision === "waive" ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 border border-green-200 rounded-full px-2.5 py-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Waived
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-3 pr-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              className={cn(
                                "bg-orange-600 hover:bg-orange-700 text-white",
                                decision === "require" &&
                                  "ring-2 ring-orange-300",
                              )}
                              disabled={decisionMutation.isPending}
                              onClick={() =>
                                setDecision(
                                  r.journalEntryId,
                                  "require",
                                  r.stateCode,
                                )
                              }
                            >
                              Require
                            </Button>
                            <Button
                              size="sm"
                              className={cn(
                                "bg-green-700 hover:bg-green-800 text-white",
                                decision === "waive" && "ring-2 ring-green-300",
                              )}
                              disabled={decisionMutation.isPending}
                              onClick={() =>
                                setDecision(
                                  r.journalEntryId,
                                  "waive",
                                  r.stateCode,
                                )
                              }
                            >
                              Waive
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-3 border-t border-[#ebebeb] bg-white">
          {/* Req 4: Summary in footer */}
          <span className="text-sm text-muted-foreground font-medium">
            {rows.length === 0
              ? "No flagged entries"
              : `${rows.length - reviewedCount} remaining · ${reviewedCount} reviewed`}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center bg-[#c4a484] text-white font-bold text-sm rounded-md"
              aria-label="Page 1"
            >
              1
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const BatchReviewMissingThumbprintsDialog = withAdminGuard(
  BatchReviewMissingThumbprintsDialogBase,
  {
    type: "dialog",
    message:
      "You do not have permission to review batch thumbprints. Only administrators can access this feature.",
  },
);
