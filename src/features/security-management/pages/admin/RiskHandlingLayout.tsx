// src/features/security-management/pages/admin/RiskHandlingLayout.tsx
import { NavLink, Outlet } from 'react-router-dom';

export const RiskHandlingLayout = () => {
    // Admin sub-navigation for Risk Handling module
    const subNavItems = [
        { label: 'Incident Detail', path: '' }, // Default active tab
        { label: 'Seal Replacement Request', path: 'replacement-request' },
        { label: 'Replacement', path: 'replacement' },
        { label: 'Notification Log', path: 'notification-log' },
    ];

    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen font-['Plus_Jakarta_Sans']">
            {/* Header section updated to Risk Handling */}
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight ">
                    Risk Handling Management
                </h1>
            </div>

            {/* Navigation tabs */}
            <div className="flex gap-2 mb-8 p-1.5 bg-slate-100/50 w-fit rounded-2xl border border-slate-200/50">
                {subNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${isActive
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'text-slate-500 hover:bg-white hover:text-blue-600'
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>

            {/* Render sub-pages */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Outlet />
            </div>
        </div>
    );
};