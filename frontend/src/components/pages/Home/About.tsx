"use client";

import { HomeAboutValues } from "@/constants/constants";
import { ValueItem } from "@/constants/types";
import { motion, Variants } from "framer-motion";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

const AboutSection: FC = () => {
    const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const values: ValueItem[] = useMemo(() => HomeAboutValues, []);

    const rowClasses = [
        "row-start-1 row-end-3",
        "row-start-2 row-end-4",
        "row-start-3 row-end-5",
        "row-start-4 row-end-6",
    ];

    const easeOutExpo = (t: number): number =>
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animateCount = useCallback((targetValue: number, index: number) => {
        let startTime: number | null = null;
        const duration = 2000;

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentValue = Math.floor(easedProgress * targetValue);

            setCounts((prevCounts) => {
                const newCounts = [...prevCounts];
                newCounts[index] = currentValue;
                return newCounts;
            });

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (hasAnimated) {
            values.forEach((item, index) =>
                setTimeout(() => animateCount(item.value, index), index * 100)
            );
        }
    }, [hasAnimated, values, animateCount]);

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const textContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.3 } },
    };

    const textFadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div
            ref={sectionRef}
            className="w-full flex justify-center py-6 items-center text-5xl gap-4 px-4 sm:px-10 3xl:px-30"
        >
            <div className="absolute -bottom-220 border-4 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="relative w-full flex justify-center py-10 items-center flex-col rounded-t-4xl overflow-hidden shadow-[-5px_-3px_5px_0px_rgba(0,0,0,0.5)]">
                {/* Background */}
                <div className="absolute z-1 h-full w-full bg-radial-[at_50%_-60%] from-purple-700 via-purple-950 to-slate-950 via-30% to-67%"></div>
                <div className="absolute z-1 h-full w-full bg-slate-950/30"></div>

                {/* Main Content */}
                <motion.div
                    className="flex-1 flex flex-col  px-8 py-10 lg:px-16 relative z-3 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate={hasAnimated ? "visible" : "hidden"}
                >
                    <div className="mx-auto w-full grid md:grid-cols-2 gap-6 md:gap-16 items-center justify-center ">
                        {/* Values */}
                        <div className="grid grid-cols-2 grid-rows-5 h-full w-full max-w-2xl place-items-center mx-auto gap-1">
                            {values.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`${rowClasses[index]} relative p-6 group w-full h-full flex items-center justify-center overflow-hidden transition-colors duration-500 hover:bg-cyan-200/20`}
                                    variants={fadeInUp}
                                >
                                    {/* Borders */}
                                    <span className="absolute inset-0 border-transparent group-hover:border-purple-400/60 transition-all duration-500"></span>
                                    <span className="absolute top-0 left-0 w-full h-[2px] scale-x-0 bg-cyan-400/30 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 bg-cyan-400/30 group-hover:scale-x-100 origin-right transition-transform duration-500 delay-100"></span>
                                    <span className="absolute top-0 left-0 h-full w-[2px] scale-y-0 bg-cyan-400/30 group-hover:scale-y-100 origin-top transition-transform duration-500 delay-200"></span>
                                    <span className="absolute top-0 right-0 h-full w-[2px] scale-y-0 bg-cyan-400/30 group-hover:scale-y-100 origin-bottom transition-transform duration-500 delay-300"></span>

                                    {/* Content */}
                                    <div className="text-center relative z-10">
                                        <div className="text-4xl 3xl:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {counts[index]}+
                                        </div>
                                        <div className="text-gray-400 text-sm 3xl:text-xl font-medium">
                                            {item.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Text */}
                        <motion.div
                            className="space-y-8"
                            variants={textContainer}
                            initial="hidden"
                            animate={hasAnimated ? "visible" : "hidden"}
                        >
                            <motion.div variants={textFadeUp}>
                                <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-white mb-6 leading-tight">
                                    About Our Story
                                </h2>
                            </motion.div>

                            <motion.div variants={textFadeUp}>
                                <p className="text-sm sm:text-base md:text-lg 3xl:text-2xl text-gray-400 leading-relaxed">
                                    At Amiyo Creative, we don&apos;t just create
                                    content — we craft experiences. From
                                    designing your brand identity to capturing
                                    once-in-a-lifetime memories, from building
                                    digital platforms to scaling your online
                                    presence — everything happens under one
                                    roof.
                                </p>
                            </motion.div>

                            <motion.div variants={textFadeUp}>
                                <h3 className="text-2xl md:text-3xl 3xl:text-6xl font-semibold text-white mb-4">
                                    Our Mission
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg 3xl:text-2xl text-gray-400 leading-relaxed">
                                    Deliver premium visuals and impactful
                                    digital solutions that inspire, engage, and
                                    grow.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutSection;
