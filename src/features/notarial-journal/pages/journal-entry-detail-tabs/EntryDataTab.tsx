import React from "react";
import { Lock, Link as LinkIcon, Info, User, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const EntryDataTab = () => {
  return (
    <>
      <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm p-8">
        {/* Top Details */}
        <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#ebebeb] pb-8 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                JE-2023-8842
              </h2>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-200 font-bold rounded-none text-[10px] uppercase px-2 py-0.5"
              >
                <Lock className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground font-semibold">
              <LinkIcon className="w-4 h-4" />
              Linked Notarial Act:{" "}
              <span className="text-[#c4a484]">#NA-9910</span>
            </div>
          </div>
          <div className="flex flex-col md:text-right gap-1 border-l-0 md:border-l border-[#ebebeb] md:pl-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Created By
              </span>
              <p className="text-sm font-semibold text-foreground">
                Sarah Jenkins, Notary Public
              </p>
            </div>
            <div className="mt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Signed On
              </span>
              <p className="text-sm font-semibold text-foreground">
                Oct 24, 2023 14:32 PM
              </p>
            </div>
          </div>
        </div>

        {/* Core Entry Data */}
        <div className="py-8 border-b border-[#ebebeb]">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Core Entry Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <span className="absolute -left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-[#c4a484]"></span>
              <label className="text-xs font-bold text-muted-foreground flex items-center gap-1 mb-2">
                Date & Time <Info className="w-3 h-3" />
              </label>
              <div className="bg-[#f8f8f8] border border-[#ebebeb] p-3 text-sm font-semibold text-foreground">
                October 24, 2023 —
                <br />
                14:32:11
              </div>
              <p className="text-[10px] font-bold uppercase text-[#c4a484] mt-2 tracking-widest">
                Auto-Populated
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground mb-2 block">
                Act Type
              </label>
              <div className="bg-white border border-[#ebebeb] p-3 text-sm font-semibold text-foreground flex items-center h-[66px]">
                Acknowledgment
              </div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mt-2 tracking-widest">
                Manual Entry
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground mb-2 block">
                Venue/State
              </label>
              <div className="bg-[#f8f8f8] border border-[#ebebeb] p-3 text-sm font-semibold text-foreground flex items-center h-[66px]">
                Kings County, New York
              </div>
              <p className="text-[10px] font-bold uppercase text-[#c4a484] mt-2 tracking-widest">
                Auto-Populated (GPS)
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground mb-2 block">
                Notarial Fee
              </label>
              <div className="bg-white border border-[#ebebeb] p-3 text-sm font-semibold text-foreground flex items-center h-[66px]">
                $15.00 USD
              </div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mt-2 tracking-widest">
                Manual Entry
              </p>
            </div>
          </div>
        </div>

        {/* Signer Information */}
        <div className="py-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Signer Information
          </h3>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex gap-4 flex-1">
              <div className="w-16 h-16 bg-[#f8f8f8] rounded-none flex items-center justify-center shrink-0 border border-[#ebebeb]">
                <User className="w-8 h-8 text-[#c4a484]" />
              </div>
              <div className="w-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Signer Name
                </span>
                <h4 className="text-lg font-bold text-foreground mb-4">
                  Michael R. Thompson
                </h4>

                <div className="border border-[#ebebeb] p-4 bg-white">
                  <div className="flex justify-between items-center border-b border-[#ebebeb] pb-3 mb-3">
                    <span className="text-sm font-bold text-muted-foreground">
                      ID Type:
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      Passport (Exp. 2028)
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-muted-foreground">
                      Verification:
                    </span>
                    <span className="text-sm font-bold text-green-600 ml-2 text-right">
                      Verified via Knowledge-Based Auth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#fdf2e3] border border-[#c4a484]/30 p-5 rounded-none h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Fingerprint className="w-5 h-5 text-[#c4a484]" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#c4a484]">
                    Biometric Match Hash
                  </h4>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">
                  SHA-256:
                </p>
                <p className="text-xs text-foreground font-mono break-all leading-relaxed">
                  8e45a2c1d8f76b9e4a3c2b1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Protocol Card */}
        <div className="bg-white border border-[#ebebeb] p-8 rounded-none shadow-sm">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Field Source Protocol
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c4a484]"></span>
              <span className="text-sm font-bold text-foreground">
                System Auto-Populated (Locked)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
              <span className="text-sm font-bold text-muted-foreground">
                Manual Entry (Audited)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="text-sm font-bold text-muted-foreground">
                Third-Party API Hook
              </span>
            </div>
          </div>
        </div>

        {/* Chain of Custody */}
        <div className="bg-white border border-[#ebebeb] p-8 rounded-none shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Digital Chain of Custody
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c4a484]">
              Integrity Verified
            </span>
          </div>

          <div className="relative border-l-2 border-[#ebebeb] ml-2 space-y-8 flex-1">
            <div className="relative pl-6">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#c4a484]"></span>
              <h4 className="text-sm font-bold text-foreground">
                Record Finalized & Encrypted
              </h4>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                Oct 24, 2023 14:35:01 PM - System
              </p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></span>
              <h4 className="text-sm font-semibold text-muted-foreground">
                Signer Identity Confirmed
              </h4>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                Oct 24, 2023 14:31:55 PM - Sarah Jenkins
              </p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></span>
              <h4 className="text-sm font-semibold text-muted-foreground">
                Journal Entry Created
              </h4>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                Oct 24, 2023 14:30:12 PM - Sarah Jenkins
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
