import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Settings,
  History,
  ShieldCheck,
  AlertTriangle,
  Users,
  PenTool
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/notary-journal' },
  { icon: BookOpen, label: 'Registry', path: '/notary-journal/registry' },
  { icon: FileText, label: 'Detail', path: '/notary-journal/detail' },
  { icon: Settings, label: 'Technical', path: '/notary-journal/technical' },
  { icon: History, label: 'Traceability', path: '/notary-journal/traceability' },
  { icon: ShieldCheck, label: 'Security', path: '/notary-journal/security' },
  { icon: AlertTriangle, label: 'Risk Handling', path: '/notary-journal/risk' },
  { icon: Users, label: 'Oversight', path: '/notary-journal/oversight' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#2563eb] text-white flex flex-col min-h-screen font-sans">
      <div className="flex-1 py-8">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-8 py-4 text-sm font-semibold transition-colors ${isActive
                    ? 'text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
                end={item.path === '/notary-journal'}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto">
        <div className="bg-white rounded-r-full py-4 px-8 flex items-center gap-4 text-[#2563eb] font-semibold text-sm cursor-pointer mr-6 shadow-sm">
          <PenTool className="w-5 h-5" />
          Journal
        </div>
      </div>
    </aside>
  );
};
