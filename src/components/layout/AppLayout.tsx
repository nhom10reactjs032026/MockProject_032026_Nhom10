import type { ReactNode } from "react";
import { Header } from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Header fixed -> phải chừa chỗ */}
      <main className="flex-1 pt-28">{children}</main>

      <Footer />
    </div>
  );
}