"use client";

import UserDropdown from "@/components/dashboard/UserDropdown";
import { Menu } from "lucide-react";

export default function Header({ onToggleMobile = () => {} }) {

    return (

        <header className="h-20 border-b border-zinc-800 flex justify-between items-center px-6 lg:px-8">

            <div className="flex items-center gap-4">

                <button className="lg:hidden p-2 rounded-md hover:bg-zinc-900" onClick={onToggleMobile} aria-label="Open menu">
                    <Menu />
                </button>

                <div>

                    <h2 className="text-2xl font-bold">Welcome 👋</h2>

                    <p className="text-gray-400">Generate short links instantly</p>

                </div>

            </div>

            <div>

                <UserDropdown />

            </div>

        </header>

    );

}