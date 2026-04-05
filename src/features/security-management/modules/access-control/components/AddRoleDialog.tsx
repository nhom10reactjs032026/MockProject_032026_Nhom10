import * as React from "react";
import { X } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

export type AddRoleForm = {
  notaryName: string;
  state: string;
  sealType: "digital" | "physical" | "signature";
  applyHoliday: "ignore" | "yes" | "no";
  holidayTypes: {
    federal: boolean;
    state: boolean;
  };
  requiredConditions: {
    activeCommission: boolean;
    validNotarialAct: boolean;
  };
  approval: {
    type: "automatic" | "manual";
    approver: string;
  };
};

const defaultForm: AddRoleForm = {
  notaryName: "Alice Smith - CA - COMM# 123456",
  state: "California (CA)",
  sealType: "digital",
  applyHoliday: "ignore",
  holidayTypes: { federal: true, state: false },
  requiredConditions: { activeCommission: true, validNotarialAct: false },
  approval: { type: "automatic", approver: "Compliance Officer" },
};

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-primary/25 bg-white p-5 ${className}`}
    >
      <h3 className="text-sm font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </section>
  );
}

export default function AddRoleDialog({
  onSave,
}: {
  onSave?: (data: AddRoleForm) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<AddRoleForm>(defaultForm);

  const close = () => setOpen(false);

  const handleSave = () => {
    onSave?.(form);
    close();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Add New Role</Button>
      </DialogTrigger>

        <DialogContent className="w-[min(50vw,640px)] max-w-none p-0 overflow-hidden">
        <DialogHeader className="px-8 pt-7 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Add New Role</DialogTitle>

            <button
              type="button"
              onClick={close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </DialogHeader>

        {/* Body scroll để không tràn màn hình */}
        <div className="px-8 pb-8 max-h-[80vh] overflow-y-auto">
          {/* Rule Information */}
          <SectionCard title="Rule Information" className="mb-5">
            {/* Chỉ lên 2 cột khi >= lg để tránh bị chật */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="min-w-0">
                <Label className="text-xs text-slate-600">Notary name</Label>
                <Select
                  value={form.notaryName}
                  onValueChange={(v) => setForm((p) => ({ ...p, notaryName: v }))}
                >
                  <SelectTrigger className="mt-2 w-full min-w-0">
                    <span className="block w-full min-w-0 truncate text-left">
                      <SelectValue placeholder="Select notary" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alice Smith - CA - COMM# 123456">
                      Alice Smith - CA - COMM# 123456
                    </SelectItem>
                    <SelectItem value="John Smith - NY - COMM# 987654">
                      John Smith - NY - COMM# 987654
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-0">
                <Label className="text-xs text-slate-600">Seal Type</Label>
                <Select
                  value={form.sealType}
                  onValueChange={(v) =>
                    setForm((p) => ({
                      ...p,
                      sealType: v as AddRoleForm["sealType"],
                    }))
                  }
                >
                  <SelectTrigger className="mt-2 w-full min-w-0">
                    <span className="block w-full min-w-0 truncate text-left">
                      <SelectValue />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">Digital Seal</SelectItem>
                    <SelectItem value="physical">Physical Seal</SelectItem>
                    <SelectItem value="signature">Signature</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-0 lg:col-span-2">
                <Label className="text-xs text-slate-600">State</Label>
                <Input
                  className="mt-2 w-full"
                  value={form.state}
                  onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
                />
              </div>
            </div>
          </SectionCard>

          {/* middle row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <SectionCard title="Holiday Rule">
              <div className="space-y-5">
                <div>
                  <Label className="text-xs text-slate-600">Apply on Holiday?</Label>

                  {/* wrap để không tràn */}
                  <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        id="holiday-ignore"
                        type="radio"
                        name="applyHoliday"
                        value="ignore"
                        checked={form.applyHoliday === "ignore"}
                        onChange={() => setForm((p) => ({ ...p, applyHoliday: "ignore" }))}
                        className="h-4 w-4 accent-primary"
                      />
                      <Label htmlFor="holiday-ignore" className="text-sm">
                        Ignore
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id="holiday-yes"
                        type="radio"
                        name="applyHoliday"
                        value="yes"
                        checked={form.applyHoliday === "yes"}
                        onChange={() => setForm((p) => ({ ...p, applyHoliday: "yes" }))}
                        className="h-4 w-4 accent-primary"
                      />
                      <Label htmlFor="holiday-yes" className="text-sm">
                        Yes
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id="holiday-no"
                        type="radio"
                        name="applyHoliday"
                        value="no"
                        checked={form.applyHoliday === "no"}
                        onChange={() => setForm((p) => ({ ...p, applyHoliday: "no" }))}
                        className="h-4 w-4 accent-primary"
                      />
                      <Label htmlFor="holiday-no" className="text-sm">
                        No
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-600">Holiday Type</Label>
                  <div className="mt-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        id="holiday-federal"
                        type="checkbox"
                        checked={form.holidayTypes.federal}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            holidayTypes: {
                              ...p.holidayTypes,
                              federal: e.target.checked,
                            },
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 accent-primary"
                      />
                      <Label htmlFor="holiday-federal" className="text-sm">
                        Federal Holiday
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id="holiday-state"
                        type="checkbox"
                        checked={form.holidayTypes.state}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            holidayTypes: { ...p.holidayTypes, state: e.target.checked },
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 accent-primary"
                      />
                      <Label htmlFor="holiday-state" className="text-sm">
                        State Holiday
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Required Conditions">
              <div className="mt-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input
                    id="cond-active"
                    type="checkbox"
                    checked={form.requiredConditions.activeCommission}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        requiredConditions: {
                          ...p.requiredConditions,
                          activeCommission: e.target.checked,
                        },
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-primary"
                  />
                  <Label htmlFor="cond-active" className="text-sm">
                    Active Commission
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="cond-act"
                    type="checkbox"
                    checked={form.requiredConditions.validNotarialAct}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        requiredConditions: {
                          ...p.requiredConditions,
                          validNotarialAct: e.target.checked,
                        },
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-primary"
                  />
                  <Label htmlFor="cond-act" className="text-sm">
                    Valid Notarial Act
                  </Label>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Approval */}
          <SectionCard title="Approval Process" className="mb-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <div className="mt-1 flex flex-wrap gap-x-8 gap-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      id="approval-auto"
                      type="radio"
                      name="approvalType"
                      value="automatic"
                      checked={form.approval.type === "automatic"}
                      onChange={() =>
                        setForm((p) => ({
                          ...p,
                          approval: { ...p.approval, type: "automatic" },
                        }))
                      }
                      className="h-4 w-4 accent-primary"
                    />
                    <Label htmlFor="approval-auto" className="text-sm">
                      Automatic Approval
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="approval-manual"
                      type="radio"
                      name="approvalType"
                      value="manual"
                      checked={form.approval.type === "manual"}
                      onChange={() =>
                        setForm((p) => ({
                          ...p,
                          approval: { ...p.approval, type: "manual" },
                        }))
                      }
                      className="h-4 w-4 accent-primary"
                    />
                    <Label htmlFor="approval-manual" className="text-sm">
                      Manual Approval
                    </Label>
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <Label className="text-xs text-slate-600">Approver</Label>
                <Select
                  value={form.approval.approver}
                  onValueChange={(v) =>
                    setForm((p) => ({
                      ...p,
                      approval: { ...p.approval, approver: v },
                    }))
                  }
                >
                  <SelectTrigger className="mt-2 w-full min-w-0">
                    <span className="block w-full min-w-0 truncate text-left">
                      <SelectValue />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compliance Officer">Compliance Officer</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionCard>

          {/* Footer buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button variant="outline" className="w-full sm:w-44" onClick={close}>
              Cancel
            </Button>
            <Button
              className="w-full sm:w-44 bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}