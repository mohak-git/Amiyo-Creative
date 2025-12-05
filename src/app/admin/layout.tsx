"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
    FaEnvelope,
    FaHome,
    FaProjectDiagram,
    FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/admin/login") return <>{children}</>;

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: FaHome },
        { name: "Projects", href: "/admin/projects", icon: FaProjectDiagram },
        { name: "Enquiries", href: "/admin/enquiries", icon: FaEnvelope },
    ];

    return (
        <div className="flex h-screen bg-black text-zinc-100 font-sans">
            <aside className="w-56 bg-zinc-950 border-r border-zinc-800 flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold tracking-tighter uppercase">
                        Amiyo Admin
                    </h1>
                </div>
                <nav className="flex-1 p-0">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-6 py-4 transition-colors border-l-2 ${
                                    isActive
                                        ? "border-white bg-zinc-900 text-white"
                                        : "border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                                }`}>
                                <item.icon className="text-lg" />
                                <span className="uppercase text-sm tracking-widest font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-0 border-t border-zinc-800">
                    <button
                        onClick={async () => {
                            await fetch("/api/auth/logout", {
                                method: "POST",
                            });
                            router.push("/admin/login");
                        }}
                        className="flex items-center space-x-3 px-6 py-4 w-full text-left text-zinc-500 hover:bg-red-950/30 hover:text-red-400 transition-colors border-l-2 border-transparent hover:border-red-900">
                        <FaSignOutAlt className="text-lg" />
                        <span className="uppercase text-sm tracking-widest font-medium">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-12 bg-black">
                {children}
            </main>
        </div>
    );
}
