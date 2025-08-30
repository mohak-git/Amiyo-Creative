import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toaster";
import ReactQuery from "@/components/providers/ReactQuery";
import Cursor from "@/components/ui/Cursor";
import GoToTop from "@/components/ui/GoToTop";
import ScrollBar from "@/components/ui/ScrollBar";
import { Montserrat_Alternates } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat-alternates",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${montserratAlternates.variable}`}
        >
            <body className="min-h-screen overflow-x-hidden font-montserrat-alternates">
                <ReactQuery>
                    <ScrollBar />
                    <Cursor />
                    <Navbar />

                    {children}
                    <Footer />

                    <GoToTop />
                    <Toast />
                </ReactQuery>
            </body>
        </html>
    );
}
