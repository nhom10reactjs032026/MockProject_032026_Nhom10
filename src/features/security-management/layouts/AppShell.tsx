import type { ReactNode } from "react";

import AppLayout from "../../../components/layout/AppLayout";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <AppLayout>
      <div className="flex min-h-screen bg-slate-100 text-slate-900">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="p-6">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}