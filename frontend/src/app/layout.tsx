import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/ui/Cursor";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen overflow-x-hidden">
                <CustomCursor />

                <Navbar />
                <div className="h-[9vh]"></div>

                {children}
            </body>
        </html>
    );
}
