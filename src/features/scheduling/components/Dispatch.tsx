import React, { useState } from "react";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import type { DispatchJob, SuitableNotary } from "../types/scheduling.types";
import { mockDispatchJob, mockSuitableNotaries } from "../data/mockData";

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 mt-0">
    {children}
  </p>
);

interface JobDetailPanelProps {
  job: DispatchJob;
}

const JobDetailPanel: React.FC<JobDetailPanelProps> = ({ job }) => (
  <div
    className="
      bg-white rounded-2xl border border-gray-100 shadow-sm p-6
      flex flex-col gap-0 flex-shrink-0
      w-full sm:w-52 lg:w-64
    "
  >
    <h2 className="text-lg font-extrabold text-gray-900 tracking-tight mb-5">
      Job #{job.id}
    </h2>

    {/* JOB ID + SERVICE */}
    <div className="grid grid-cols-2 gap-x-4 mb-4">
      <div>
        <FieldLabel>Job ID</FieldLabel>
        <span className="text-sm font-bold text-blue-600">#{job.id}</span>
      </div>
      <div>
        <FieldLabel>Service</FieldLabel>
        <span className="text-sm font-medium text-gray-700">{job.service}</span>
      </div>
    </div>

    {/* CLIENT */}
    <div className="mb-4">
      <FieldLabel>Client</FieldLabel>
      <span className="text-sm font-bold text-gray-900">{job.client}</span>
    </div>

    {/* LOCATION */}
    <div className="mb-4">
      <FieldLabel>Location</FieldLabel>
      <span className="flex items-center gap-1.5 text-sm text-gray-700">
        <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
        {job.location}
      </span>
    </div>

    {/* TIME + SIGNERS */}
    <div className="grid grid-cols-2 gap-x-4 mb-4">
      <div>
        <FieldLabel>Time</FieldLabel>
        <span className="text-sm text-gray-700">{job.time}</span>
      </div>
      <div>
        <FieldLabel>Signers</FieldLabel>
        <span className="text-sm text-gray-700">{job.signers}</span>
      </div>
    </div>

    {/* TYPE */}
    <div className="mb-4">
      <FieldLabel>Type</FieldLabel>
      <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200">
        {job.type}
      </span>
    </div>

    {/* NOTE */}
    <div className="flex-1 flex flex-col">
      <FieldLabel>A Note</FieldLabel>
      <textarea
        placeholder="Note"
        defaultValue={job.note ?? ""}
        className="
          flex-1 min-h-[80px] px-3 py-2.5 rounded-xl
          border border-gray-200 bg-gray-50
          text-sm text-gray-600 placeholder-gray-300
          resize-none outline-none
          focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
          transition-all
        "
      />
    </div>

    <div className="hidden lg:block mt-5 border-t border-gray-100" />
  </div>
);

// ─────────────────────────────────────────────────────────────
// NotaryCard — single row in the notary list
// ─────────────────────────────────────────────────────────────
interface NotaryCardProps {
  notary: SuitableNotary;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
}

const NotaryCard: React.FC<NotaryCardProps> = ({
  notary,
  isSelected,
  onSelect,
  onView,
}) => (
  <div
    onClick={onSelect}
    className={`
      flex items-center gap-3 p-4 rounded-2xl border cursor-pointer
      transition-all duration-150
      ${
        isSelected
          ? "border-blue-500 bg-blue-50/60 shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
          : "border-gray-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md"
      }
    `}
  >
    {/* Avatar with verified badge */}
    <div className="relative flex-shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
        style={{ background: notary.avatarColor }}
      >
        {notary.avatarInitials}
      </div>
      {notary.verified && (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
          <svg width={8} height={8} viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>

    {/* Info block */}
    <div className="flex-1 min-w-0">
      {/* Row 1 — name, rating, distance */}
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="text-sm font-bold text-gray-900 leading-tight">
          {notary.name}
        </span>
        <span className="flex items-center gap-1 text-[12px] font-bold text-amber-500">
          ★ <span className="text-gray-700">{notary.rating}</span>
        </span>
        <span className="text-[11px] text-gray-400">{notary.distance}</span>
      </div>

      {/* Row 2 — services, jobs */}
      <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-1">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-gray-400" />
          {notary.services}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3 text-gray-400" />
          {notary.jobs} jobs
        </span>
      </div>

      {/* Row 3 — available slot, expiry */}
      <div className="flex items-center gap-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          {notary.available}
        </span>
        <span className="text-gray-400">EXP: {notary.exp.toUpperCase()}</span>
      </div>
    </div>

    {/* View button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onView();
      }}
      className="
        flex-shrink-0 px-4 py-2 rounded-xl
        bg-blue-600 hover:bg-blue-700 active:scale-95
        text-white text-[13px] font-bold
        shadow-md shadow-blue-200
        transition-all
      "
    >
      View
    </button>

    {/* Radio indicator */}
    <div
      className={`
        flex-shrink-0 w-5 h-5 rounded-full border-2
        flex items-center justify-center
        transition-all duration-150
        ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}
      `}
    >
      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// NotaryListPanel — right column: list header + scrollable cards + assign CTA
// ─────────────────────────────────────────────────────────────
interface NotaryListPanelProps {
  notaries: SuitableNotary[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAssign: (notary: SuitableNotary) => void;
}

const NotaryListPanel: React.FC<NotaryListPanelProps> = ({
  notaries,
  selectedId,
  onSelect,
  onAssign,
}) => {
  const selectedNotary = notaries.find((n) => n.id === selectedId);

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h3 className="text-[15px] font-extrabold text-gray-900">
          Suitable Notary List
        </h3>
        <span className="text-xs text-gray-400">
          {notaries.length} matches found
        </span>
      </div>

      {/* Scrollable notary cards */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-0.5">
        {notaries.map((notary) => (
          <NotaryCard
            key={notary.id}
            notary={notary}
            isSelected={selectedId === notary.id}
            onSelect={() => onSelect(notary.id)}
            onView={() => alert(`Viewing profile: ${notary.name}`)}
          />
        ))}
      </div>

      {/* Assign CTA — always visible at bottom */}
      <div className="pt-4 flex justify-end flex-shrink-0">
        <button
          disabled={!selectedNotary}
          onClick={() => selectedNotary && onAssign(selectedNotary)}
          className="
            px-10 py-3 rounded-2xl
            bg-blue-600 hover:bg-blue-700 active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed
            text-white text-sm font-bold
            shadow-lg shadow-blue-200
            transition-all
          "
        >
          Assign
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Dispatch — composes the two panels, owns selection state
// ─────────────────────────────────────────────────────────────
export const Dispatch: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(
    mockSuitableNotaries[0]?.id ?? ""
  );

  const handleAssign = (notary: SuitableNotary) => {
    alert(`✅ Assigned ${notary.name} to Job #${mockDispatchJob.id}`);
  };

  return (
    /*
     * Layout rules:
     *  mobile  (<640px) : stacked vertically, natural height
     *  tablet+ (≥640px) : side-by-side row, fills viewport height minus
     *                      topbar (60px) + tabbar (~46px) + padding (2×20px)
     */
    <div
      className="
        flex flex-col gap-5
        sm:flex-row sm:gap-6
        sm:h-[calc(100vh-146px)]
      "
    >
      <JobDetailPanel job={mockDispatchJob} />

      <NotaryListPanel
        notaries={mockSuitableNotaries}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAssign={handleAssign}
      />
    </div>
  );
};