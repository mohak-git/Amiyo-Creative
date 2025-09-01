"use client";

import BgBeam from "@/components/ui/BgBeam";
import SplineScene from "@/components/ui/Camera3D";
import LightRay from "@/components/ui/LightRay";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number = 0.3) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 0.6,
            type: "spring",
            stiffness: 80,
        },
    }),
};

const fadeDown: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: (delay: number = 0.3) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 0.6,
            type: "spring",
            stiffness: 80,
        },
    }),
};

const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (delay: number = 0.3) => ({
        opacity: 1,
        x: 0,
        transition: { delay, duration: 0.8, ease: "easeOut" },
    }),
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (delay: number = 0.3) => ({
        opacity: 1,
        x: 0,
        transition: { delay, duration: 0.8, ease: "easeOut" },
    }),
};

const Hero: React.FC = () => {
    return (
        <motion.div
            className="px-4 sm:px-10 pb-6 w-full"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
        >
            <div className="relative h-[80vh] w-full flex justify-center items-center border border-background rounded-b-4xl overflow-hidden shadow-[5px_2px_8px_0px_rgba(0,0,0,0.5)]">
                {/* Elements */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                    className="w-full z-3 h-full absolute top-0"
                >
                    <LightRay raysColor="#6262e3" />
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.7}
                    className="absolute z-2 h-full w-full rounded-lg"
                >
                    <BgBeam />
                </motion.div>

                {/* Backgrounds */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="absolute z-1 h-full w-full bg-radial-[at_50%_180%] from-white via-purple-700 to-slate-950 via-30% to-67%"
                />

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                    className="absolute z-1 bottom-0 right-0 w-1/3 h-1/6 bg-gradient-to-r to-purple-700/70 blur-3xl"
                />

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                    className="absolute z-1 bottom-0 right-0 w-1/12 h-2/5 bg-gradient-to-r to-purple-700 blur-3xl"
                />

                {/* Main */}
                <div className="flex flex-col md:flex-row justify-center items-center text-base text-white z-5 gap-6 md:gap-12 px-6 w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start text-left gap-6 w-full md:w-3/5 max-w-2xl">
                        <motion.span
                            variants={fadeDown}
                            initial="hidden"
                            animate="visible"
                            custom={1.4}
                            className="text-cyan-200 font-semibold text-[8px] sm:text-sm md:text-base tracking-wide bg-purple-600/20 rounded-full px-2 py-0.5"
                        >
                            Where Innovation Meets Perfection
                        </motion.span>

                        <motion.h1
                            variants={fadeLeft}
                            initial="hidden"
                            animate="visible"
                            custom={0.6}
                            className="font-bold text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            <span className="uppercase">Creative Visuals</span>{" "}
                            <br />
                            <span className="text-blue-300">
                                for Every Story
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeDown}
                            initial="hidden"
                            animate="visible"
                            custom={1.6}
                            className="text-white leading-6 text-sm sm:text-base md:text-lg lg:text-xl"
                        >
                            Transform your ideas into stunning digital
                            realities. We build premium web experiences that
                            captivate users and drive results for
                            forward-thinking businesses.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={1.8}
                            className="flex flex-col sm:flex-row gap-4 pt-6 w-full"
                        >
                            <button className="cursor-target outline-none cursor-none px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                                Let&apos;s Work Together
                            </button>

                            <button className="cursor-target outline-none cursor-none px-6 sm:px-8 py-3 sm:py-4 bg-white/90 text-purple-600 font-semibold rounded-full hover:bg-white transform hover:scale-105 transition-all duration-200">
                                View Our Work
                            </button>
                        </motion.div>
                    </div>

                    {/* Model/Image */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        animate="visible"
                        custom={0.8}
                        className="flex justify-center items-center w-full md:w-2/5"
                    >
                        <SplineScene sceneUrl="https://prod.spline.design/FT9uTU8FxfSgTMtl/scene.splinecode" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Hero;
