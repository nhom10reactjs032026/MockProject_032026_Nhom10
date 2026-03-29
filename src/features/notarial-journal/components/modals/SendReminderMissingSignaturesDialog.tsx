import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  List,
  ListOrdered,
  AlignLeft,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  useMissingSignatureRecipients,
  useSendMissingSignatureReminders,
} from "../../api";

export function SendReminderMissingSignaturesDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { open, onOpenChange } = props;

  const { data: recipients = [], isFetching } = useMissingSignatureRecipients({
    stateCode: "TX",
  });
  const sendMutation = useSendMissingSignatureReminders();

  const [selectedNotaryIds, setSelectedNotaryIds] = useState<Set<string>>(
    () => new Set(),
  );

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setSelectedNotaryIds(new Set());
    onOpenChange(nextOpen);
  }

  const allSelected =
    recipients.length > 0 && selectedNotaryIds.size === recipients.length;
  const selectedCount = selectedNotaryIds.size;

  const [subject, setSubject] = useState(
    "Action Required: Missing Signatures in Journal",
  );
  const [body, setBody] = useState(
    "Dear [Notary Name],\n\nOur records indicate that you have [Count] journal entries with missing signatures. Please review and electronically sign them by [Date] to maintain compliance.\n\nRefer to entries: [Entry IDs].\n\nThank you,\nCompliance Team.",
  );

  function toggleRecipient(notaryId: string) {
    setSelectedNotaryIds((prev) => {
      const next = new Set(prev);
      if (next.has(notaryId)) next.delete(notaryId);
      else next.add(notaryId);
      return next;
    });
  }

  function toggleAll() {
    setSelectedNotaryIds((prev) => {
      if (recipients.length === 0) return prev;
      if (prev.size === recipients.length) return new Set();
      return new Set(recipients.map((r) => r.notaryId));
    });
  }

  function onCancel() {
    setSelectedNotaryIds(new Set());
    onOpenChange(false);
  }

  async function onSend() {
    if (selectedNotaryIds.size === 0 || sendMutation.isPending) return;
    await sendMutation.mutateAsync({
      notaryIds: Array.from(selectedNotaryIds.values()),
      subject,
      content: body,
    });
    setSelectedNotaryIds(new Set());
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "top-0 right-0 left-auto translate-x-0 translate-y-0 h-dvh w-full max-w-[560px] rounded-none p-0 gap-0",
        )}
      >
        <div className="p-6 border-b border-[#ebebeb]">
          <DialogTitle className="text-[18px] font-bold text-foreground">
            Send Reminder: Missing Signatures
          </DialogTitle>
        </div>

        <div className="p-6 space-y-6 overflow-auto">
          <div className="space-y-3">
            <div className="text-sm font-bold text-foreground">Sending to</div>

            <div className="border border-[#ebebeb] bg-white rounded-none overflow-hidden">
              <div className="grid grid-cols-[28px_1fr_110px] items-center gap-2 px-3 py-2 border-b border-[#ebebeb] bg-[#f8f8f8]">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
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
                    {isFetching ? "Loading…" : "No recipients found."}
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
                        onChange={() => toggleRecipient(r.notaryId)}
                        aria-label={`Select ${r.notaryName}`}
                      />
                      <div className="text-sm font-medium text-foreground">
                        {r.notaryName}
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

          <div className="space-y-3">
            <div className="text-[16px] font-bold text-foreground">
              Email Composer
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-foreground">
                Subject
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-none border-[#ebebeb]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-foreground">
                Rich Text Editor
              </label>

              <div className="border border-[#ebebeb] rounded-none bg-white overflow-hidden">
                <div className="flex items-center gap-1 px-2 py-2 border-b border-[#ebebeb] bg-[#f8f8f8]">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <Bold />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <Italic />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <Underline />
                  </Button>
                  <div className="w-px h-4 bg-[#ebebeb] mx-1" />
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <Link2 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <List />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <ListOrdered />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="rounded-none"
                  >
                    <AlignLeft />
                  </Button>
                </div>

                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full min-h-[220px] resize-none p-3 text-sm text-foreground outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-[#ebebeb] flex-row justify-end gap-3">
          <Button
            variant="outline"
            className="rounded-none border-[#ebebeb]"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="rounded-none bg-blue-600 hover:bg-blue-700"
            disabled={selectedCount === 0 || sendMutation.isPending}
            onClick={onSend}
          >
            {sendMutation.isPending
              ? "Sending…"
              : `Send ${selectedCount} Email${selectedCount === 1 ? "" : "s"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
