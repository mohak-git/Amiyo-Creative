"use client";

import { DELIVERY_OPTIONS, POLICIES } from "@/constants/pricingData";
import { FaCheck, FaExclamation, FaRupeeSign } from "react-icons/fa";

export default function PricingPolicies() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
            {/* Delivery Options */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                    Delivery Speed Options
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DELIVERY_OPTIONS.map((opt, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                            <h3 className="text-xl font-bold text-blue-300 mb-2">
                                {opt.title}
                            </h3>
                            <div className="text-2xl font-bold text-foreground mb-4">
                                {opt.cost}
                            </div>
                            <p className="text-sm text-foreground/70 mb-4 h-10">
                                {opt.description}
                            </p>
                            <ul className="space-y-2">
                                {opt.features.map((feature, fIdx) => (
                                    <li
                                        key={fIdx}
                                        className="text-xs text-foreground/50 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Policies */}
            <div>
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                    Our Policies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Revisions */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                                1
                            </span>
                            {POLICIES.revision.title}
                        </h3>
                        <ul className="space-y-4">
                            {POLICIES.revision.details.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-foreground/70 text-sm leading-relaxed flex items-center gap-3">
                                    <span className="text-blue-500 mt-1">
                                        <FaCheck />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cancellation */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm">
                                2
                            </span>
                            {POLICIES.cancellation.title}
                        </h3>
                        <ul className="space-y-4">
                            {POLICIES.cancellation.details.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-foreground/70 text-sm leading-relaxed flex items-center gap-3">
                                    <span className="text-red-500 mt-1">
                                        <FaExclamation />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">
                                3
                            </span>
                            {POLICIES.payment.title}
                        </h3>
                        <ul className="space-y-4">
                            {POLICIES.payment.details.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-foreground/70 text-sm leading-relaxed flex items-center gap-3">
                                    <span className="text-green-500 mt-1">
                                        <FaRupeeSign />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
