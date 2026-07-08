"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Home,
    BarChart3,
    LogOut,
    Link2,
    X
} from "lucide-react";

const menus = [
    {
        name: "Dashboard",
        href: "/shortme",
        icon: Home
    },
    {
        name: "Analytics",
        href: "/shortme/analytics",
        icon: BarChart3
    }
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {

    const pathname = usePathname();

    return (

        <>

            {/* backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-zinc-800 p-6 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0`}>

                <div className="flex items-center justify-between gap-2 mb-12">

                    <div className="flex items-center gap-2">

                        <Link2 size={30} />

                        <h1 className="text-2xl font-bold">ShortMe</h1>

                    </div>

                    <button className="lg:hidden" onClick={onClose} aria-label="Close sidebar">
                        <X />
                    </button>

                </div>

                <nav className="space-y-3">

                    {menus.map((menu) => {

                        const Icon = menu.icon;

                        return (

                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={`flex items-center gap-3 p-3 rounded-xl transition ${pathname===menu.href ? "bg-blue-600" : "hover:bg-zinc-900"}`}
                            >

                                <Icon size={20} />

                                {menu.name}

                            </Link>

                        );

                    })}

                </nav>

                <button className="mt-20 flex items-center gap-3 text-red-500">

                    <LogOut />

                    Logout

                </button>

            </aside>

        </>

    );

}