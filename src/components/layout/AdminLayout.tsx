import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import {
    Users,
    LayoutDashboard,
    BookOpen,
    Bell,
    Stamp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar } from "./Sidebar";

export const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarItems = [
        { icon: Users, label: 'Notary Profile', path: '/admin/notaries' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: BookOpen, label: 'Journal', path: '/admin/journal' },
        { icon: Stamp, label: 'Seal & Digital Signature', path: '/admin/seals' },
    ];

    return (
        <div className="flex min-h-screen bg-[#fcfcfc]">
            {/* Sidebar beige */}
            <Sidebar
                navItems={sidebarItems}
                collapsed={isCollapsed}
            />

            {/* Main Content bên phải */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-[#ebebeb] flex items-center justify-between px-8 sticky top-0 z-20 font-['Plus_Jakarta_Sans']">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-medium text-sm">Pages /</span>
                        <span className="text-slate-800 font-bold text-sm tracking-tight">Admin System</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notification */}
                        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-[#c4a484] hover:bg-[#fdf6ef] rounded-full">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </Button>

                        {/* Profile */}
                        <div className="flex items-center gap-3 pl-6 border-l border-[#ebebeb]">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800 leading-none">Văn Hữu Đan</p>
                                <p className="text-[10px] font-bold text-[#c4a484] uppercase mt-1 tracking-widest">Administrator</p>
                            </div>
                            <Avatar className="h-10 w-10 border-2 border-[#fdf6ef] p-0.5 shadow-sm">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>HD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#fafafa]">
                    {/* Đây là nơi hiện nội dung các trang con */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};