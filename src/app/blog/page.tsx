import BlogCategory from "@/components/pages/Blog/BlogCategory";
import BlogHero from "@/components/pages/Blog/BlogHero";
import { BLOG_CATEGORIES } from "@/constants/blogData";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Amiyo Creative - Insights, Production & Branding",
    description:
        "Explore the Amiyo Creative Blog for expert insights on pre-production, filming, editing, CGI, web development, branding, and marketing strategies.",
    keywords: [
        "Video Production Blog",
        "Branding Insights",
        "CGI Breakdown",
        "Web Development Guide",
        "Amiyo Creative Blog",
    ],
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-foreground pt-12 md:pt-[13vh]">
            <BlogHero />

            <div className="flex flex-col  pb-20 relative z-10">
                {BLOG_CATEGORIES.map((category, index) => (
                    <BlogCategory
                        key={index}
                        category={category}
                        index={index}
                    />
                ))}
            </div>

            {/* <BlogCTA /> */}
        </main>
    );
}
