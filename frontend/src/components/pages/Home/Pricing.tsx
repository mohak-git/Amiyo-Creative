"use client";

import { BgWave } from "@/components/elements/BgAssets";
import PricingCard from "@/components/ui/PricingCard";
import { PricingData } from "@/constants/constants";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Pricing = () => {
    return (
        <motion.div
            className="relative min-h-screen w-full overflow-hidden pt-16 pb-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Blobs */}
            <motion.div
                className="absolute -top-20 left-1/2 h-66 w-66 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl"
                variants={childVariants}
            />
            <motion.div
                className="absolute top-1/2 right-10 h-48 w-48 rounded-full bg-gradient-to-l from-cyan-400/10 to-blue-500/20 blur-2xl"
                variants={childVariants}
            />
            <motion.div
                className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/25 blur-3xl"
                variants={childVariants}
            />

            {/* Background */}
            <BgWave inverted={true} />

            <motion.div
                className="relative w-full h-full flex flex-col gap-10 px-4 sm:px-10"
                variants={containerVariants}
            >
                <motion.div
                    className="text-center w-full"
                    variants={childVariants}
                >
                    <h1 className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-indigo-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl py-1">
                        Pricing
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-white/80">
                        Choose a plan that matches your goals.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                >
                    {PricingData.map((plan, idx) => (
                        <motion.div key={idx} variants={childVariants}>
                            <PricingCard data={plan} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Pricing;
