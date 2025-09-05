import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toaster";
import ReactQuery from "@/components/providers/ReactQuery";
import Cursor from "@/components/ui/Cursor";
import GoToTop from "@/components/ui/GoToTop";
import ScrollBar from "@/components/ui/ScrollBar";
import { ReactNode, Suspense } from "react";
import Loader from "@/app/loading";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen overflow-x-hidden">
                <ReactQuery>
                    <Suspense fallback={<Loader />}>
                        <ScrollBar />
                        <Cursor />
                        <Navbar />

                        {children}
                        <Footer />

                        <GoToTop />
                        <Toast />
                    </Suspense>
                </ReactQuery>
            </body>
        </html>
    );
}
