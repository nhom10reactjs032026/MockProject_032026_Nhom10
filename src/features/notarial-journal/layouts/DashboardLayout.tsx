import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8fafc] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
