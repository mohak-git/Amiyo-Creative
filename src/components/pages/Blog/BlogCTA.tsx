"use client";

import { BLOG_CTA } from "@/constants/blogData";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function BlogCTA() {
    return (
        <section className="w-full py-24 px-6 mt-12 relative overflow-hidden bg-[#020618] text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    {BLOG_CTA.title}
                </h2>
                <p className="text-lg text-white/70 mb-10 max-w-2xl">
                    {BLOG_CTA.description}
                </p>

                <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    <span className="relative z-10 flex items-center gap-2">
                        {BLOG_CTA.buttonText}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>
            </motion.div>

            {/* Background Gradients */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
        </section>
    );
}
