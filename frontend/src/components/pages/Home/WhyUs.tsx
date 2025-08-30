"use client";

import { BgWave } from "@/components/elements/BgAssets";
import CircularGallery from "@/components/ui/CircularCards";
import { GalleryItems } from "@/constants/constants";
import { motion } from "framer-motion";
import { Montserrat_Alternates } from "next/font/google";

const montserrat = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const WhyUs = () => {
    return (
        <div className="relative overflow-hidden h-screen">
            <BgWave inverted={false} />

            <div
                className={`relative mx-auto w-full h-full flex flex-col gap-10 px-4 py-16 sm:px-10 ${montserrat.className}`}
            >
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Because average isn&apos;t our language (&gt;ᴗ•)
                        </p>
                    </motion.div>
                </div>
                <CircularGallery
                    items={GalleryItems}
                    font={`bold 30px ${montserrat.style.fontFamily}`}
                />
            </div>
        </div>
    );
};

export default WhyUs;
