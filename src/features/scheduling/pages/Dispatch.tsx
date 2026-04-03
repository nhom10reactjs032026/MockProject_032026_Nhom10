import React, { useState, useEffect } from "react";
import { ArrowLeft, Info, Loader2 } from "lucide-react";
import { JobInfoCard } from "../components/dispatch/JobInfoCard";
import { NotaryCard } from "../components/dispatch/NotaryCard";
import { EmptyNotaryState } from "../components/dispatch/EmptyNotaryState";
import { useAssignNotary } from "../hooks/useJobs";
import { useNotaries } from "../hooks/useNotaries";
import { useUIStore } from "../store/useUIStore";
import { useJobStore } from "../store/useJobStore";
import type { Notary, DispatchJob } from "../types/scheduling.types";
import { mockDispatchJob } from "../data/mockData";

export const Dispatch: React.FC = () => {
  // Lấy selected job từ store
  const { selectedJob } = useJobStore();
  const { showToast } = useUIStore();
  
  // State cho selected notary
  const [selectedNotaryId, setSelectedNotaryId] = useState<string>("");
  const [jobNote, setJobNote] = useState(mockDispatchJob.note ?? "");
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  
  // Fetch notaries từ API
  const { data: notaries = [], isLoading: notariesLoading } = useNotaries({
    serviceType: selectedJob?.serviceType,
    state: selectedJob?.state,
  });
  
  // Assign notary mutation
  const assignNotaryMutation = useAssignNotary();
  
  // Set default selected notary khi data load xong
  useEffect(() => {
    if (notaries.length > 0 && !selectedNotaryId) {
      setSelectedNotaryId(notaries[0]?.id ?? "");
    }
  }, [notaries, selectedNotaryId]);
  
  const selectedNotary = notaries.find(n => n.id === selectedNotaryId);
  
  // Handle assign notary
  const handleAssign = () => {
    if (selectedNotary && selectedJob) {
      assignNotaryMutation.mutate(
        { jobId: selectedJob.id, notaryId: selectedNotary.id },
        {
          onSuccess: () => {
            setJobNote("");
          }
        }
      );
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    if (jobNote !== mockDispatchJob.note) {
      setShowBackConfirm(true);
    } else {
      console.log("Go back to job list");
    }
  };
  
  // Handle leave confirmation
  const handleLeave = () => {
    setShowBackConfirm(false);
    console.log("Leave without saving");
  };
  
  // Tạo currentJob với type DispatchJob từ selectedJob hoặc mock
  const currentJob: DispatchJob = selectedJob 
    ? {
        id: selectedJob.id,
        service: selectedJob.serviceType,
        client: selectedJob.customerName,
        location: selectedJob.state,
        time: `${selectedJob.date} • ${selectedJob.timeStart}–${selectedJob.timeEnd}`,
        signers: "2 persons", // Có thể lấy từ API sau
        type: selectedJob.serviceType,
        note: jobNote,
      }
    : mockDispatchJob;
  
  // Show loading state
  if (notariesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#c4a484]" />
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dispatch Job</h1>
          <p className="text-sm text-gray-400">
            Assign a notary to job #{currentJob.id}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Job Info */}
        <JobInfoCard 
          job={currentJob} 
          onNoteChange={setJobNote}
        />

        {/* Right Panel - Notary List */}
        <div className="flex-1 bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#ebebeb]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Suitable Notary List</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {notaries.length} matches found
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Info className="w-3.5 h-3.5" />
                <span>Sorted by rating & distance</span>
              </div>
            </div>
          </div>

          <div className="p-5 max-h-[500px] overflow-y-auto space-y-3">
            {notaries.length > 0 ? (
              notaries.map((notary) => (
                <NotaryCard
                  key={notary.id}
                  notary={notary}
                  isSelected={selectedNotaryId === notary.id}
                  onSelect={() => setSelectedNotaryId(notary.id)}
                  onViewProfile={() => {
                    showToast(`Viewing profile: ${notary.name}`, "info");
                  }}
                />
              ))
            ) : (
              <EmptyNotaryState 
                onExpandSearch={() => {
                  showToast("Expanding search radius...", "info");
                }}
              />
            )}
          </div>

          {/* Footer with Assign Button */}
          <div className="p-5 border-t border-[#ebebeb] bg-[#faf9f8]">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {selectedNotary ? (
                  <span className="text-gray-600">
                    Selected: <span className="font-semibold text-[#c4a484]">{selectedNotary.name}</span>
                  </span>
                ) : (
                  <span className="text-gray-400">No notary selected</span>
                )}
              </div>
              <button
                onClick={handleAssign}
                disabled={!selectedNotary || assignNotaryMutation.isPending}
                className="px-6 py-2.5 rounded-xl bg-[#c4a484] hover:bg-[#b89474] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
              >
                {assignNotaryMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  "Assign to Job"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back Confirmation Modal */}
      {showBackConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Unsaved changes</h3>
            <p className="text-sm text-gray-600 mb-4">
              You have unsaved notes. Are you sure you want to leave?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBackConfirm(false)}
                className="flex-1 px-4 py-2 border border-[#ebebeb] rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Stay
              </button>
              <button
                onClick={handleLeave}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};