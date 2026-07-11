"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Link2,
  Sparkles,
  QrCode,
  Star,
  History,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const menus = [
    { name: "Generate Link", href: "/shortme", icon: Sparkles },
  { name: "My Links", href: "/links", icon: Link2 },
  { name: "Analytics", href: "/shortme/analytics", icon: BarChart3 },
  { name: "Favorites", href: "", icon: Star },
  { name: "History", href: "", icon: History },
];

export default function Sidebar({ isOpen = false, onClose = () => {},handleLogout }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-65 flex-col border-r border-gray-200 bg-white px-5 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:top-0 lg:translate-x-0 lg:h-screen`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link href="/shortme" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
              <Link2 size={20} />
            </div>
            <div>
              <p className="text-[16px] font-semibold tracking-tight text-gray-900">
                Shortenly
              </p>
            </div>
          </Link>

          <button
            className="rounded-full p-2 text-gray-500 transition hover:bg-violet-50 hover:text-violet-600 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>


        <nav className="flex-1 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              (menu.name === "Generate Link" && pathname === "/shortme") ||
              (menu.name === "Analytics" && pathname.startsWith("/shortme/analytics")) ||
              (menu.name !== "Generate Link" && pathname === menu.href);

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`group flex h-11 items-center gap-3 rounded-2xl px-3 text-[15px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "text-gray-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-gray-500 transition-colors group-hover:text-violet-600"}
                />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
          <Link
            href="/shortme"
            className="flex h-11 items-center gap-3 rounded-2xl px-3 text-[15px] font-medium text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-50 hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <Link
            href="/shortme"
            className="flex h-11 items-center gap-3 rounded-2xl px-3 text-[15px] font-medium text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
          >
            <HelpCircle size={18} />
            <span>Help</span>
          </Link>

          <button
            type="button"
            className="flex h-11 w-full items-center gap-3 rounded-2xl px-3 text-[15px] font-medium text-rose-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}