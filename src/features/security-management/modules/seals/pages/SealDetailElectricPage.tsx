import { NavLink, useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { getSealDetail } from "../../../data/seals";

export default function SealDetailElectricPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sealId = id ?? "";
  const seal = sealId ? getSealDetail(sealId) : undefined;

  return (
    <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
      <div className="mx-auto min-h-screen max-w-[1400px] bg-transparent px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-2xl font-bold">Seal / Digital Signature Detail</div>
          <div className="mt-1 text-sm text-slate-500">Electric seal detail page</div>
        </div>

        <Button variant="secondary" onClick={() => navigate("/admin/seals/registry")}>
          Back to Registry
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="inline-flex gap-2 rounded-xl border bg-white p-2 shadow-sm">
          <NavLink
            to={`/admin/seals/e/${sealId}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-semibold ${
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            Electric Seal
          </NavLink>
          <NavLink
            to={`/admin/seals/p/${sealId}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-semibold ${
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            Physical Seal
          </NavLink>
        </div>
      </div>

      {!seal ? (
        <Card className="mt-4 p-6">
          <div className="text-lg font-semibold text-slate-900">Seal not found</div>
          <div className="mt-2 text-sm text-slate-600">
            No seal data for ID: <span className="font-semibold">{sealId || "—"}</span>
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate("/admin/seals/registry")}>
              Go back
            </Button>
          </div>
        </Card>
      ) : (
        <div className="mt-4 grid gap-4">
          <Card className="p-5">
            <div className="text-lg font-semibold">Electric Seal ID</div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="text-xl font-bold">E_{seal.id}</div>
              <Badge value={seal.status} />
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <div className="text-sm font-semibold text-slate-700">Ownership Information</div>
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-slate-500">Notary name</div>
                  <div className="font-semibold">{seal.notary}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">State</div>
                  <div className="font-semibold">{seal.state}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Seal type</div>
                  <div className="font-semibold">{seal.type}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Certificate ID</div>
                  <div className="font-semibold">{seal.id}</div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-sm font-semibold text-slate-700">Validity Period</div>
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-slate-500">Issue date</div>
                  <div className="font-semibold">{seal.issueDate}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Expiration date</div>
                  <div className="font-semibold">{seal.expDate}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-slate-500">Time remaining until expiration date</div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-2/3 bg-blue-600" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-5">
            <div className="text-sm font-semibold text-slate-700">Seal Metadata</div>

            <div className="mt-3 grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <div className="text-xs text-slate-500">Provider</div>
                <div className="font-semibold">{seal.electronic?.provider ?? "—"}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Serial Number</div>
                <div className="font-semibold">{seal.electronic?.serialNumber ?? "—"}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-slate-500">Seal Impression</div>

                {seal.electronic?.impressionImageUrl ? (
                  <img
                    className="mt-2 h-40 w-full rounded-xl border object-contain"
                    src={seal.electronic.impressionImageUrl}
                    alt="Seal impression"
                  />
                ) : (
                  <div className="mt-2 rounded-xl border bg-slate-50 p-4 text-xs text-slate-500">
                    {seal.electronic?.impressionText ?? "(No impression)"}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-700">Status</div>
                <div className="mt-3 space-y-2 text-xs">
                  <div
                    className={[
                      "rounded-xl p-3",
                      seal.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : seal.status === "Expired"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700",
                    ].join(" ")}
                  >
                    Current status: <span className="font-semibold">{seal.status}</span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-slate-600">
                    SYSTEM NOTE: Expired seals/certificates are automatically disabled.
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="danger" onClick={() => alert(`Suspend electric seal: E_${seal.id}`)}>
                  Lock / Suspend
                </Button>
                <Button variant="primary" onClick={() => alert(`Replace electric seal: E_${seal.id}`)}>
                  Replace
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      </div>
    </div>
  );
}