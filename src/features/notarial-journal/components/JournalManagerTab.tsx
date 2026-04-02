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
  const [page, setPage] = useState(1);
  const pageSize = 10;
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
      page,
      pageSize,
      status: mappedStatus,
      actType: mappedActType,
      stateCode: mappedStateCode,
      notaryQuery:
        notaryQuery.trim().length > 0 ? notaryQuery.trim() : undefined,
    };
  }, [status, actType, stateCode, notaryQuery, page]);

  const journalEntriesQuery = useJournalEntries(queryParams);
  const data = journalEntriesQuery.data;
  const journalEntries = data?.items ?? [];

  const total = data?.total ?? 0;
  const currentPage = data?.page ?? page;
  const currentPageSize = data?.pageSize ?? pageSize;
  const totalPages = Math.max(1, Math.ceil(total / currentPageSize));
  const startIndex = total === 0 ? 0 : (currentPage - 1) * currentPageSize + 1;
  const endIndex = Math.min(currentPage * currentPageSize, total);

  function goToPage(nextPage: number) {
    const clamped = Math.min(Math.max(1, nextPage), totalPages);
    setPage(clamped);
  }

  const pageButtons: Array<number | "ellipsis"> = useMemo(() => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);

    for (let p = currentPage - 1; p <= currentPage + 1; p += 1) {
      if (p > 1 && p < totalPages) pages.add(p);
    }

    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result: Array<number | "ellipsis"> = [];

    for (let i = 0; i < sorted.length; i += 1) {
      const value = sorted[i];
      const prev = sorted[i - 1];
      if (i > 0 && prev !== undefined && value - prev > 1) {
        result.push("ellipsis");
      }
      result.push(value);
    }

    return result;
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-8">
      {/* Table Container */}
      <div className="bg-white border border-[#ebebeb] rounded-xl shadow-sm flex flex-col mt-4">
        {/* Toolbar - SC_002 Accurate */}
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
                    | "Action Required",
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
                    <span className="inline-flex items-center px-3 py-1 bg-[#f8f8f8] border border-[#ebebeb] text-muted-foreground text-xs font-semibold rounded-full">
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
                        className="bg-green-50 text-green-700 border-green-200 font-bold hover:bg-green-50 text-[10px] uppercase tracking-widest px-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shrink-0"></span>{" "}
                        {log.status}
                      </Badge>
                    )}
                    {log.status === "Draft" && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 font-bold hover:bg-blue-50 text-[10px] uppercase tracking-widest px-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shrink-0"></span>{" "}
                        {log.status}
                      </Badge>
                    )}
                    {log.status === "Locked" && (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-700 border-gray-200 font-bold hover:bg-gray-100 text-[10px] uppercase tracking-widest px-2"
                      >
                        <Lock className="w-3 h-3 mr-1.5 text-gray-500 shrink-0" />{" "}
                        {log.status}
                      </Badge>
                    )}
                    {log.status === "Action Required" && (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 font-bold hover:bg-red-50 text-[10px] uppercase tracking-widest px-2"
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
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 font-bold hover:bg-yellow-50 text-[10px] uppercase tracking-widest px-2"
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
            Showing {startIndex} to {endIndex} of {total.toLocaleString()}{" "}
            entries
          </span>
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1 || journalEntriesQuery.isFetching}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {pageButtons.map((p, idx) =>
              p === "ellipsis" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground font-bold text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  className={
                    p === currentPage
                      ? "w-8 h-8 flex items-center justify-center bg-[#c4a484] text-white font-bold text-sm rounded-md"
                      : "w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-md transition-colors"
                  }
                  onClick={() => goToPage(p)}
                  disabled={journalEntriesQuery.isFetching}
                  aria-label={`Page ${p}`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={() => goToPage(currentPage + 1)}
              disabled={
                currentPage >= totalPages || journalEntriesQuery.isFetching
              }
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
