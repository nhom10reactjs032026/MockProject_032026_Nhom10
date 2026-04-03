import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EntryDataTab } from "../components/journal-entry-detail-tabs/EntryDataTab";
import { SignerInfoTab } from "../components/journal-entry-detail-tabs/SignerInfoTab";
import {
  ChevronLeft,
  Download,
  Printer,
  Link as LinkIcon,
  User,
  Fingerprint,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJournalEntryDetail, useJournalEntrySignerInfo } from "../api";
import { LoadingState } from "../../../components/common/errors/LoadingState";
import { ErrorState } from "../../../components/common/errors/ErrorState";
import { ErrorBoundary } from "../../../components/common/errors/ErrorBoundary";

const tabs = [
  { id: "entry-data", label: "Entry Data", icon: User },
  { id: "signer-info", label: "Signer & ID Information", icon: User },
  { id: "signature", label: "Signature / Thumbprint", icon: Fingerprint },
  { id: "linked-act", label: "Linked Notarial Act", icon: LinkIcon },
  { id: "audit-log", label: "Audit Log", icon: BookOpen },
];

export const JournalEntryDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const entryId = searchParams.get("id") ?? "1";

  const detailQuery = useJournalEntryDetail(entryId);
  const signerQuery = useJournalEntrySignerInfo(entryId);

  const [activeTab, setActiveTab] = useState("entry-data");

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/notary-journal");
    }
  };

  if (detailQuery.isLoading || signerQuery.isLoading) {
    return (
      <div className="p-8">
        <LoadingState message="Loading journal entry details..." />
      </div>
    );
  }

  if (detailQuery.isError || signerQuery.isError) {
    return (
      <div className="p-8">
        <ErrorState
          title="Error loading entry"
          message="Could not load the journal entry. It may have been deleted or there is a network issue."
          retry={() => {
            if (detailQuery.isError) void detailQuery.refetch();
            if (signerQuery.isError) void signerQuery.refetch();
          }}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackMessage="Failed to render journal entry details">
      <div className="transition-colors duration-500 font-['Plus_Jakarta_Sans']">
        <section className="py-6 px-6 flex-1">
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Header Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white border border-[#ebebeb] flex items-center justify-center rounded-lg shadow-sm">
                  <BookOpen className="w-5 h-5 text-[#c4a484]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Journal Entry Details
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Viewing archived legal record
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="bg-white border-[#ebebeb] text-foreground font-bold h-9 px-4 hover:bg-[#f8f8f8] text-xs transition-all"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  variant="outline"
                  className="bg-white border-[#ebebeb] text-foreground font-bold h-9 px-4 hover:bg-[#f8f8f8] text-xs transition-all"
                >
                  <Printer className="w-4 h-4 mr-1" />
                  Print Record
                </Button>
                <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-9 px-4 text-xs transition-all shadow-sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Horizontal Tab Bar */}
            <div className="flex items-center gap-8 border-b border-[#ebebeb] bg-white px-6 pt-2 overflow-x-auto rounded-xl shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-sm font-semibold flex items-center gap-2 transition-colors relative whitespace-nowrap ${
                      isActive
                        ? "text-[#c4a484]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c4a484]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === "entry-data" && (
              <EntryDataTab entry={detailQuery.data ?? null} />
            )}
            {activeTab === "signer-info" && (
              <SignerInfoTab 
                data={signerQuery.data ?? null} 
                onNext={() => setActiveTab("signature")}
              />
            )}
            {(activeTab === "signature" ||
              activeTab === "linked-act" ||
              activeTab === "audit-log") && (
              <div className="bg-white border border-dashed border-[#ebebeb] p-20 text-center text-muted-foreground italic text-sm rounded-xl">
                {tabs.find((t) => t.id === activeTab)?.label} — Coming soon...
              </div>
            )}
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};
