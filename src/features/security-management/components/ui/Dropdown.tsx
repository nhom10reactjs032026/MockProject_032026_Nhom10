import { useEffect, useRef, useState } from "react";

type Item = { label: string; onClick: () => void; danger?: boolean };

export default function Dropdown({
  label,
  items,
}: {
  label: string;
  items: Item[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-sm text-slate-700 hover:underline"
      >
        {label} <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border bg-white shadow-lg">
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              onClick={() => {
                setOpen(false);
                it.onClick();
              }}
              className={[
                "block w-full px-4 py-2 text-left text-sm hover:bg-slate-50",
                it.danger ? "text-red-600" : "text-slate-700",
              ].join(" ")}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}