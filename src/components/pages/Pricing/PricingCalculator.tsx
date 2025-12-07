"use client";

import { CALCULATOR_ITEMS } from "@/constants/pricingData";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

export default function PricingCalculator() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const total = selectedItems.reduce((acc, id) => {
        const item = CALCULATOR_ITEMS.find(i => i.id === id);
        return acc + (item ? item.price : 0);
    }, 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    Custom Quote Calculator
                </h2>
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                    Select the services you need to get an estimated minimum base price.
                    Final pricing may vary based on complexity and specific requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Selection Area */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CALCULATOR_ITEMS.map((item) => {
                        const isSelected = selectedItems.includes(item.id);
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${isSelected
                                        ? "bg-blue-500/20 border-blue-500/50"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <div className="text-left">
                                    <h4 className={`font-semibold ${isSelected ? "text-blue-400" : "text-foreground"}`}>
                                        {item.name}
                                    </h4>
                                    <span className="text-xs text-foreground/50">{item.category}</span>
                                </div>

                                {isSelected ? (
                                    <FaCheckCircle className="text-blue-500 text-xl" />
                                ) : (
                                    <span className="text-foreground/60 font-medium text-sm">
                                        {formatCurrency(item.price)}
                                    </span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-foreground mb-6">Estimated Estimate</h3>

                        {selectedItems.length > 0 ? (
                            <ul className="space-y-3 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {selectedItems.map(id => {
                                    const item = CALCULATOR_ITEMS.find(i => i.id === id);
                                    if (!item) return null;
                                    return (
                                        <li key={id} className="flex justify-between text-sm">
                                            <span className="text-foreground/70">{item.name}</span>
                                            <span className="text-foreground font-medium">{formatCurrency(item.price)}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-foreground/40 text-sm mb-6 italic">No services selected.</p>
                        )}

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-foreground/60">Total Base Price</span>
                                <span className="text-3xl font-bold text-blue-400">{formatCurrency(total)}</span>
                            </div>
                            <p className="text-xs text-foreground/40 mb-6">
                                * This is an estimate based on minimum standard rates. Final quote provided after discussion.
                            </p>

                            <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity">
                                Request Formal Quote
                            </button>

                            {selectedItems.length > 0 && (
                                <button
                                    onClick={() => setSelectedItems([])}
                                    className="w-full mt-3 py-2 text-sm text-red-400 hover:text-red-300 flex items-center justify-center gap-2"
                                >
                                    <FaTrash size={12} /> Clear Selection
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
