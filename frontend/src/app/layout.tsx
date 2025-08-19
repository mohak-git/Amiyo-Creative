import Navbar from "@/components/Navbar";
import Cursor from "@/components/ui/Cursor";
import ScrollBar from "@/components/ui/ScrollBar";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen overflow-x-hidden">
                <ScrollBar />
                <Cursor />
                <Navbar />

                <main className="pt-[13vh]">{children}</main>
            </body>
        </html>
    );
}
