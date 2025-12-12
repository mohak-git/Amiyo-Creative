"use client";

import PricingCard from "@/components/ui/PricingCard";
import { PRICING_PACKAGES } from "@/constants/pricingData";
import { motion } from "framer-motion";

export default function PricingPackages() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                    Curated Packages
                </h2>
                <p className="text-foreground/60 text-lg">
                    Bundled solutions for creators and brands.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
                {PRICING_PACKAGES.map((pkg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="h-full">
                        <PricingCard data={pkg} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
