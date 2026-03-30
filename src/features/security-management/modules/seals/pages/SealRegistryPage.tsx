import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../../../layouts/AppShell";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Select from "../../../components/ui/Select";
import Dropdown from "../../../components/ui/Dropdown";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import { SEAL_ROWS, type SealRow, type SealStatus } from "../../../data/seals";
import {
  getSealStatusOverride,
  setSealStatusOverride,
} from "../../../data/seal-status-store";

type ActionKind = "suspend" | "replace";

export default function SealRegistryPage() {
  const navigate = useNavigate();

  // local rows state (để update UI sau confirm)
  const [rows, setRows] = useState<SealRow[]>(() =>
    SEAL_ROWS.map((r) => {
      const override = getSealStatusOverride(r.id);
      return override ? { ...r, status: override } : r;
    })
  );

  // filters
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [notaryFilter, setNotaryFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    kind: ActionKind;
    row: SealRow;
  } | null>(null);

  const states = useMemo(
    () => ["All", ...Array.from(new Set(rows.map((r) => r.state)))],
    [rows]
  );
  const notaries = useMemo(
    () => ["All", ...Array.from(new Set(rows.map((r) => r.notary)))],
    [rows]
  );
  const types = useMemo(() => ["All", "Electronic", "Physical", "Signature"], []);
  const statuses = useMemo(() => ["All", "Active", "Expired", "Revoked"], []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (stateFilter !== "All" && r.state !== stateFilter) return false;
      if (notaryFilter !== "All" && r.notary !== notaryFilter) return false;
      if (typeFilter !== "All" && r.type !== typeFilter) return false;
      if (statusFilter !== "All" && r.status !== statusFilter) return false;
      return true;
    });
  }, [rows, stateFilter, notaryFilter, typeFilter, statusFilter]);

  // reset page về 1 mỗi khi filter đổi
  useMemo(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFilter, notaryFilter, typeFilter, statusFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const pagedRows: SealRow[] = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  const showingFrom = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = total === 0 ? 0 : Math.min(safePage * pageSize, total);

  const onClearAll = () => {
    setStateFilter("All");
    setNotaryFilter("All");
    setTypeFilter("All");
    setStatusFilter("All");
    setPage(1);
  };

  const pageButtons = useMemo(() => {
    const last = totalPages;
    const base = [1, 2, 3].filter((n) => n <= last);
    return { base, last };
  }, [totalPages]);

  const viewDetail = (r: SealRow) => {
    // quyết định route theo type
    // Signature có thể coi như digital => dùng /seals/e/:id (hoặc bạn muốn route riêng thì nói mình)
    const to = r.type === "Physical" ? `/seals/p/${r.id}` : `/seals/e/${r.id}`;

    // lưu last selected để Sidebar Detail đúng id
    localStorage.setItem("lastSelectedSealId", r.id);
    window.dispatchEvent(new Event("lastSealChanged"));

    navigate(to);
  };

  const openConfirm = (kind: ActionKind, row: SealRow) => {
    setConfirmAction({ kind, row });
    setConfirmOpen(true);
  };

  const applyAction = (kind: ActionKind, row: SealRow) => {
    // logic tạm:
    // - suspend => Revoked
    // - replace => Active
    const next: SealStatus = kind === "suspend" ? "Revoked" : "Active";

    setRows((prev) =>
      prev.map((x) => (x.id === row.id ? { ...x, status: next } : x))
    );
    setSealStatusOverride(row.id, next);
  };

  const confirmTitle = confirmAction
    ? confirmAction.kind === "suspend"
      ? `Suspend seal ${confirmAction.row.id}?`
      : `Replace seal ${confirmAction.row.id}?`
    : "";

  const confirmDesc = confirmAction
    ? confirmAction.kind === "suspend"
      ? "This will disable the seal for future use (temporary mock action)."
      : "This will mark the seal as Active again (temporary mock action)."
    : "";

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Seal &amp; Digital Signature Registry</h1>

      <ConfirmDialog
        open={confirmOpen}
        title={confirmTitle}
        description={confirmDesc}
        confirmText={confirmAction?.kind === "suspend" ? "Suspend" : "Replace"}
        danger={confirmAction?.kind === "suspend"}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (!confirmAction) return;
          applyAction(confirmAction.kind, confirmAction.row);
        }}
      />

      {/* Filters */}
      <Card className="mt-4 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs font-semibold text-slate-400">FILTERS:</div>

          <Select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            {states.map((x) => (
              <option key={x} value={x}>
                {x === "All" ? "All States" : x}
              </option>
            ))}
          </Select>

          <Select value={notaryFilter} onChange={(e) => setNotaryFilter(e.target.value)}>
            {notaries.map((x) => (
              <option key={x} value={x}>
                {x === "All" ? "All Notaries" : x}
              </option>
            ))}
          </Select>

          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {types.map((x) => (
              <option key={x} value={x}>
                {x === "All" ? "All Seals Type" : x}
              </option>
            ))}
          </Select>

          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {statuses.map((x) => (
              <option key={x} value={x}>
                {x === "All" ? "All Statuses" : x}
              </option>
            ))}
          </Select>

          <button
            type="button"
            onClick={onClearAll}
            className="ml-auto text-sm font-semibold text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>
      </Card>

      {/* Table */}
      <Card className="mt-4">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
            <tr>
              <th className="px-5 py-3">SEAL / CERTIFICATE ID</th>
              <th className="px-5 py-3">NOTARY NAME</th>
              <th className="px-5 py-3">STATE</th>
              <th className="px-5 py-3">TYPE</th>
              <th className="px-5 py-3">ISSUE DATE</th>
              <th className="px-5 py-3">EXPIRATION DATE</th>
              <th className="px-5 py-3">STATUS</th>
              <th className="px-5 py-3">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((r, idx) => (
              <tr key={r.id} className={idx % 2 ? "bg-white" : "bg-slate-50/30"}>
                <td className="px-5 py-4">
                  <Link
                    className="text-blue-600 hover:underline"
                    to={`/seals/e/${r.id}`}
                    onClick={() => {
                      localStorage.setItem("lastSelectedSealId", r.id);
                      window.dispatchEvent(new Event("lastSealChanged"));
                    }}
                  >
                    {r.id}
                  </Link>
                </td>
                <td className="px-5 py-4">{r.notary}</td>
                <td className="px-5 py-4">{r.state}</td>
                <td className="px-5 py-4">{r.type}</td>
                <td className="px-5 py-4">{r.issueDate}</td>
                <td className="px-5 py-4">{r.expDate}</td>
                <td className="px-5 py-4">
                  <Badge value={r.status} />
                </td>
                <td className="px-5 py-4">
                  <Dropdown
                    label={r.status === "Active" ? "Suspend" : "Replace"}
                    items={[
                      { label: "View detail", onClick: () => viewDetail(r) },
                      { label: "Replace", onClick: () => openConfirm("replace", r) },
                      { label: "Suspend", onClick: () => openConfirm("suspend", r), danger: true },
                    ]}
                  />
                </td>
              </tr>
            ))}

            {total === 0 && (
              <tr>
                <td className="px-5 py-10 text-center text-sm text-slate-500" colSpan={8}>
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