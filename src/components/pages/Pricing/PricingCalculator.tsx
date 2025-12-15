"use client";

import { CALCULATOR_ITEMS } from "@/constants/pricingData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

export default function PricingCalculator() {
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState<Record<string, number>>(
        {}
    );

    const updateQuantity = (id: string, delta: number) => {
        setSelectedItems((prev) => {
            const currentQty = prev[id] || 0;
            const newQty = Math.max(0, currentQty + delta);

            const newItems = { ...prev };
            if (newQty === 0) {
                delete newItems[id];
            } else {
                newItems[id] = newQty;
            }
            return newItems;
        });
    };

    const total = Object.entries(selectedItems).reduce((acc, [id, qty]) => {
        const item = CALCULATOR_ITEMS.find((i) => i.id === id);
        return acc + (item ? item.price * qty : 0);
    }, 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    Custom Quote Calculator
                </h2>
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                    Select the services you need to get an estimated minimum
                    base price. Final pricing may vary based on complexity and
                    specific requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Selection Area */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CALCULATOR_ITEMS.map((item) => {
                        const quantity = selectedItems[item.id] || 0;
                        const isSelected = quantity > 0;

                        return (
                            <motion.div
                                key={item.id}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                    isSelected
                                        ? "bg-blue-500/20 border-blue-500/50"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}>
                                <div className="text-left flex-1">
                                    <h4
                                        className={`font-semibold ${
                                            isSelected
                                                ? "text-blue-400"
                                                : "text-foreground"
                                        }`}>
                                        {item.name}
                                    </h4>
                                    <span className="text-xs text-foreground/50">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {isSelected ? (
                                        <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, -1)
                                                }
                                                className="w-8 h-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-foreground transition-colors">
                                                <FaMinus className="size-2.5" />
                                            </button>
                                            <span className="font-bold w-4 text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, 1)
                                                }
                                                className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                                                <FaPlus className="size-2.5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, 1)
                                            }
                                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
                                            Add {formatCurrency(item.price)}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-foreground mb-6">
                            Estimated Estimate
                        </h3>

                        {Object.keys(selectedItems).length > 0 ? (
                            <ul className="space-y-3 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {Object.entries(selectedItems).map(
                                    ([id, quantity]) => {
                                        const item = CALCULATOR_ITEMS.find(
                                            (i) => i.id === id
                                        );
                                        if (!item) return null;
                                        return (
                                            <li
                                                key={id}
                                                className="flex justify-between text-sm">
                                                <span className="text-foreground/70">
                                                    {item.name}{" "}
                                                    <span className="text-xs opacity-50 ml-1">
                                                        x{quantity}
                                                    </span>
                                                </span>
                                                <span className="text-foreground font-medium">
                                                    {formatCurrency(
                                                        item.price * quantity
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        ) : (
                            <p className="text-foreground/40 text-sm mb-6 italic">
                                No services selected.
                            </p>
                        )}

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-foreground/60">
                                    Total Base Price
                                </span>
                                <span className="text-3xl font-bold text-blue-400">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                            <p className="text-xs text-foreground/40 mb-6">
                                * This is an estimate based on minimum standard
                                rates. Final quote provided after discussion.
                            </p>

                            <button
                                onClick={() => {
                                    const itemsList = Object.entries(
                                        selectedItems
                                    )
                                        .map(([id, quantity]) => {
                                            const item = CALCULATOR_ITEMS.find(
                                                (i) => i.id === id
                                            );
                                            return item
                                                ? `- ${
                                                      item.name
                                                  } (x${quantity}) - ${formatCurrency(
                                                      item.price * quantity
                                                  )}`
                                                : "";
                                        })
                                        .join("\n");
                                    const message = `I am interested in a custom quote for the following services:\n\n${itemsList}\n\nEstimated Base Price: ${formatCurrency(
                                        total
                                    )}`;
                                    router.push(
                                        `/contact?message=${encodeURIComponent(
                                            message
                                        )}`
                                    );
                                }}
                                disabled={
                                    Object.keys(selectedItems).length === 0
                                }
                                className="w-full cursor-target cursor-none py-4 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity">
                                Request Formal Quote
                            </button>

                            {Object.keys(selectedItems).length > 0 && (
                                <button
                                    onClick={() => setSelectedItems({})}
                                    className="w-full mt-3 py-2 text-sm text-red-400 hover:text-red-300 flex items-center justify-center gap-2">
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
