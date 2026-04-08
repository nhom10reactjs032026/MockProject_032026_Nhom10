import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, type SidebarNavItem } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { 
  LayoutDashboard, 
  Grid, 
  FileText, 
  Settings, 
  History, 
  ShieldCheck, 
  AlertTriangle, 
  UserCheck 
} from "lucide-react";

export const NotaryActLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems: SidebarNavItem[] = [
    { icon: LayoutDashboard, label: 'Notarial Acts List', path: '/notary-acts', end: true },
    { icon: Grid, label: 'Registry', path: '/notary-acts/registry' },
    { icon: FileText, label: 'Detail', path: '/notary-acts/detail' },
    { icon: Settings, label: 'Technical', path: '/notary-acts/technical' },
    { icon: History, label: 'Traceability', path: '/notary-acts/traceability' },
    { icon: ShieldCheck, label: 'Security', path: '/notary-acts/security' },
    { icon: AlertTriangle, label: 'Risk Handling', path: '/notary-acts/risk' },
    { icon: UserCheck, label: 'Oversight', path: '/notary-acts/oversight' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f8f8f8] overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        navItems={sidebarItems}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen((v) => !v);
            } else {
              setCollapsed((v) => !v);
            }
          }}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f8f8]">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};
