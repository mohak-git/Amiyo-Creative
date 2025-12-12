"use client";

import { motion } from "framer-motion";

interface BlogPost {
    title: string;
    description: string;
    tags: string[];
}

interface BlogCategoryData {
    title: string;
    description: string;
    posts: BlogPost[];
}

interface BlogCategoryProps {
    category: BlogCategoryData;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function BlogCategory({ category }: BlogCategoryProps) {
    return (
        <section className="w-full py-16 px-6 max-w-7xl mx-auto">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-px bg-foreground/20 grow max-w-[50px]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wide">
                        {category.title.toUpperCase()}
                    </h2>
                    <span className="h-px bg-foreground/20 grow" />
                </div>
                <p className="text-foreground/70 max-w-3xl text-lg pl-0 md:pl-[66px]">
                    {category.description}
                </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.1 }}>
                {category.posts.map((post, i) => (
                    <motion.article
                        key={i}
                        variants={cardVariants}
                        className="group relative flex flex-col p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-sm text-foreground/60 mb-6 grow leading-relaxed">
                                {post.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {post.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/80 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}
