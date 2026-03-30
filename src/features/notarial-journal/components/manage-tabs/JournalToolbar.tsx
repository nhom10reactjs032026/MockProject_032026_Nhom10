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
  actTypes,
  states,
  setPage,
}: JournalToolbarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-6 border-b border-[#ebebeb]">
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
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          DATE RANGE
        </label>
        <div className="relative h-10 border border-[#ebebeb] bg-white flex items-center px-3 cursor-pointer">
          <span className="text-sm text-foreground">Last 30 Days</span>
          <Calendar className="absolute right-3 w-4 h-4 text-muted-foreground" />
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
