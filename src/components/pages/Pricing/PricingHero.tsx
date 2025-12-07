"use client";

import { PRICING_HERO } from "@/constants/pricingData";
import { motion } from "framer-motion";

export default function PricingHero() {
    return (
        <section className="relative w-full py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center z-10">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6"
            >
                {PRICING_HERO.title}
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl font-medium text-foreground/90 max-w-4xl mb-6"
            >
                {PRICING_HERO.subtitle}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-foreground/70 max-w-3xl leading-relaxed"
            >
                {PRICING_HERO.description}
            </motion.p>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </section>
    );
}
