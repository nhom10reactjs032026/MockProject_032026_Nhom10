export type StatusValue = "Active" | "Expired" | "Revoked";

export default function Badge({ value }: { value: StatusValue }) {
  const cls =
    value === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : value === "Expired"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      {value}
    </span>
  );
}