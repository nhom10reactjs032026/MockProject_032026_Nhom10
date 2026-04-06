import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <main className="min-h-screen">
      <Outlet />
      <Toaster position="top-right" richColors />
    </main>
  );
}
