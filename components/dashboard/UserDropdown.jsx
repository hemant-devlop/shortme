"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";

export default function UserDropdown({ handleLogout }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data?.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-4 rounded-full border border-gray-200 bg-white px-2 py-1.5 shadow-sm transition hover:border-violet-200 hover:bg-violet-50"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className=" text-left sm:block">
          <p className="text-sm font-medium text-gray-900">
            {user?.username || "Account"}
          </p>
        </div>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
          <button
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
            onClick={() => router.push("/profile")}
          >
            <User size={16} />
            Profile
          </button>

          <button
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-500 transition hover:bg-rose-50"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
