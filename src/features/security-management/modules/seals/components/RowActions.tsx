import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";

import type { SealRow, SealStatus } from "../../../data/seals";
import { setSealStatusOverride } from "../../../data/seal-status-store";

export default function RowActions({
  row,
  onStatusUpdated,
}: {
  row: SealRow;
  onStatusUpdated: (id: string, status: SealStatus) => void;
}) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [kind, setKind] = useState<"replace" | "suspend">("replace");

  const viewDetail = () => {
    const to =
      row.type === "Physical"
        ? `/admin/seals/p/${row.id}`
        : `/admin/seals/e/${row.id}`;

    localStorage.setItem("lastSelectedSealId", row.id);
    window.dispatchEvent(new Event("lastSealChanged"));

    navigate(to);
  };

  const apply = () => {
    const next: SealStatus = kind === "suspend" ? "Revoked" : "Active";
    onStatusUpdated(row.id, next);
    setSealStatusOverride(row.id, next);

    window.dispatchEvent(new Event("sealStatusChanged"));
  };

  return (
    <>
      <ConfirmDialog
        open={confirmOpen}
        title={kind === "suspend" ? `Suspend seal ${row.id}?` : `Replace seal ${row.id}?`}
        description={
          kind === "suspend"
            ? "This will disable the seal for future use (mock action)."
            : "This will mark the seal as Active again (mock action)."
        }
        confirmText={kind === "suspend" ? "Suspend" : "Replace"}
        danger={kind === "suspend"}
        onClose={() => setConfirmOpen(false)}
        onConfirm={apply}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-8 px-3">
            {row.status === "Active" ? "Suspend" : "Replace"}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onSelect={viewDetail}>View detail</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => {
              setKind("replace");
              setConfirmOpen(true);
            }}
          >
            Replace
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onSelect={() => {
              setKind("suspend");
              setConfirmOpen(true);
            }}
          >
            Suspend
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}