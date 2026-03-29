import { useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

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

import {
  useMissingThumbprintsBatch,
  useSetMissingThumbprintsDecision,
} from "../../api";
import { formatDate } from "../../utils/format";

function formatActTypeLabel(value: string) {
  const normalized = (value ?? "").trim();
  if (!normalized) return "-";
  return normalized
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function BatchReviewMissingThumbprintsDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { open, onOpenChange } = props;

  const { data, isFetching } = useMissingThumbprintsBatch({
    page: 1,
    pageSize: 24,
    stateCode: "CA",
  });
  const decisionMutation = useSetMissingThumbprintsDecision();

  const rows = useMemo(() => data?.items ?? [], [data?.items]);

  const [localDecisionById, setLocalDecisionById] = useState<
    Record<string, "require" | "waive" | undefined>
  >({});

  const reviewedCount = useMemo(() => {
    return rows.filter((r) => localDecisionById[r.journalEntryId] ?? r.decision)
      .length;
  }, [rows, localDecisionById]);

  async function setDecision(
    journalEntryId: string,
    decision: "require" | "waive",
  ) {
    const prev = localDecisionById[journalEntryId];
    setLocalDecisionById((p) => ({ ...p, [journalEntryId]: decision }));
    try {
      await decisionMutation.mutateAsync({ journalEntryId, decision });
    } catch {
      setLocalDecisionById((p) => {
        const next = { ...p };
        if (prev) next[journalEntryId] = prev;
        else delete next[journalEntryId];
        return next;
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "sm:max-w-6xl w-full max-w-[calc(100%-2rem)] rounded-none p-0 gap-0 overflow-hidden",
        )}
      >
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
          <div className="text-sm font-semibold text-muted-foreground">
            {reviewedCount}/{rows.length} Reviewed
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
                <TableHead className="font-bold text-[12px] uppercase tracking-widest text-muted-foreground text-right pr-4">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-4 py-8 text-sm text-muted-foreground"
                  >
                    {isFetching ? "Loading…" : "No entries found."}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => {
                  const displayId = `#JR-${r.journalEntryId}-${r.stateCode ?? "--"}`;
                  const actLabel = formatActTypeLabel(r.actType);
                  const decision =
                    localDecisionById[r.journalEntryId] ??
                    r.decision ??
                    undefined;

                  return (
                    <TableRow
                      key={r.journalEntryId}
                      className="border-b border-[#ebebeb]"
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
                      <TableCell className="py-3 pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className={cn(
                              "rounded-none bg-orange-600 hover:bg-orange-700 text-white",
                              decision === "require" &&
                                "ring-2 ring-orange-300",
                            )}
                            disabled={decisionMutation.isPending}
                            onClick={() =>
                              setDecision(r.journalEntryId, "require")
                            }
                          >
                            Require
                          </Button>
                          <Button
                            size="sm"
                            className={cn(
                              "rounded-none bg-green-700 hover:bg-green-800 text-white",
                              decision === "waive" && "ring-2 ring-green-300",
                            )}
                            disabled={decisionMutation.isPending}
                            onClick={() =>
                              setDecision(r.journalEntryId, "waive")
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
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-[#ebebeb] bg-white">
          <button
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#c4a484] text-white font-bold text-sm rounded-none"
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
      </DialogContent>
    </Dialog>
  );
}
