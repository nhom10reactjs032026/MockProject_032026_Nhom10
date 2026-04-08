import { NavLink, Outlet } from "react-router-dom";

export const SealModuleLayout = () => {
    // List of horizontal tabs (Admin side)
    const tabs = [
        { label: "Dashboard", path: "" },
        { label: "Registry", path: "registry" },
        { label: "Technical", path: "technical" },
        { label: "Risk Handling", path: "risk-handling" },
    ];

    return (
        <div className="p-8 bg-[#fcfcfc] min-h-screen animate-in fade-in duration-500">
            {/* 1. Module Title (Large, bold, black color of Wolfarch) */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Seal & Digital Signature
                </h1>
                <p className="text-[10px] font-bold text-[#c4a484] uppercase tracking-[0.2em] mt-1">
                    Management & Security Oversight
                </p>
            </div>

            {/* 2. HORIZONTAL NAV BAR (Light bronze color to match new UI) */}
            <div className="flex gap-4 mb-10 border-b border-slate-100">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        end={tab.path === ""}
                        className={({ isActive }) =>
                            `pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                                isActive ? "text-[#c4a484]" : "text-slate-400 hover:text-slate-600"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {tab.label}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c4a484] rounded-full animate-in fade-in zoom-in duration-300" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* 3. PLACE TO DISPLAY CONTENT OF SUBPAGES */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Outlet />
            </div>
        </div>
    );
};
