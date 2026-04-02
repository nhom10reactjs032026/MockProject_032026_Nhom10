import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, type LucideIcon, X } from "lucide-react";

export interface SidebarNavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  end?: boolean;
}

interface SidebarProps {
  navItems: SidebarNavItem[];
  collapsed?: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar = ({
  navItems,
  collapsed = false,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) => {
  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={`

          hidden lg:flex flex-col bg-white border-r border-[#ebebeb]
          h-screen shrink-0 font-['Plus_Jakarta_Sans'] transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-60"}
        `}
      >
        {/* Logo / Brand */}
        <div
          className={`border-b border-[#ebebeb] flex items-center gap-3 shrink-0 overflow-hidden
          ${collapsed ? "justify-center px-0 py-5" : "px-5 py-5"}`}
        >
          <div className="w-8 h-8 bg-[#c4a484] flex items-center justify-center rounded-sm shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-sm font-extrabold text-foreground tracking-tight uppercase whitespace-nowrap">
                Notary
              </span>
              <span className="block text-[10px] font-bold text-[#c4a484] uppercase tracking-widest -mt-0.5 whitespace-nowrap">
                Offices Management
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-sm transition-all group border-l-2
                  ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5"}
                  ${
                    isActive
                      ? "bg-[#fdf6ef] text-[#c4a484] border-[#c4a484]"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#f8f8f8] border-transparent"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-semibold whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ── Mobile sidebar (overlay drawer) ── */}
      <aside
        className={`
            
          fixed top-0 left-0 h-full z-30 flex flex-col bg-white border-r border-[#ebebeb]
          w-64 font-['Plus_Jakarta_Sans'] transition-transform duration-300 ease-in-out
          lg:hidden
          ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}
      >
        {/* Mobile header */}
        <div className="px-5 py-5 border-b border-[#ebebeb] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c4a484] flex items-center justify-center rounded-sm">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-foreground tracking-tight uppercase">
                Notary
              </span>
              <span className="block text-[10px] font-bold text-[#c4a484] uppercase tracking-widest -mt-0.5">
                Offices Management
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-[#f8f8f8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-sm transition-all border-l-2 ${
                    isActive
                      ? "bg-[#fdf6ef] text-[#c4a484] border-[#c4a484]"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#f8f8f8] border-transparent"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
