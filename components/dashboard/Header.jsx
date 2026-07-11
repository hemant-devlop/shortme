"use client";

import UserDropdown from "@/components/dashboard/UserDropdown";
import { Menu, Search } from "lucide-react";

export default function Header({ onToggleMobile = () => {}, handleLogout }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl p-2 text-gray-600 transition hover:bg-violet-50 hover:text-violet-600 lg:hidden"
          onClick={onToggleMobile}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>        
      </div>

      <div className="flex flex-1 items-center justify-end sm:justify-between gap-3">
        <label className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 sm:flex">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search links or analytics"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </label>

        <UserDropdown handleLogout={handleLogout} />
      </div>
    </header>
  );
}