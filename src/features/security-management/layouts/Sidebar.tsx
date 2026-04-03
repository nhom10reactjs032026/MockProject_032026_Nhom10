import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Item = ({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end?: boolean;
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      [
        "mx-3 my-1 rounded-xl px-4 py-3 text-sm font-medium transition",
        isActive
          ? "bg-white/95 text-blue-700 shadow"
          : "text-white/90 hover:bg-white/10",
      ].join(" ")
    }
  >
    {label}
  </NavLink>
);

function getDetailTo() {
  const last = localStorage.getItem("lastSelectedSealId");
  return last ? `/admin/seals/e/${last}` : "/admin/seals/e/987650";
}

export default function Sidebar() {
  const [detailTo, setDetailTo] = useState<string>(() => getDetailTo());

  useEffect(() => {
    const onChange = () => setDetailTo(getDetailTo());

    // update khi bạn click ID trong Registry và dispatch event
    window.addEventListener("lastSealChanged", onChange);

    // update khi localStorage đổi từ tab khác
    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener("lastSealChanged", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500">
      <div className="p-6 text-3xl font-extrabold tracking-tight text-white">
        XC
      </div>

      <nav className="mt-2 flex flex-col">
        <Item to="/overview" label="Overview" />

        {/* Registry: chỉ active đúng /seals */}
        <Item to="/admin/seals" label="Registry" end />

        {/* Detail: tự động lấy ID gần nhất */}
        <Item to={detailTo} label="Detail" />

        <Item to="/technical" label="Technical" />

        {/* Usage history */}
        <Item to="/usage" label="Traceability" end />

        <Item to="/security" label="Security" />
        <Item to="/risk" label="Risk Handling" />
        <Item to="/oversight" label="Oversight" />
      </nav>
    </aside>
  );
}