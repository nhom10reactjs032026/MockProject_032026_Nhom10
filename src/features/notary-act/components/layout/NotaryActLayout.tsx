import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Database,
  FileText,
  Settings,
  History,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  Bell
} from 'lucide-react';


import {
  MdSpaceDashboard,
  MdGridView
} from "react-icons/md";


import { BiSolidDetail } from "react-icons/bi";

export const NotaryActLayout = () => {
  const location = useLocation();
  const sidebarItems = [
    { icon: <MdSpaceDashboard size={20} />, label: 'Notarial Acts List', path: '/notary-acts' },
    { icon: <MdGridView size={20} />, label: 'Registry', path: '/notary-acts/registry' },
    { icon: <BiSolidDetail size={20} />, label: 'Detail', path: '/notary-acts/detail' },
    { icon: <Settings size={20} />, label: 'Technical', path: '/notary-acts/technical' },
    { icon: <History size={20} />, label: 'Traceability', path: '/notary-acts/traceability' },
    { icon: <ShieldCheck size={20} />, label: 'Security', path: '/notary-acts/security' },
    { icon: <AlertTriangle size={20} />, label: 'Risk Handling', path: '/notary-acts/risk' },
    { icon: <UserCheck size={20} />, label: 'Oversight', path: '/notary-acts/oversight' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fbff]/30">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col shadow-xl z-30 fixed h-full">
        {/* Logo */}
        <div className="p-8 flex items-center justify-center">
          <div className="w-30 h-20 bg-white rounded-2xl flex items-center justify-center shadow-inner">
            <span className="font-black text-4xl text-blue-600 tracking-tighter">LOGO</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                // Custom logic to keep "Notarial Acts List" active for its child routes like :id, :id/setup
                // but not for other sidebar menu items that also start with /notary-acts/
                const otherMenuPaths = sidebarItems.filter(i => i.path !== '/notary-acts').map(i => i.path);
                const isExactOrChild = 
                  item.path === '/notary-acts' 
                    ? location.pathname.startsWith('/notary-acts') && !otherMenuPaths.some(p => location.pathname.startsWith(p))
                    : isActive;

                return `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 font-medium ${
                  isExactOrChild
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`;
              }}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Notary office</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                NM
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800 leading-none">Min no</p>
                <p className="text-[11px] text-slate-500 mt-1">Notary</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
