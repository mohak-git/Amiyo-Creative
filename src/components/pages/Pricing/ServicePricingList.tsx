"use client";

import { SERVICES_PRICING } from "@/constants/pricingData";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ServicePricingList() {
    const [openCategory, setOpenCategory] = useState<string | null>(SERVICES_PRICING[0].category);

    const toggleCategory = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Add-ons & Independent Service Quotes</h2>
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                    Customize your package with these add-ons or request a standalone quote for specific services.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {SERVICES_PRICING.map((section, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm"
                    >
                        <button
                            onClick={() => toggleCategory(section.category)}
                            className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
                        >
                            <span className="text-xl font-semibold text-foreground">{section.category}</span>
                            {openCategory === section.category ? (
                                <FaChevronUp className="text-foreground/50" />
                            ) : (
                                <FaChevronDown className="text-foreground/50" />
                            )}
                        </button>

                        <AnimatePresence>
                            {openCategory === section.category && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="p-6 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.items.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className="flex justify-between items-center p-3 rounded-lg bg-black/20"
                                            >
                                                <span className="text-foreground/80 font-medium">{item.name}</span>
                                                <span className="text-blue-400 font-semibold text-sm md:text-base">{item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
