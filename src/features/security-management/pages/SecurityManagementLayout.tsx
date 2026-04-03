import { NavLink, Outlet } from "react-router-dom";

export const SecurityManagementLayout = () => {
  const tabs = [
    { label: "Seals & Digital Signature", to: "/admin/seals" },
    { label: "Usage / Traceability", to: "/admin/traceability/usage" },
  ];

  return (
    <div>
      <div className="mx-auto max-w-[1400px] bg-transparent px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex gap-4 border-b border-slate-100">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                  isActive
                    ? "text-[#c4a484]"
                    : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {tab.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-1 w-full animate-in fade-in zoom-in rounded-full bg-[#c4a484] duration-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};
