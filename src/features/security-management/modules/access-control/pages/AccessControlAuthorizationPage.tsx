import { useMemo, useState } from "react";
import { Card } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { Input } from "../../../../../components/ui/input";
import AddRoleDialog, { type AddRoleForm } from "../components/AddRoleDialog";

import {
  ACCESS_RULES,
  type AccessRuleRow,
  type RuleStatus,
} from "../../../data/access-control";
import {
  getRuleStatusOverride,
  setRuleStatusOverride,
} from "../../../data/access-control-store";

export default function AccessControlAuthorizationPage() {
  const [rows, setRows] = useState<AccessRuleRow[]>(() =>
    ACCESS_RULES.map((r) => {
      const override = getRuleStatusOverride(r.index);
      return override ? { ...r, status: override } : r;
    })
  );

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<AccessRuleRow | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((r) => {
      const hay = [
        r.ruleId,
        r.user,
        r.sealType,
        r.requiredConditions,
        r.approvalProcess,
        r.status,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [rows, q]);

  useMemo(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  const showingFrom = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = total === 0 ? 0 : Math.min(safePage * pageSize, total);

  const pageButtons = useMemo(() => {
    const last = totalPages;
    const base = [1, 2, 3].filter((n) => n <= last);
    return { base, last };
  }, [totalPages]);

  const openEmergencyLock = (row: AccessRuleRow) => {
    setSelected(row);
    setConfirmOpen(true);
  };

  const applyEmergencyLock = () => {
    if (!selected) return;

    const next: RuleStatus = selected.status === "Locked" ? "Active" : "Locked";

    setRows((prev) =>
      prev.map((x) => (x.index === selected.index ? { ...x, status: next } : x))
    );
    setRuleStatusOverride(selected.index, next);
  };

  const handleAddRoleSave = (data: AddRoleForm) => {
    const sealTypeMap = {
      digital: "Digital Seal",
      physical: "Physical Seal",
      signature: "Digital Signature",
    } as const;

    setRows((prev) => {
      const nextIndex = prev.length ? Math.max(...prev.map((x) => x.index)) + 1 : 1;
      const nextRow: AccessRuleRow = {
        index: nextIndex,
        ruleId: `NEW-${nextIndex}`,
        user: data.notaryName,
        sealType: sealTypeMap[data.sealType],
        requiredConditions: data.requiredConditions.activeCommission
          ? "Active Commission"
          : "None",
        approvalProcess: data.approval.type === "manual" ? "Manual Approval" : "Automatic Approval",
        status: "Active",
      };

      return [nextRow, ...prev];
    });
  };

  return (
    <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
      <div className="mx-auto min-h-screen max-w-[1400px] bg-transparent px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-3xl font-bold text-slate-900">
            Access Control &amp; Authorization
          </div>

          <AddRoleDialog onSave={handleAddRoleSave} />
        </div>

        <ConfirmDialog
          open={confirmOpen}
          title={
            selected?.status === "Locked"
              ? `Unlock rule ${selected?.ruleId}?`
              : `Emergency lock rule ${selected?.ruleId}?`
          }
          description={
            selected?.status === "Locked"
              ? "This will set the rule back to Active (mock action)."
              : "This will immediately lock access for this rule (mock action)."
          }
          confirmText={selected?.status === "Locked" ? "Unlock" : "Emergency Lock"}
          danger={selected?.status !== "Locked"}
          onClose={() => setConfirmOpen(false)}
          onConfirm={applyEmergencyLock}
        />

        <div className="mt-4 flex items-center gap-3">
          <div className="w-full max-w-sm">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
          </div>
        </div>

        <Card className="mt-4 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">RULE ID</th>
                <th className="px-5 py-3">USER</th>
                <th className="px-5 py-3">SEAL/SIGNATURE TYPE</th>
                <th className="px-5 py-3">REQUIRED CONDITIONS</th>
                <th className="px-5 py-3">APPROVAL PROCESS</th>
                <th className="px-5 py-3">STATUS</th>
                <th className="px-5 py-3">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((r, idx) => (
                <tr key={r.index} className={idx % 2 ? "bg-white" : "bg-slate-50/30"}>
                  <td className="px-5 py-4 font-semibold">{r.index}</td>
                  <td className="px-5 py-4 font-semibold text-blue-600">{r.ruleId}</td>
                  <td className="px-5 py-4 text-slate-700">{r.user}</td>
                  <td className="px-5 py-4">{r.sealType}</td>
                  <td className="px-5 py-4">{r.requiredConditions}</td>
                  <td className="px-5 py-4">{r.approvalProcess}</td>
                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        r.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-200 text-slate-700",
                      ].join(" ")}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Button
                      variant="destructive"
                      className="h-8 px-3"
                      onClick={() => openEmergencyLock(r)}
                    >
                      EMERGENCY LOCK
                    </Button>
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

              {[1, 2, 3].filter((n) => n <= totalPages).map((n) => (
                <button
                  key={n}
                  className={[
                    "rounded-md px-3 py-1",
                    n === safePage
                      ? "bg-blue-600 font-semibold text-white"
                      : "hover:bg-slate-100",
                  ].join(" ")}
                  type="button"
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}

              {totalPages > 3 && <span>…</span>}

              {totalPages > 3 && (
                <button
                  className={[
                    "rounded-md px-3 py-1",
                    totalPages === safePage
                      ? "bg-blue-600 font-semibold text-white"
                      : "hover:bg-slate-100",
                  ].join(" ")}
                  type="button"
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
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
      </div>
    </div>
  );
}