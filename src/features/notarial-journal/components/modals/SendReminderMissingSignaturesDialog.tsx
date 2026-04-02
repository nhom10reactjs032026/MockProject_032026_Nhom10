import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  List,
  ListOrdered,
  AlignLeft,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

import {
  useMissingSignatureRecipients,
  useSendMissingSignatureReminders,
} from "../../api";

// ─── Default template constants ───────────────────────────────────────────────
const DEFAULT_SUBJECT = "Action Required: Complete missing journal";

function buildDefaultBody(
  selectedRecipients: Array<{
    notaryName: string;
    count: number;
    entryIds: string[];
  }>,
) {
  const entryIdList = selectedRecipients.flatMap((r) => r.entryIds);
  const totalCount = selectedRecipients.reduce((s, r) => s + r.count, 0);
  const names = selectedRecipients.map((r) => r.notaryName).join(", ");
  const deadline = new Date(Date.now() + 7 * 24 * 3600 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    `Dear ${names || "[Notary Name]"},\n\n` +
    `Our records indicate that you have ${totalCount || "[Count]"} journal entries with missing signatures. ` +
    `Please review and electronically sign them by ${deadline} to maintain compliance.\n\n` +
    `Refer to entries: ${entryIdList.length > 0 ? entryIdList.join(", ") : "[Entry IDs]"}.\n\n` +
    `⚠️ COMPLIANCE WARNING: Failure to complete the required signatures within the specified timeframe ` +
    `may result in regulatory action. Please ensure all journal entries are properly signed ` +
    `to remain in compliance with state notarial laws.\n\n` +
    `Thank you,\nCompliance Team.`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function SendReminderMissingSignaturesDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { open, onOpenChange } = props;

  // ── Req 7: Authorization check ──────────────────────────────────────────────
  const { user } = useAuthStore();
  const isAuthorized = user?.role === "admin";

  const { data: recipients = [], isFetching } = useMissingSignatureRecipients({
    stateCode: "TX",
  });
  const sendMutation = useSendMissingSignatureReminders();

  const [selectedNotaryIds, setSelectedNotaryIds] = useState<Set<string>>(
    () => new Set(),
  );

  // ── Req 5: Validation state ─────────────────────────────────────────────────
  const [subjectError, setSubjectError] = useState("");
  const [bodyError, setBodyError] = useState("");

  // ── Req 2: Prefilled email template ─────────────────────────────────────────
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(() => buildDefaultBody([]));

  // Rebuild body when selection changes
  const selectedRecipients = useMemo(
    () => recipients.filter((r) => selectedNotaryIds.has(r.notaryId)),
    [recipients, selectedNotaryIds],
  );
  useEffect(() => {
    setBody(buildDefaultBody(selectedRecipients));
  }, [selectedRecipients]);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const allSelected =
    recipients.length > 0 && selectedNotaryIds.size === recipients.length;
  const selectedCount = selectedNotaryIds.size;
  const noFlaggedRecipients = !isFetching && recipients.length === 0;

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSelectedNotaryIds(new Set());
      setSubjectError("");
      setBodyError("");
    }
    onOpenChange(nextOpen);
  }

  // Update body template when a recipient checkbox changes
  const refreshBody = useCallback(
    (nextIds: Set<string>) => {
      const sel = recipients.filter((r) => nextIds.has(r.notaryId));
      setBody(buildDefaultBody(sel));
    },
    [recipients],
  );

  function toggleRecipientAndRefresh(notaryId: string) {
    setSelectedNotaryIds((prev) => {
      const next = new Set(prev);
      if (next.has(notaryId)) next.delete(notaryId);
      else next.add(notaryId);
      refreshBody(next);
      return next;
    });
  }

  function toggleAllAndRefresh() {
    setSelectedNotaryIds((prev) => {
      if (recipients.length === 0) return prev;
      let next: Set<string>;
      if (prev.size === recipients.length) {
        next = new Set();
      } else {
        next = new Set(recipients.map((r) => r.notaryId));
      }
      refreshBody(next);
      return next;
    });
  }

  function onCancel() {
    setSelectedNotaryIds(new Set());
    setSubjectError("");
    setBodyError("");
    onOpenChange(false);
  }

  // ── Req 5: Validation + Req 4: Send with toast ─────────────────────────────
  async function onSend() {
    let hasError = false;

    // Validate subject
    if (subject.trim().length === 0) {
      setSubjectError("Subject is required.");
      hasError = true;
    } else {
      setSubjectError("");
    }

    // Validate body
    if (body.trim().length === 0) {
      setBodyError("Email body is required.");
      hasError = true;
    } else {
      setBodyError("");
    }

    if (hasError) return;

    if (selectedNotaryIds.size === 0 || sendMutation.isPending) return;

    try {
      await sendMutation.mutateAsync({
        notaryIds: Array.from(selectedNotaryIds.values()),
        subject,
        content: body,
      });
      // Req 4: Success toast
      toast.success("Reminder emails sent successfully!", {
        description: `${selectedNotaryIds.size} email${selectedNotaryIds.size === 1 ? "" : "s"} sent to the selected notaries.`,
      });
      setSelectedNotaryIds(new Set());
      onOpenChange(false);
    } catch {
      toast.error("Failed to send reminder emails", {
        description: "Please try again later.",
      });
    }
  }

  // ── Req 7: Unauthorized access ─────────────────────────────────────────────
  if (!isAuthorized) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn(
            "top-0 right-0 left-auto translate-x-0 translate-y-0 h-dvh w-full max-w-[560px] rounded-l-xl p-0 gap-0",
          )}
        >
          <div className="p-6 border-b border-[#ebebeb]">
            <DialogTitle className="text-[18px] font-bold text-foreground">
              Access Denied
            </DialogTitle>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
            <div className="p-4 bg-red-50 rounded-full">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Unauthorized Access
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              You do not have permission to send reminder emails. Only
              administrators can access this feature.
            </p>
            <Button
              variant="outline"
              className="border-[#ebebeb] mt-2"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "top-0 right-0 left-auto translate-x-0 translate-y-0 h-dvh w-full max-w-[560px] rounded-l-xl p-0 gap-0",
        )}
      >
        <div className="p-6 border-b border-[#ebebeb]">
          <DialogTitle className="text-[18px] font-bold text-foreground">
            Send Reminder: Missing Signatures
          </DialogTitle>
        </div>

        <div className="p-6 space-y-6 overflow-auto">
          {/* ── Req 1: Recipients table with entries + email ────────────────── */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-foreground">Sending to</div>

            <div className="border border-[#ebebeb] bg-white rounded-xl overflow-hidden">
              <div className="grid grid-cols-[28px_1fr_110px] items-center gap-2 px-3 py-2 border-b border-[#ebebeb] bg-[#f8f8f8]">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAllAndRefresh}
                  disabled={noFlaggedRecipients}
                  aria-label="Select all"
                />
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Journal
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">
                  Entries
                </div>
              </div>

              <div className="max-h-[220px] overflow-auto">
                {recipients.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-muted-foreground">
                    {isFetching
                      ? "Loading…"
                      : "No flagged recipients found. There are no entries with missing signatures."}
                  </div>
                ) : (
                  recipients.map((r) => (
                    <label
                      key={r.notaryId}
                      className="grid grid-cols-[28px_1fr_110px] items-center gap-2 px-3 py-3 border-b border-[#ebebeb] last:border-b-0 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedNotaryIds.has(r.notaryId)}
                        onChange={() => toggleRecipientAndRefresh(r.notaryId)}
                        aria-label={`Select ${r.notaryName}`}
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {r.notaryName}
                        </div>
                        {r.email && (
                          <div className="text-xs text-muted-foreground">
                            {r.email}
                          </div>
                        )}
                        {/* Req 1: Show Entry IDs */}
                        {r.entryIds.length > 0 && (
                          <div className="text-xs text-blue-600 mt-0.5">
                            {r.entryIds
                              .map((id) => `JRN-CA-${id.padStart(5, "0")}`)
                              .join(", ")}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-foreground text-right">
                        ({r.count} {r.count === 1 ? "entry" : "entries"})
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Req 2 & 3: Email Composer with prefilled template ──────────── */}
          <div className="space-y-3">
            <div className="text-[16px] font-bold text-foreground">
              Email Composer
            </div>

            {/* Subject field */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-foreground">
                Subject
              </label>
              <Input
                id="email-subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (e.target.value.trim().length > 0) setSubjectError("");
                }}
                className={cn(
                  "border-[#ebebeb]",
                  subjectError && "border-red-500 focus-visible:ring-red-500",
                )}
                placeholder="Enter email subject"
              />
              {subjectError && (
                <p className="text-xs text-red-500 mt-1">{subjectError}</p>
              )}
            </div>

            {/* Rich text editor / body */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-foreground">
                Rich Text Editor
              </label>

              <div
                className={cn(
                  "border border-[#ebebeb] rounded-xl bg-white overflow-hidden",
                  bodyError && "border-red-500",
                )}
              >
                <div className="flex items-center gap-1 px-2 py-2 border-b border-[#ebebeb] bg-[#f8f8f8]">
                  <Button variant="ghost" size="icon-xs">
                    <Bold />
                  </Button>
                  <Button variant="ghost" size="icon-xs">
                    <Italic />
                  </Button>
                  <Button variant="ghost" size="icon-xs">
                    <Underline />
                  </Button>
                  <div className="w-px h-4 bg-[#ebebeb] mx-1" />
                  <Button variant="ghost" size="icon-xs">
                    <Link2 />
                  </Button>
                  <Button variant="ghost" size="icon-xs">
                    <List />
                  </Button>
                  <Button variant="ghost" size="icon-xs">
                    <ListOrdered />
                  </Button>
                  <Button variant="ghost" size="icon-xs">
                    <AlignLeft />
                  </Button>
                </div>

                <textarea
                  id="email-body"
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    if (e.target.value.trim().length > 0) setBodyError("");
                  }}
                  className="w-full min-h-[220px] resize-none p-3 text-sm text-foreground outline-none"
                />
              </div>
              {bodyError && (
                <p className="text-xs text-red-500 mt-1">{bodyError}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Req 8: Disable send when no flagged recipients ───────────────── */}
        <DialogFooter className="p-6 border-t border-[#ebebeb] flex-row justify-end gap-3">
          <Button
            variant="outline"
            className="border-[#ebebeb]"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            id="send-reminder-btn"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={
              noFlaggedRecipients ||
              selectedCount === 0 ||
              sendMutation.isPending
            }
            onClick={onSend}
          >
            {sendMutation.isPending
              ? "Sending…"
              : noFlaggedRecipients
                ? "No Recipients"
                : `Send ${selectedCount} Email${selectedCount === 1 ? "" : "s"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
