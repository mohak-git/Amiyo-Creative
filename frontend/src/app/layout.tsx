import Navbar from "@/components/Navbar";
import Cursor from "@/components/ui/Cursor";
import ScrollBar from "@/components/ui/ScrollBar";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat-alternates",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${montserratAlternates.variable}`}
        >
            <body className="min-h-screen overflow-x-hidden font-montserrat-alternates">
                <ScrollBar />
                <Cursor />
                <Navbar />

                <main className="pt-[13vh]">{children}</main>
            </body>
        </html>
    );
}
