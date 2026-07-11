"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { useRouter } from "next/navigation";

export default function DashboardShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router=useRouter()
   const handleLogout = async () => {
    console.log('jj')
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">

      <Sidebar isOpen={mobileOpen} handleLogout={handleLogout} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 h-screen overflow-hidden">

        <Header onToggleMobile={() => setMobileOpen((v) => !v)} handleLogout={handleLogout} />

        <main className="p-8 h-full ">{children}</main>

      </div>

    </div>
  );
}
