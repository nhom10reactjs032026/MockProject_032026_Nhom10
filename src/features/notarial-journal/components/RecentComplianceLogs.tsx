import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";
import { useState, useMemo } from "react";
import {
  useJournalEntries,
  useComplianceAuditLogs,
  useThumbprintAuditLogs,
  useStates,
} from "../api";
import { formatDate } from "../utils/format";

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.at(-1)?.[0] ?? "?";
  return `${first}${last}`.toUpperCase();
}

export interface RecentComplianceLogsProps {
  stateCode?: string;
  notaryId?: string;
  startDate?: string;
  endDate?: string;
}

export const RecentComplianceLogs = ({
  stateCode: globalStateCode,
  notaryId: globalNotaryId,
  startDate: globalStartDate,
  endDate: globalEndDate,
}: RecentComplianceLogsProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  // Local filter states
  const [localEntryId, setLocalEntryId] = useState("");
  const [localNotaryQuery, setLocalNotaryQuery] = useState("");
  const [localStateCode, setLocalStateCode] = useState("All States");
  const [localStatus, setLocalStatus] = useState("All Statuses");
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");

  const { data: statesData } = useStates();
  const states = statesData ?? [];

  const filters = useMemo(
    () => ({
      page,
      pageSize,
      id: localEntryId.trim() || undefined,
      notaryQuery: localNotaryQuery.trim() || undefined,
      status: localStatus === "All Statuses" ? "All" : (localStatus as any),
      stateCode:
        localStateCode === "All States"
          ? globalStateCode === "All States"
            ? undefined
            : globalStateCode
          : localStateCode,
      notaryId: globalNotaryId === "All Offices" ? undefined : globalNotaryId,
      startDate: localStartDate || globalStartDate,
      endDate: localEndDate || globalEndDate,
    }),
    [
      page,
      pageSize,
      localEntryId,
      localNotaryQuery,
      localStatus,
      localStateCode,
      globalStateCode,
      globalNotaryId,
      localStartDate,
      globalStartDate,
      localEndDate,
      globalEndDate,
    ],
  );

  const { data, isLoading } = useJournalEntries(filters);
  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  // Req 6 (SC_010): Fetch audit logs for "Reminder Email Sent" events
  const { data: auditLogs = [] } = useComplianceAuditLogs();

  // Req 8 (SC_011): Fetch audit logs for thumbprint review decisions
  const { data: thumbprintLogs = [] } = useThumbprintAuditLogs();

  const totalPages = Math.ceil(total / pageSize);

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleClearFilters = () => {
    setLocalEntryId("");
    setLocalNotaryQuery("");
    setLocalStateCode("All States");
    setLocalStatus("All Statuses");
    setLocalStartDate("");
    setLocalEndDate("");
    setPage(1);
  };

  // Only show audit logs on the first page to avoid duplication/confusion
  const displayAuditLogs = page === 1 ? auditLogs : [];
  const displayThumbprintLogs = page === 1 ? thumbprintLogs : [];

  const startRange = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endRange = Math.min(page * pageSize, total);

  return (
    <div className="bg-white rounded-xl border border-[#ebebeb] shadow-sm mt-6">
      <div className="p-6 border-b border-[#ebebeb] flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">
          Recent Compliance Logs
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`${showFilters ? "text-[#c4a484]" : "text-muted-foreground"} hover:text-[#c4a484] transition-colors`}
        >
          {showFilters ? (
            <X className="w-5 h-5" />
          ) : (
            <Filter className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Advanced Filters Section */}
      {showFilters && (
        <div className="p-6 border-b bg-[#fcfcfc] transition-all animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
            {/* ID Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                JOURNAL ID
              </label>
              <Input
                placeholder="Search ID..."
                value={localEntryId}
                onChange={(e) => {
                  setLocalEntryId(e.target.value);
                  setPage(1);
                }}
                className="h-10 border-[#ebebeb] bg-white focus-visible:ring-[#c4a484] text-sm"
              />
            </div>

            {/* Notary Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                NOTARY NAME
              </label>
              <Input
                placeholder="Search Notary..."
                value={localNotaryQuery}
                onChange={(e) => {
                  setLocalNotaryQuery(e.target.value);
                  setPage(1);
                }}
                className="h-10 border-[#ebebeb] bg-white focus-visible:ring-[#c4a484] text-sm"
              />
            </div>

            {/* State Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                STATE
              </label>
              <select
                value={localStateCode}
                onChange={(e) => {
                  setLocalStateCode(e.target.value);
                  setPage(1);
                }}
                className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground rounded-md"
              >
                <option value="All States">All States</option>
                {states.map((s) => (
                  <option key={s.stateCode} value={s.stateCode}>
                    {s.stateName}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                STATUS
              </label>
              <select
                value={localStatus}
                onChange={(e) => {
                  setLocalStatus(e.target.value);
                  setPage(1);
                }}
                className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground rounded-md"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Completed">Compliant</option>
                <option value="Action Required">Missing Signature</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                DATE RANGE
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  type="date"
                  value={localStartDate}
                  onChange={(e) => {
                    setLocalStartDate(e.target.value);
                    setPage(1);
                  }}
                  className="bg-white border border-[#ebebeb] text-sm font-semibold rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] text-foreground h-10 w-full"
                />
                <span className="text-muted-foreground hidden sm:inline">-</span>
                <input
                  type="date"
                  value={localEndDate}
                  onChange={(e) => {
                    setLocalEndDate(e.target.value);
                    setPage(1);
                  }}
                  className="bg-white border border-[#ebebeb] text-sm font-semibold rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] text-foreground h-10 w-full"
                />
              </div>
            </div>

            {/* Clear Button */}
            <div className="flex items-end lg:col-span-2">
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="text-[#c4a484] hover:bg-[#c4a484]/5 font-bold uppercase tracking-widest text-[10px] h-10 px-4"
              >
                <X className="w-3.5 h-3.5 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-[#f8f8f8]">
            <TableRow className="border-b border-[#ebebeb]">
              <TableHead className="font-bold text-[12px] uppercase tracking-[0.2em] text-muted-foreground py-4 px-6">
                JOURNAL ID
              </TableHead>
              <TableHead className="font-bold text-[12px] uppercase tracking-[0.2em] text-muted-foreground py-4">
                NOTARY NAME
              </TableHead>
              <TableHead className="font-bold text-[12px] uppercase tracking-[0.2em] text-muted-foreground py-4">
                STATE
              </TableHead>
              <TableHead className="font-bold text-[12px] uppercase tracking-[0.2em] text-muted-foreground py-4">
                DATE
              </TableHead>
              <TableHead className="font-bold text-[12px] uppercase tracking-[0.2em] text-muted-foreground py-4">
                STATUS
              </TableHead>
              <TableHead className="font-bold text-[12px] uppercase tracking-[0.2em] text-muted-foreground py-4 text-right pr-6">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Req 6: Audit trail — "Reminder Email Sent" events shown first */}
            {displayAuditLogs.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-blue-50/50 transition-colors cursor-pointer group border-b border-[#ebebeb]"
              >
                <TableCell className="font-semibold text-foreground py-4 px-6 text-sm">
                  #{log.notaryId}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                      ✉
                    </div>
                    <span className="font-medium text-foreground text-sm whitespace-nowrap">
                      {log.email ?? `Notary #${log.notaryId}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                  -
                </TableCell>
                <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                  {formatDate(log.timeStamp)}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 font-bold hover:bg-blue-100 text-[10px] uppercase tracking-widest px-2 whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 -ml-0.5 shrink-0"></span>
                    Reminder Email Sent
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <Button
                    variant="ghost"
                    className="text-[#c4a484] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#c4a484]/10 whitespace-nowrap"
                  >
                    VIEW DETAILS
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Req 8 (SC_011): Audit trail — Thumbprint review decisions */}
            {displayThumbprintLogs.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-orange-50/30 transition-colors cursor-pointer group border-b border-[#ebebeb]"
              >
                <TableCell className="font-semibold text-foreground py-4 px-6 text-sm">
                  JRN-CA-{log.journalEntryId.padStart(5, "0")}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                      👆
                    </div>
                    <span className="font-medium text-foreground text-sm whitespace-nowrap">
                      {log.changedBy}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                  CA
                </TableCell>
                <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                  {formatDate(log.createdAt)}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="outline"
                    className={`${
                      log.action === "REQUIRE"
                        ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                        : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    } font-bold text-[10px] uppercase tracking-widest px-2 whitespace-nowrap`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        log.action === "REQUIRE"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      } mr-2 -ml-0.5 shrink-0`}
                    ></span>
                    Thumbprint{" "}
                    {log.action === "REQUIRE" ? "Required" : "Waived"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <Button
                    variant="ghost"
                    className="text-[#c4a484] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#c4a484]/10 whitespace-nowrap"
                  >
                    VIEW DETAILS
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Existing journal entry logs */}
            {items.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-[#f8f8f8]/50 transition-colors cursor-pointer group border-b border-[#ebebeb]"
              >
                <TableCell className="font-semibold text-foreground py-4 px-6 text-sm">
                  #{log.id}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fdf2e3] text-[#c4a484] flex items-center justify-center text-xs font-bold shrink-0">
                      {initials(log.notaryName)}
                    </div>
                    <span className="font-medium text-foreground text-sm whitespace-nowrap">
                      {log.notaryName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                  {log.stateName ?? log.stateCode ?? "-"}
                </TableCell>
                <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                  {formatDate(log.dateTime)}
                </TableCell>
                <TableCell className="py-4">
                  {log.status === "Completed" ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 font-bold hover:bg-green-100 text-[10px] uppercase tracking-widest px-2 whitespace-nowrap"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 -ml-0.5 shrink-0"></span>
                      Compliant
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 font-bold hover:bg-red-100 text-[10px] uppercase tracking-widest px-2 whitespace-nowrap"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 -ml-0.5 shrink-0"></span>
                      Missing Signature
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <Button
                    variant="ghost"
                    className="text-[#c4a484] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#c4a484]/10 whitespace-nowrap"
                  >
                    VIEW JOURNAL
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-[#ebebeb] flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          Showing {startRange}-{endRange} of {total.toLocaleString()} logs
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={page <= 1 || isLoading}
            className="font-semibold border-[#ebebeb] text-xs text-foreground uppercase tracking-widest hover:bg-[#f8f8f8] disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page >= totalPages || isLoading}
            className="font-semibold border-[#ebebeb] text-xs text-foreground uppercase tracking-widest hover:bg-[#f8f8f8] disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
