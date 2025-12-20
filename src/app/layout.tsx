import Layout from "@/components/Layout";
import ReactQuery from "@/components/providers/ReactQuery";
import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AMIYO CREATIVE | Search AMIYO",
    description: "Welcome to AMIYO CREATIVE. Search AMIYO for the best creative services, innovative solutions, and professional digital experiences.",
    keywords: ["AMIYO CREATIVE", "Search AMIYO", "Creative Agency", "Digital Services", "Portfolio", "Web Design", "Branding"],
    openGraph: {
        title: "AMIYO CREATIVE | Search AMIYO",
        description: "Welcome to AMIYO CREATIVE. Search AMIYO for the best creative services.",
        type: "website",
        locale: "en_US",
        siteName: "AMIYO CREATIVE",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "AMIYO CREATIVE Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AMIYO CREATIVE | Search AMIYO",
        description: "Welcome to AMIYO CREATIVE. Search AMIYO for the best creative services.",
        images: ["/logo.png"],
    },
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen overflow-x-hidden">
                <ReactQuery>
                    <Layout>{children}</Layout>
                </ReactQuery>
            </body>
        </html>
    );
}
