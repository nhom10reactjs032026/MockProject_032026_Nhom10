import { Edit3, Fingerprint } from "lucide-react";
import { useState } from "react";

import { SendReminderMissingSignaturesDialog } from "./modals/SendReminderMissingSignaturesDialog";
import { BatchReviewMissingThumbprintsDialog } from "./modals/BatchReviewMissingThumbprintsDialog";
import {
  useMissingSignatureRecipients,
  useMissingThumbprintsBatch,
} from "../api";

export const ComplianceAlerts = () => {
  const [sendReminderOpen, setSendReminderOpen] = useState(false);
  const [batchReviewOpen, setBatchReviewOpen] = useState(false);

  // Req 6 (SC_010): Dynamic count for missing signatures
  const { data: signatureRecipients = [] } = useMissingSignatureRecipients({
    stateCode: "TX",
  });
  const totalMissingSignatures = signatureRecipients.reduce(
    (sum, r) => sum + r.count,
    0,
  );

  // Req 6 (SC_011): Dynamic count for missing thumbprints
  const { data: thumbprintsData } = useMissingThumbprintsBatch({
    stateCode: "CA",
    page: 1,
    pageSize: 24,
  });
  const totalMissingThumbprints = thumbprintsData?.total ?? 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-[#fff9f0] border border-[#ebebeb] rounded-xl p-6 flex gap-4 items-start shadow-sm">
          <div className="p-2 bg-[#fdf2e3] text-[#c4a484] rounded-lg">
            <Edit3 className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="text-[20px] font-bold text-foreground">
              Signer Signatures Missing
            </h4>
            <p className="text-[16px] text-muted-foreground leading-relaxed">
              {totalMissingSignatures} entries in Texas are missing electronic
              signer signatures.
            </p>
            <button
              onClick={() => setSendReminderOpen(true)}
              className="text-[16px] font-bold text-[#c4a484] uppercase tracking-[0.2em] mt-2 hover:opacity-80 transition-opacity"
            >
              EMAIL NOTARIES
            </button>
          </div>
        </div>

        <div className="bg-red-50/50 border border-[#ebebeb] rounded-xl p-6 flex gap-4 items-start shadow-sm">
          <div className="p-2 bg-red-100/50 text-red-600 rounded-lg">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="text-[20px] font-bold text-foreground">
              Missing Thumbprints
            </h4>
            <p className="text-[16px] text-muted-foreground leading-relaxed">
              {totalMissingThumbprints} entries in California require mandatory
              thumbprint verification.
            </p>
            <button
              onClick={() => setBatchReviewOpen(true)}
              className="text-[16px] font-bold text-red-600 uppercase tracking-[0.2em] mt-2 hover:opacity-80 transition-opacity"
            >
              REVIEW BATCH
            </button>
          </div>
        </div>
      </div>

      <SendReminderMissingSignaturesDialog
        open={sendReminderOpen}
        onOpenChange={setSendReminderOpen}
      />
      <BatchReviewMissingThumbprintsDialog
        open={batchReviewOpen}
        onOpenChange={setBatchReviewOpen}
      />
    </>
  );
};
