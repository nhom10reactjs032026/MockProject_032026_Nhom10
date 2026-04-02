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
import { Filter } from "lucide-react";
import { useJournalEntries, useComplianceAuditLogs, useThumbprintAuditLogs } from "../api";
import { formatDate } from "../utils/format";

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.at(-1)?.[0] ?? "?";
  return `${first}${last}`.toUpperCase();
}

export const RecentComplianceLogs = () => {
  const { data } = useJournalEntries({ page: 1, pageSize: 3 });
  const items = data?.items ?? [];

  // Req 6 (SC_010): Fetch audit logs for "Reminder Email Sent" events
  const { data: auditLogs = [] } = useComplianceAuditLogs();

  // Req 8 (SC_011): Fetch audit logs for thumbprint review decisions
  const { data: thumbprintLogs = [] } = useThumbprintAuditLogs();
  return (
    <div className="bg-white rounded-xl border border-[#ebebeb] shadow-sm mt-6">
      <div className="p-6 border-b border-[#ebebeb] flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">
          Recent Compliance Logs
        </h3>
        <button className="text-[#c4a484] hover:opacity-80 transition-opacity">
          <Filter className="w-5 h-5" />
        </button>
      </div>

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
            {auditLogs.map((log) => (
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
            {thumbprintLogs.map((log) => (
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
                        log.action === "REQUIRE" ? "bg-orange-500" : "bg-green-500"
                      } mr-2 -ml-0.5 shrink-0`}
                    ></span>
                    Thumbprint {log.action === "REQUIRE" ? "Required" : "Waived"}
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
          Showing 1-{items.length + auditLogs.length + thumbprintLogs.length} of{" "}
          {((data?.total ?? 0) + auditLogs.length + thumbprintLogs.length).toLocaleString()} logs
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="font-semibold border-[#ebebeb] text-xs text-foreground uppercase tracking-widest hover:bg-[#f8f8f8]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold border-[#ebebeb] text-xs text-foreground uppercase tracking-widest hover:bg-[#f8f8f8]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
