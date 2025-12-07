"use client";

import Loader from "@/components/Loader";
import { AdminNavItems } from "@/constants/constants";
import { useLogout } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { mutateAsync: logout, isPending } = useLogout();

    const handleOnClick = async () => {
        await logout();
        toast.success("Logged out successfully");
        router.push("/admin/login");
    };

    if (pathname === "/admin/login") return <>{children}</>;

    if (isPending) return <Loader />;

    return (
        <div className="flex h-screen bg-black text-zinc-100 font-sans">
            <aside className="w-52 bg-zinc-950 border-r border-zinc-800 flex flex-col">
                <nav className="flex-1">
                    {AdminNavItems.map((item) => {
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
                        onClick={handleOnClick}
                        className="flex items-center space-x-3 px-6 py-4 w-full text-left text-zinc-500 hover:bg-red-950/30 hover:text-red-400 transition-colors border-l-2 border-transparent hover:border-red-900">
                        <FaSignOutAlt className="text-lg" />
                        <span className="uppercase text-sm tracking-widest font-medium">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8 bg-black">
                {children}
            </main>
        </div>
    );
}
