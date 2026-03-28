import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  useActTypes,
  useJournalEntries,
  useStates,
  type ListJournalEntriesParams,
} from "../api";
import { formatCurrency, formatDateTime } from "../utils/format";

function formatActTypeLabel(value: string) {
  const normalized = (value ?? "").trim();
  if (!normalized) return "-";
  return normalized
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const JournalManagerTab = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<
    "All Statuses" | "Completed" | "Draft" | "Action Required"
  >("All Statuses");
  const [actType, setActType] = useState<string>("All Acts");
  const [stateCode, setStateCode] = useState<string>("All States");
  const [notaryQuery, setNotaryQuery] = useState<string>("");

  const { data: actTypesData } = useActTypes();
  const actTypes = actTypesData ?? [];

  const { data: statesData } = useStates();
  const states = statesData ?? [];

  const queryParams: ListJournalEntriesParams = useMemo(() => {
    const mappedStatus: ListJournalEntriesParams["status"] =
      status === "All Statuses" ? "All" : status;
    const mappedActType: ListJournalEntriesParams["actType"] =
      actType === "All Acts" ? "All" : actType;
    const mappedStateCode: ListJournalEntriesParams["stateCode"] =
      stateCode === "All States" ? "All" : stateCode;

    return {
      page: 1,
      pageSize: 20,
      status: mappedStatus,
      actType: mappedActType,
      stateCode: mappedStateCode,
      notaryQuery:
        notaryQuery.trim().length > 0 ? notaryQuery.trim() : undefined,
    };
  }, [status, actType, stateCode, notaryQuery]);

  const { data } = useJournalEntries(queryParams);
  const journalEntries = data?.items ?? [];

  return (
    <div className="space-y-8">
      {/* Table Container */}
      <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm flex flex-col mt-4">
        {/* Toolbar - SC_002 Accurate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-6 border-b border-[#ebebeb]">
          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              STATUS
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "All Statuses"
                    | "Completed"
                    | "Draft"
                    | "Action Required",
                )
              }
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
              onChange={(e) => setActType(e.target.value)}
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
              onChange={(e) => setNotaryQuery(e.target.value)}
              className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus-visible:ring-[#c4a484] text-sm rounded-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          {/* STATE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              STATE
            </label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
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
              }}
              variant="outline"
              className="h-10 border-[#ebebeb] bg-[#f8f8f8] text-[#c4a484] font-bold uppercase tracking-widest text-[11px] rounded-none hover:bg-[#c4a484]/10 w-full"
            >
              CLEAR ALL
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-[1100px]">
            <TableHeader className="bg-white">
              <TableRow className="border-b border-[#ebebeb]">
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4 px-6">
                  ENTRY ID
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  DATE/TIME
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  NOTARY
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  ACT TYPE
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  SIGNER NAME
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  FEE
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  STATUS
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  RISK FLAGS
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4 text-right pr-6">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalEntries.map((log) => (
                <TableRow
                  key={log.id}
                  className="hover:bg-[#f8f8f8]/50 transition-colors group border-b border-[#ebebeb]"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#c4a484] text-sm">
                        #{log.id}
                      </span>
                      {log.riskFlags === "Warning" && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
                      )}
                      {log.status === "Action Required" && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                    {formatDateTime(log.dateTime)}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm">
                    {log.notaryName}
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-3 py-1 bg-[#f8f8f8] border border-[#ebebeb] text-muted-foreground text-xs font-semibold rounded-none">
                      {log.actType}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground font-bold py-4 text-sm whitespace-nowrap">
                    {log.signerName}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm">
                    {log.fee ? formatCurrency(log.fee) : "-"}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {log.status === "Completed" && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 font-bold hover:bg-green-50 rounded-none text-[10px] uppercase tracking-widest px-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shrink-0"></span>{" "}
                        {log.status}
                      </Badge>
                    )}
                    {log.status === "Draft" && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 font-bold hover:bg-blue-50 rounded-none text-[10px] uppercase tracking-widest px-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shrink-0"></span>{" "}
                        {log.status}
                      </Badge>
                    )}
                    {log.status === "Locked" && (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-700 border-gray-200 font-bold hover:bg-gray-100 rounded-none text-[10px] uppercase tracking-widest px-2"
                      >
                        <Lock className="w-3 h-3 mr-1.5 text-gray-500 shrink-0" />{" "}
                        {log.status}
                      </Badge>
                    )}
                    {log.status === "Action Required" && (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 font-bold hover:bg-red-50 rounded-none text-[10px] uppercase tracking-widest px-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shrink-0"></span>{" "}
                        {log.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {log.riskFlags === "None" ? (
                      <span className="text-sm font-semibold text-foreground">
                        None
                      </span>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 font-bold hover:bg-yellow-50 rounded-none text-[10px] uppercase tracking-widest px-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 shrink-0"></span>{" "}
                        {log.riskFlags}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6 whitespace-nowrap">
                    <button
                      onClick={() =>
                        navigate(
                          `/notary-journal/detail?id=${encodeURIComponent(log.id)}`,
                        )
                      }
                      className="text-[12px] font-bold text-[#c4a484] hover:opacity-80 transition-opacity"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground font-medium text-center sm:text-left">
            Showing 1 to{" "}
            {Math.min(
              journalEntries.length,
              data?.total ?? journalEntries.length,
            )}{" "}
            of {data?.total?.toLocaleString?.() ?? "-"} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#c4a484] text-white font-bold text-sm rounded-none">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-none transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-none transition-colors">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-muted-foreground font-bold text-sm">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-none transition-colors">
              250
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
