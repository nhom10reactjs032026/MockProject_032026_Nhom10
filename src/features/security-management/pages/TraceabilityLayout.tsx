import { NavLink, Outlet } from 'react-router-dom';

export const TraceabilityLayout = () => {
    const subNavItems = [
        { label: 'Incident Report', path: '' }, // Đường dẫn mặc định
        { label: 'Incident Detail', path: 'incident-detail' },
        { label: 'Seal Replacement Request', path: 'seal-replacement-request' },
        { label: 'Replacement', path: 'replacement' },
        { label: 'Notification Log', path: 'notification-log' },
        { label: 'Audit & Compliance', path: 'audit' },
    ];

    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen">
            {/* Header chính */}
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Traceability Management</h1>
            </div>

            {/* THANH NAV NGANG (Sub-nav) */}
            <div className="flex gap-2 mb-8 p-1.5 bg-slate-100/50 w-fit rounded-2xl border border-slate-200/50">
                {subNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === ''}
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

            {/* NƠI HIỂN THỊ CÁC TRANG CON (SC_007.x, SC_008) */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Outlet />
            </div>
        </div>
    );
};