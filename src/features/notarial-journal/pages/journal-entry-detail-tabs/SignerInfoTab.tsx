import {
  AlertTriangle,
  User,
  FilePlus,
  ChevronDown,
  CheckCircle2,
  Check,
  XCircle,
  BookOpen,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JournalEntrySignerResponse } from "../../api";

export const SignerInfoTab = ({
  data,
}: {
  data: JournalEntrySignerResponse | null;
}) => {
  const signerName = data?.signer?.fullName ?? "";
  const updatedAt = data?.updatedAt ?? null;

  return (
    <div className="space-y-6">
      {/* Top Alert Banner */}
      <div className="bg-white border border-[#ebebeb] p-6 lg:px-8 py-6 rounded-xl shadow-sm flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Verification Pending
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Signer Verification
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            Complete the following fields to satisfy legal requirements for the
            statutory journal entry. Ensure all identification details match the
            presented documents.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-10 px-6 text-xs transition-all w-full lg:w-auto">
            Finalize Entry
          </Button>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Verification Status
            </p>
            <div className="flex flex-row items-center justify-end gap-1.5 mt-0.5 text-red-500">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">Incomplete Data</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-medium mt-1">
            Date & Time: {updatedAt ?? "-"}
          </p>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Forms (Steps) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Signer Information */}
          <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#ebebeb]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#c4a484]" />
                <h3 className="text-sm font-bold text-foreground">
                  Signer Information
                </h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Step 1 of 3
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      placeholder="As it appears on identification"
                      defaultValue={signerName}
                      className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2">
                      Residential Address
                    </label>
                    <textarea
                      placeholder="Street, City, State, ZIP Code"
                      className="w-full h-24 p-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md resize-none placeholder:text-muted-foreground/50"
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-2 text-right">
                    Signer Journal Signature
                  </label>
                  <div className="border border-[#ebebeb] bg-[#2a4d44] h-36 flex flex-col items-center justify-center relative rounded-lg">
                    <span className="absolute bottom-2 right-2 font-['Inter'] italic text-white/50 text-2xl rotate-[-10deg]">
                      J.Doe
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-right mt-2 font-medium underline uppercase tracking-widest cursor-pointer hover:text-foreground">
                    Provided by Signer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Identification Details */}
          <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#ebebeb]">
              <div className="flex items-center gap-2">
                <FilePlus className="w-4 h-4 text-[#c4a484]" />
                <h3 className="text-sm font-bold text-foreground">
                  Identification Details
                </h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Step 2 of 3
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-2">
                    ID Type
                  </label>
                  <div className="relative">
                    <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md text-foreground">
                      <option>Driver's License</option>
                      <option>Passport</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-2">
                    Issuing Authority
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. State of California"
                    className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-2">
                    ID Number
                  </label>
                  <input
                    type="text"
                    placeholder="Serial or license number"
                    className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Notary's Confirmation */}
          <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#ebebeb]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#c4a484]" />
                <h3 className="text-sm font-bold text-foreground">
                  Notary's Confirmation
                </h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Step 3 of 3
              </span>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2">
                      Identification Method
                    </label>
                    <div className="relative">
                      <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md text-foreground">
                        <option>Government-issued ID</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2">
                      Document Description
                    </label>
                    <textarea
                      placeholder="Power of Attorney / Deed / Affidavit..."
                      className="w-full h-24 p-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md resize-none placeholder:text-muted-foreground/50"
                    ></textarea>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2">
                      Notary Fee ($)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="10.00"
                        value="10.000"
                        readOnly
                        className="w-full h-10 px-3 border border-r-0 border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-l-md text-foreground"
                      />
                      <div className="h-10 px-4 flex items-center border border-[#ebebeb] bg-[#f8f8f8] text-muted-foreground rounded-r-md">
                        <span className="text-sm font-bold">$</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-2">
                      Venue
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="w-16 text-sm text-muted-foreground">
                          State:
                        </span>
                        <div className="relative flex-1">
                          <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md text-foreground">
                            <option>California</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-sm text-muted-foreground">
                          County:
                        </span>
                        <div className="relative flex-1">
                          <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-md text-foreground">
                            <option>Los Angeles</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right pt-2">
                    <p className="text-[10px] text-muted-foreground font-medium underline uppercase tracking-widest cursor-pointer hover:text-foreground">
                      Verified by Notary
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Boxes */}
        <div className="space-y-6">
          {/* Verification Method Card */}
          <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm flex flex-col">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-[#ebebeb]">
              <CheckCircle2 className="w-4 h-4 text-[#c4a484]" />
              <h3 className="text-sm font-bold text-foreground">
                Verification Method
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="border border-[#c4a484] bg-white rounded-xl p-4 flex items-start justify-between cursor-pointer shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#c4a484]"></div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    Physical Presence
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                    Signer is personally known or appears in person
                  </p>
                </div>
                <div className="w-5 h-5 rounded-md border border-[#c4a484] flex items-center justify-center bg-[#fdf2e3] shrink-0 mt-1">
                  <Check className="w-3 h-3 text-[#c4a484]" />
                </div>
              </div>

              <div className="border border-[#ebebeb] bg-white rounded-xl p-4 flex items-start justify-between cursor-pointer hover:border-gray-300 transition-colors">
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    RON (Remote Online)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                    Audio-visual technology verification
                  </p>
                </div>
                <div className="w-5 h-5 rounded-md border border-gray-300 flex items-center justify-center shrink-0 mt-1"></div>
              </div>
            </div>
          </div>

          {/* Compliance Checklist Card */}
          <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm flex flex-col">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-[#ebebeb]">
              <CheckCircle2 className="w-4 h-4 text-[#c4a484]" />
              <h3 className="text-sm font-bold text-foreground">
                Compliance Checklist
              </h3>
            </div>
            <div className="p-6 space-y-4 flex flex-col gap-3">
              <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    ID Type Selected
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">
                  Valid
                </span>
              </div>

              <div className="border border-gray-200 bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-4 h-4 rounded-sm border border-gray-400"></div>
                  <span className="text-sm font-semibold">Name Matching</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
                  Missing
                </span>
              </div>

              <div className="border border-red-200 bg-red-50 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Expiration Status
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-red-600">
                  Invalid
                </span>
              </div>
            </div>
          </div>

          {/* Attached Document Card */}
          <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm flex flex-col">
            <div className="px-6 py-4 flex items-center gap-2 border-b border-[#ebebeb]">
              <BookOpen className="w-4 h-4 text-[#c4a484]" />
              <h3 className="text-sm font-bold text-foreground">
                Attached Document
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#ebebeb] rounded-xl p-4 hover:bg-[#f8f8f8] cursor-pointer transition-colors text-center h-24">
                  <Download className="w-5 h-5 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Customer Profile
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#ebebeb] rounded-xl p-4 hover:bg-[#f8f8f8] cursor-pointer transition-colors text-center h-24">
                  <Download className="w-5 h-5 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    Signed document
                    <br />
                    attached
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-muted-foreground block mb-2">
                  Status
                </span>
                <div className="bg-green-100/50 border border-green-200 p-3 flex gap-2 items-start rounded-lg mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-green-800">
                    information is verified and secured by the state.
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-3 flex gap-2 items-start rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-yellow-800 leading-tight">
                    <span className="font-bold">SYSTEM NOTE:</span> [The records
                    were last updated on 2026-03-19]
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#ebebeb]">
                <button className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground underline">
                  Discard Changes
                </button>
                <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-10 px-6 text-xs transition-all shadow-sm">
                  Next Step
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
