"use client";

import { Companies } from "@/constants/constants";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function MovingLogos() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div className="w-full flex justify-center items-center">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-7xl py-4 md:py-6 lg:py-8 z-5 overflow-hidden bg-gradient-to-r from-transparent via-indigo-700/30 to-transparent backdrop-blur-lg"
            >
                <div className="pointer-events-none absolute top-0 left-0 w-60 h-full bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent z-10"></div>
                <div className="pointer-events-none absolute top-0 right-0 w-60 h-full bg-gradient-to-l from-gray-950 via-gray-950/60 to-transparent z-10"></div>

                <div className="scroll-wrapper flex space-x-4 md:space-x-8 lg:space-x-12">
                    {[...Companies, ...Companies].map((company, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center min-w-30 h-12"
                        >
                            <Image
                                src={company.imageLink}
                                alt="logo"
                                width={30}
                                height={30}
                            />
                        </div>
                    ))}
                </div>

                <style jsx>{`
                    .scroll-wrapper {
                        display: flex;
                        width: max-content;
                        animation: scroll 40s linear infinite;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }

                    .scroll-wrapper:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </motion.div>
        </div>
    );
}

export default MovingLogos;
