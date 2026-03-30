import { AlertTriangle, AlertCircle, Lock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/format";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { EmptyState } from "../ui/EmptyState";

interface JournalTableProps {
  isLoading: boolean;
  isError: boolean;
  journalEntries: any[];
  onRetry: () => void;
}

export const JournalTable = ({
  isLoading,
  isError,
  journalEntries,
  onRetry,
}: JournalTableProps) => {
  const navigate = useNavigate();

  return (
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="h-[400px]">
                <LoadingState message="Loading journal entries..." />
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={9} className="h-[400px]">
                <ErrorState
                  title="Failed to load entries"
                  message="Could not load journal entries. Please check your connection."
                  retry={onRetry}
                />
              </TableCell>
            </TableRow>
          ) : journalEntries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-[400px]">
                <EmptyState
                  title="No Entries Found"
                  message="No journal entries match your current filters."
                />
              </TableCell>
            </TableRow>
          ) : (
            journalEntries.map((log) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
