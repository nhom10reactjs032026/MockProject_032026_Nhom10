import { useMemo, useState } from "react";
import {
  useActTypes,
  useJournalEntries,
  useStates,
  type ListJournalEntriesParams,
} from "../api";

import { JournalToolbar } from "./manage-tabs/JournalToolbar";
import { JournalTable } from "./manage-tabs/JournalTable";
import { JournalPagination } from "./manage-tabs/JournalPagination";

export const JournalManagerTab = () => {
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
        <JournalToolbar
          status={status}
          setStatus={setStatus}
          actType={actType}
          setActType={setActType}
          stateCode={stateCode}
          setStateCode={setStateCode}
          notaryQuery={notaryQuery}
          setNotaryQuery={setNotaryQuery}
          actTypes={actTypes}
          states={states}
          setPage={setPage}
        />

        <JournalTable
          isLoading={journalEntriesQuery.isLoading}
          isError={journalEntriesQuery.isError}
          journalEntries={journalEntries}
          onRetry={() => void journalEntriesQuery.refetch()}
        />

        <JournalPagination
          startIndex={startIndex}
          endIndex={endIndex}
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
          isFetching={journalEntriesQuery.isFetching}
          pageButtons={pageButtons}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};
