import { useMemo, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import Footer from "./Footer";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Stamp,
  FileSignature,
  CalendarDays,
} from "lucide-react";
import type { SidebarNavItem } from "./Sidebar";
import { useAuthStore } from "@/store/useAuthStore";

export const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const isJournal = location.pathname.startsWith("/notary-journal");
  // Mobile: sidebar slides in as overlay
  const [mobileOpen, setMobileOpen] = useState(false);
  // Desktop: sidebar collapses to icon-only
  const [collapsed, setCollapsed] = useState(false);

  const navItems: SidebarNavItem[] = useMemo(() => {
    switch (user?.role) {
      case "admin":
        return [
          { icon: Users, label: "Notary Profile", path: "/admin/notaries" },
          {
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/admin/dashboard",
          },
          { icon: BookOpen, label: "Journal", path: "/notary-journal" },
          {
            icon: Stamp,
            label: "Seal & Digital Signature",
            path: "/admin/seals",
          },
        ];
      case "notary":
        return [
          { icon: FileSignature, label: "Notary Acts", path: "/notary-acts" },
          // { icon: BookOpen, label: "Journal", path: "/notary-journal" },
        ];
      case "dispatcher":
        return [{ icon: CalendarDays, label: "Scheduling", path: "/planning" }];
      default:
        return [{ icon: BookOpen, label: "Journal", path: "/notary-journal" }];
    }
  }, [user?.role]);

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
        navItems={navItems}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar
          onToggleSidebar={() => {
            // On mobile: toggle mobile overlay; on desktop: toggle collapse
            if (window.innerWidth < 1024) {
              setMobileOpen((v) => !v);
            } else {
              setCollapsed((v) => !v);
            }
          }}
        />

        {/* Sub-nav: Dashboard / Journal Manager */}
        {isJournal && (
          <div className="bg-white border-b border-[#ebebeb] shrink-0">
            <div className="px-6 flex items-center gap-8">
              <NavLink
                to="/notary-journal"
                end
                className={({ isActive }) =>
                  `py-3.5 text-sm font-bold uppercase tracking-widest transition-colors relative ${
                    isActive
                      ? "text-[#c4a484]"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Dashboard
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c4a484]" />
                    )}
                  </>
                )}
              </NavLink>
              <NavLink
                to="/notary-journal/manager"
                className={({ isActive }) =>
                  `py-3.5 text-sm font-bold uppercase tracking-widest transition-colors relative ${
                    isActive
                      ? "text-[#c4a484]"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Journal Manager
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c4a484]" />
                    )}
                  </>
                )}
              </NavLink>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f8f8]">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};
