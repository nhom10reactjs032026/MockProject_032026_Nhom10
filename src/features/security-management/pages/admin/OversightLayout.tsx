// src/features/security-management/pages/admin/OversightLayout.tsx
import { Outlet } from 'react-router-dom';

export const OversightLayout = () => {
    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen font-['Plus_Jakarta_Sans']">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight ">
                        Audit & Compliance
                    </h1>
                    <p className="text-slate-400 text-lg font-medium mt-1">
                        Monitoring system integrity and regulatory alignment.
                    </p>
                </div>
            </div>

            {/* Content area where AuditCompliancePage will be rendered */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Outlet />
            </div>
        </div>
    );
};