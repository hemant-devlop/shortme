"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950">

      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1">

        <Header onToggleMobile={() => setMobileOpen((v) => !v)} />

        <main className="p-8">{children}</main>

      </div>

    </div>
  );
}
