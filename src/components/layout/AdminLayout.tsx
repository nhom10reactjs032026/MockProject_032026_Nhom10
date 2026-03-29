import { Outlet, NavLink } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  ClipboardList,
  Calendar,
  History,
  ShieldCheck,
  FileText,
  UserCircle,
  LogOut,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AdminLayout = () => {
  const sidebarItems = [
    {
      icon: <Users size={20} />,
      label: "Notary Profile",
      path: "/admin/notaries",
    },
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    { icon: <ClipboardList size={20} />, label: "Jobs", path: "/admin/jobs" },
    {
      icon: <Calendar size={20} />,
      label: "Scheduling",
      path: "/admin/calendar",
    },
    { icon: <History size={20} />, label: "History", path: "/admin/history" },
    {
      icon: <ShieldCheck size={20} />,
      label: "Security",
      path: "/admin/security",
    },
    {
      icon: <FileText size={20} />,
      label: "Documents",
      path: "/admin/documents",
    },
    { icon: <UserCircle size={20} />, label: "Admins", path: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col shadow-xl z-30">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
            <span className="font-black text-2xl tracking-tighter">NA</span>
          </div>
          <span className="font-bold text-xl tracking-tight italic">
            NotaryApp
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-white text-blue-600 shadow-lg shadow-blue-700/20 font-bold"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-100 hover:bg-white/10 hover:text-white gap-3 px-4 h-12 rounded-xl"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Pages /</span>
            <span className="text-slate-800 font-bold">
              Notary Profile Management
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">
                  Duc Joey
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Admin
                </p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-blue-100 p-0.5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
