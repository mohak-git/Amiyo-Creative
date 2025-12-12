"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function PricingCTA() {
    return (
        <section className="relative w-full py-12 md:py-16 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto space-y-8 z-10">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        <span className="block text-foreground mb-2">
                            Looking for something specific?
                        </span>
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-500 to-pink-500">
                            Or need a custom combination?
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                        Reach out to us — we&apos;ll create a bespoke solution
                        designed exclusively for your brand.
                    </p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link
                        href="/contact"
                        className="group cursor-target cursor-none relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl">
                        Get a Custom Quote
                        <FaArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
