import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, type SidebarNavItem } from "./Sidebar";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: SidebarNavItem[] = [
    {
      icon: Users,
      label: "Notary Profile",
      path: "/admin/notaries",
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    { icon: ClipboardList, label: "Jobs", path: "/admin/jobs" },
    {
      icon: Calendar,
      label: "Scheduling",
      path: "/admin/calendar",
    },
    { icon: History, label: "History", path: "/admin/history" },
    {
      icon: ShieldCheck,
      label: "Security",
      path: "/admin/security/access-control",
    },
    {
      icon: FileText,
      label: "Documents",
      path: "/admin/documents",
    },
    { icon: UserCircle, label: "Admins", path: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <Sidebar navItems={sidebarItems} collapsed={isCollapsed} />

      {/* 2. Main Content*/}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-[#ebebeb] flex items-center justify-between px-8 sticky top-0 z-20 font-['Plus_Jakarta_Sans']">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium text-sm">Pages /</span>
            <span className="text-slate-800 font-bold text-sm tracking-tight">
              Admin System
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-[#c4a484] hover:bg-[#fdf6ef] rounded-full"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </Button>

            {/* Profile - Đã đổi tên thành Văn Hữu Đan cho chuẩn nè */}
            <div className="flex items-center gap-3 pl-6 border-l border-[#ebebeb]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">
                  Văn Hữu Đan
                </p>
                <p className="text-[10px] font-bold text-[#c4a484] uppercase mt-1 tracking-widest">
                  Administrator
                </p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-[#fdf6ef] p-0.5 shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>HD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          {/* Nơi hiện nội dung các trang con (Notary Profile, Dashboard, Seals...) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
