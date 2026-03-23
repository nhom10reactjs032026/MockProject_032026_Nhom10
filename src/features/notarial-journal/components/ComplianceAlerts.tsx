import React from "react";
import { Edit3, Fingerprint } from "lucide-react";

export const ComplianceAlerts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-[#fff9f0] border border-[#ebebeb] rounded-none p-6 flex gap-4 items-start shadow-sm">
        <div className="p-2 bg-[#fdf2e3] text-[#c4a484] rounded-sm">
          <Edit3 className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-[20px] font-bold text-foreground">
            Signer Signatures Missing
          </h4>
          <p className="text-[16px] text-muted-foreground leading-relaxed">
            12 entries in Texas are missing electronic signer signatures.
          </p>
          <button className="text-[16px] font-bold text-[#c4a484] uppercase tracking-[0.2em] mt-2 hover:opacity-80 transition-opacity">
            EMAIL NOTARIES
          </button>
        </div>
      </div>

      <div className="bg-red-50/50 border border-[#ebebeb] rounded-none p-6 flex gap-4 items-start shadow-sm">
        <div className="p-2 bg-red-100/50 text-red-600 rounded-sm">
          <Fingerprint className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-[20px] font-bold text-foreground">
            Missing Thumbprints
          </h4>
          <p className="text-[16px] text-muted-foreground leading-relaxed">
            42 entries in California require mandatory thumbprint verification.
          </p>
          <button className="text-[16px] font-bold text-red-600 uppercase tracking-[0.2em] mt-2 hover:opacity-80 transition-opacity">
            REVIEW BATCH
          </button>
        </div>
      </div>
    </div>
  );
};
