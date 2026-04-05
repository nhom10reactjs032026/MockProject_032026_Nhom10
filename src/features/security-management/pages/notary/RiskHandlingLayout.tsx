import { NavLink, Outlet } from "react-router-dom";

export const RiskHandlingLayout = () => {
    // Navigation configuration for the Risk Handling module
    const tabs = [
        { label: "Incident Report", path: "" },
        { label: "Seal Replacement Request", path: "replacement" },
    ];

    return (
        <div className="p-8 bg-[#fcfcfc] min-h-screen font-['Plus_Jakarta_Sans']">
            {/* Header section with title and description */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Risk Handling</h1>
                <p className="text-slate-500 text-sm">Submit reports and requests for your security assets.</p>
            </div>

            {/* Horizontal navigation tabs for Notary operations */}
            <div className="flex gap-4 border-b border-slate-200 mb-8">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.label}
                        to={tab.path}
                        // 'end' ensures that the first tab isn't highlighted when sub-routes like 'replacement' are active
                        end
                        className={({ isActive }) =>
                            `pb-4 px-2 text-sm font-bold transition-all ${isActive
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-slate-400 hover:text-slate-600"
                            }`
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </div>

            {/* Main content container for nested routes (Incident or Replacement forms) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
                <Outlet />
            </div>
        </div>
    );
};