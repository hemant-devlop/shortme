"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 bg-zinc-900 px-3 py-1 rounded-full hover:bg-zinc-800"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <User size={16} />
        </div>
        <span className="hidden sm:inline">Account</span>
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-zinc-800 rounded-md py-2 z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-zinc-900 flex items-center gap-2"
            onClick={() => router.push('/profile')}
          >
            <User />
            Profile
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-zinc-900 flex items-center gap-2 text-red-500"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
