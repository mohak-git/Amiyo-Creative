"use client";

import Loader from "@/app/loading";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toaster";
import ContactButtons from "@/components/ui/ContactButtons";
import Cursor from "@/components/ui/Cursor";
import GoToTop from "@/components/ui/GoToTop";
import ScrollBar from "@/components/ui/ScrollBar";
import { usePathname } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const is_admin = pathname.startsWith("/admin");

    return (
        <Suspense fallback={<Loader />}>
            {!is_admin && (
                <>
                    <ScrollBar />
                    <Cursor />
                    <Navbar />
                </>
            )}

            {children}

            {!is_admin && (
                <>
                    <Footer />
                    <GoToTop />
                    <ContactButtons />
                </>
            )}

            <Toast />
        </Suspense>
    );
}
