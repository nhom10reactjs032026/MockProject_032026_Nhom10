import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function formatActTypeLabel(value: string) {
  const normalized = (value ?? "").trim();
  if (!normalized) return "-";
  return normalized
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface JournalToolbarProps {
  status: "All Statuses" | "Completed" | "Draft" | "Action Required";
  setStatus: (v: "All Statuses" | "Completed" | "Draft" | "Action Required") => void;
  actType: string;
  setActType: (v: string) => void;
  stateCode: string;
  setStateCode: (v: string) => void;
  notaryQuery: string;
  setNotaryQuery: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  actTypes: string[];
  states: any[];
  setPage: (v: number) => void;
}

export const JournalToolbar = ({
  status,
  setStatus,
  actType,
  setActType,
  stateCode,
  setStateCode,
  notaryQuery,
  setNotaryQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  actTypes,
  states,
  setPage,
}: JournalToolbarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 p-6 border-b border-[#ebebeb]">
      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          STATUS
        </label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(
              e.target.value as
                | "All Statuses"
                | "Completed"
                | "Draft"
                | "Action Required"
            );
            setPage(1);
          }}
          className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground"
        >
          <option>All Statuses</option>
          <option>Completed</option>
          <option>Draft</option>
          <option>Action Required</option>
        </select>
      </div>
      {/* DATE RANGE */}
      <div className="flex flex-col gap-1.5 lg:col-span-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          DATE RANGE
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-2 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] text-foreground h-10 w-full flex-1"
          />
          <span className="text-muted-foreground hidden sm:inline">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-2 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] text-foreground h-10 w-full flex-1"
          />
        </div>
      </div>
      {/* ACT TYPE */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          ACT TYPE
        </label>
        <select
          value={actType}
          onChange={(e) => {
            setActType(e.target.value);
            setPage(1);
          }}
          className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground"
        >
          <option value="All Acts">All Acts</option>
          {actTypes.map((t) => (
            <option key={t} value={t}>
              {formatActTypeLabel(t)}
            </option>
          ))}
        </select>
      </div>
      {/* NOTARY */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          NOTARY
        </label>
        <Input
          placeholder="Name or ID"
          value={notaryQuery}
          onChange={(e) => {
            setNotaryQuery(e.target.value);
            setPage(1);
          }}
          className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus-visible:ring-[#c4a484] text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>
      {/* STATE */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          STATE
        </label>
        <select
          value={stateCode}
          onChange={(e) => {
            setStateCode(e.target.value);
            setPage(1);
          }}
          className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground"
        >
          <option value="All States">All States</option>
          {states.map((s) => (
            <option key={s.stateCode} value={s.stateCode}>
              {s.stateName}
            </option>
          ))}
        </select>
      </div>
      {/* CLEAR BUTTON */}
      <div className="flex flex-col gap-1.5 justify-end">
        <Button
          onClick={() => {
            setStatus("All Statuses");
            setActType("All Acts");
            setStateCode("All States");
            setNotaryQuery("");
            setPage(1);
            const d = new Date();
            setEndDate(d.toISOString().split("T")[0]);
            d.setDate(d.getDate() - 30);
            setStartDate(d.toISOString().split("T")[0]);
          }}
          variant="outline"
          className="h-10 border-[#ebebeb] bg-[#f8f8f8] text-[#c4a484] font-bold uppercase tracking-widest text-[11px] hover:bg-[#c4a484]/10 w-full"
        >
          CLEAR ALL
        </Button>
      </div>
    </div>
  );
};
