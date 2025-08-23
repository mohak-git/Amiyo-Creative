import { Companies, HomeAboutValues } from "@/constants/constants";
import { ValueItem } from "@/constants/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useMemo, useRef, useState } from "react";

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

    const animateCount = (targetValue: number, index: number) => {
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
    };

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
    }, [hasAnimated, values]);

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const logosVariants: Variants = {
        hidden: { opacity: 0, x: 500 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.8 } },
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
            className="min-h-screen w-full flex justify-center items-center text-5xl font-bold gap-4 px-4 sm:px-10"
        >
            <div className="absolute -bottom-220 border-4 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="relative min-h-[80vh] my-[10vh] w-full flex justify-center items-center flex-col rounded-t-4xl overflow-hidden shadow-[-5px_-3px_5px_0px_rgba(0,0,0,0.5)]">
                {/* Background */}
                <div className="absolute z-1 h-full w-full bg-radial-[at_50%_15%] from-purple-300 via-purple-600 to-slate-900 via-30% to-67%"></div>
                <div className="absolute z-1 h-full w-full bg-slate-900/30"></div>

                {/* Main Content */}
                <motion.div
                    className="flex-1 flex flex-col justify-center px-8 py-10 lg:px-16 relative z-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate={hasAnimated ? "visible" : "hidden"}
                >
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-center">
                            {/* Values */}
                            <div className="grid grid-cols-2 grid-rows-5 h-full w-full place-items-center gap-1">
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
                                            <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                                {counts[index]}
                                                {item.suffix}
                                            </div>
                                            <div className="text-gray-300 text-sm font-medium">
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
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                        About{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                            Our Story
                                        </span>
                                    </h2>
                                </motion.div>

                                <motion.div variants={textFadeUp}>
                                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                                        At Amiyo Creative, we don&apos;t just
                                        create content — we craft experiences.
                                        From designing your brand identity to
                                        capturing once-in-a-lifetime memories,
                                        from building digital platforms to
                                        scaling your online presence —
                                        everything happens under one roof.
                                    </p>
                                </motion.div>

                                <motion.div variants={textFadeUp}>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                        Our Mission
                                    </h3>
                                    <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                                        Deliver premium visuals and impactful
                                        digital solutions that inspire, engage,
                                        and grow.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Logos */}
                <motion.div
                    className="relative w-full max-w-7xl py-4 md:py-6 lg:py-8 z-5 overflow-hidden bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent backdrop-blur-lg"
                    variants={logosVariants}
                    initial="hidden"
                    animate={hasAnimated ? "visible" : "hidden"}
                >
                    <div className="pointer-events-none absolute top-0 left-0 w-60 h-full bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent z-10"></div>
                    <div className="pointer-events-none absolute top-0 right-0 w-60 h-full bg-gradient-to-l from-gray-900 via-gray-900/60 to-transparent z-10"></div>

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
        </div>
    );
};

export default AboutSection;
