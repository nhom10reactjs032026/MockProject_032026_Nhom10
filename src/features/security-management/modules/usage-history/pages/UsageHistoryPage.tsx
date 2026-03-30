import { useMemo, useState } from "react";
import AppShell from "../../../layouts/AppShell";
import Card from "../../../components/ui/Card";
import Select from "../../../components/ui/Select";
import DatePicker from "../../../components/ui/DatePicker";
import { USAGE_ROWS, type UsageRow, type UsageActType } from "../../../data/usage-history";
type Flag = "none" | "red" | "yellow" | "both";
type ActType = "All" | "Acknowledgement" | "Jurats" | "Copy Certification";

type Row = {
  id: number;
  dateTime: string; // text hiển thị
  dateISO: string; // YYYY-MM-DD để filter
  actId: string;
  docRef: string;
  notary: string;
  flag: Flag;
  outsideWorkingHours: boolean;
  afterExpiration: boolean;
  actType: ActType;
};


function isoToDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

function FlagCell({ value }: { value: Flag }) {
  if (value === "none") return <span className="text-slate-300">—</span>;
  if (value === "both") {
    return (
      <div className="flex gap-2 text-lg" aria-label="anomaly flags">
        <span title="Usage outside working hours">🚩</span>
        <span title="Usage after expiration">🏳️</span>
      </div>
    );
  }
  return (
    <div className="text-lg" aria-label="anomaly flag">
      {value === "red" ? (
        <span title="Usage outside working hours">🚩</span>
      ) : (
        <span title="Usage after expiration">🏳️</span>
      )}
    </div>
  );
}

export default function UsageHistoryPage() {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [outsideHours, setOutsideHours] = useState(false);
  const [afterExp, setAfterExp] = useState(false);
  const [actType, setActType] = useState<ActType>("All");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredRows = useMemo(() => {
    return USAGE_ROWS.filter((r) => {
      if (outsideHours && !r.outsideWorkingHours) return false;
      if (afterExp && !r.afterExpiration) return false;
      if (actType !== "All" && r.actType !== actType) return false;

      const d = isoToDate(r.dateISO);
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;

      return true;
    });
  }, [fromDate, toDate, outsideHours, afterExp, actType]);

  // reset page khi filter đổi
  useMemo(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, outsideHours, afterExp, actType]);

  const total = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const pagedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, safePage]);

  const showingFrom = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = total === 0 ? 0 : Math.min(safePage * pageSize, total);

  const onClearAll = () => {
    setFromDate(null);
    setToDate(null);
    setOutsideHours(false);
    setAfterExp(false);
    setActType("All");
    setPage(1);
  };

  const pageButtons = useMemo(() => {
    const last = totalPages;
    const base = [1, 2, 3].filter((n) => n <= last);
    return { base, last };
  }, [totalPages]);

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Seal &amp; Digital Signature Usage History</h1>

      {/* Filters */}
      <Card className="mt-4 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-xs font-semibold text-slate-400">FILTERS:</div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-slate-700">From</div>
            <DatePicker value={fromDate} onChange={setFromDate} placeholder="Select date" />
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-slate-700">To</div>
            <DatePicker value={toDate} onChange={setToDate} placeholder="Select date" />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-700">Anomaly</div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={outsideHours} onChange={(e) => setOutsideHours(e.target.checked)} />
              Usage outside working hours
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={afterExp} onChange={(e) => setAfterExp(e.target.checked)} />
              Usage after expiration
            </label>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Select value={actType} onChange={(e) => setActType(e.target.value as ActType)}>
              <option value="All">All Acts Type</option>
              <option value="Acknowledgement">Acknowledgement</option>
              <option value="Jurats">Jurats</option>
              <option value="Copy Certification">Copy Certification</option>
            </Select>

            <button type="button" className="text-sm font-semibold text-blue-600 hover:underline" onClick={onClearAll}>
              Clear All
            </button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="mt-4">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
            <tr>
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">DATE AND TIME</th>
              <th className="px-5 py-3">LINKED NOTARIAL ACT ID</th>
              <th className="px-5 py-3">DOCUMENT REFERENCE</th>
              <th className="px-5 py-3">NOTARY</th>
              <th className="px-5 py-3">ANOMALY FLAG</th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((r, idx) => (
              <tr key={r.id} className={idx % 2 ? "bg-white" : "bg-slate-50/30"}>
                <td className="px-5 py-4 font-semibold">{r.id}</td>
                <td className="px-5 py-4 text-blue-700">{r.dateTime}</td>
                <td className="px-5 py-4">
                  <a href="#" className="text-slate-600 underline">
                    {r.actId}
                  </a>
                </td>
                <td className="px-5 py-4">
                  <a href="#" className="text-slate-600 underline">
                    {r.docRef}
                  </a>
                </td>
                <td className="px-5 py-4">{r.notary}</td>
                <td className="px-5 py-4">
                  <FlagCell value={r.flag} />
                </td>
              </tr>
            ))}

            {total === 0 && (
              <tr>
                <td className="px-5 py-10 text-center text-sm text-slate-500" colSpan={6}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 text-xs text-slate-500">
          <div>
            Showing {showingFrom} to {showingTo} of {total} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-md px-2 py-1 hover:bg-slate-100 disabled:opacity-50"
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </button>

            {pageButtons.base.map((n) => (
              <button
                key={n}
                className={[
                  "rounded-md px-3 py-1",
                  n === safePage ? "bg-blue-600 font-semibold text-white" : "hover:bg-slate-100",
                ].join(" ")}
                type="button"
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}

            {pageButtons.last > 3 && <span>…</span>}

            {pageButtons.last > 3 && (
              <button
                className={[
                  "rounded-md px-3 py-1",
                  pageButtons.last === safePage ? "bg-blue-600 font-semibold text-white" : "hover:bg-slate-100",
                ].join(" ")}
                type="button"
                onClick={() => setPage(pageButtons.last)}
              >
                {pageButtons.last}
              </button>
            )}

            <button
              className="rounded-md px-2 py-1 hover:bg-slate-100 disabled:opacity-50"
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              ›
            </button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}