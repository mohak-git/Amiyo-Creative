"use client";

import BgBeam from "@/components/ui/BgBeam";
import SplineScene from "@/components/ui/Camera3D";
import { DotBackground } from "@/components/ui/GridDotBg";
import LightRay from "@/components/ui/LightRay";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

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
            className="px-4 sm:px-10 3xl:px-30 pb-6 w-full"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}>
            {/* Left Gradient*/}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="absolute bottom-1/4 -left-[15%] w-1/5 h-1/2 rounded-full brightness-75 bg-linear-to-r via-orange-500/90 via-90% blur-3xl z-1"
            />

            {/* Right Gradient */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.5}
                className="absolute bottom-1/4 -right-[15%] w-1/5 h-1/2 rounded-full brightness-75 bg-linear-to-l via-purple-500/90 via-90% blur-3xl z-1"
            />

            <div className="relative w-full flex justify-center items-center border md:py-10 border-background rounded-b-4xl overflow-hidden shadow-[5px_2px_8px_0px_rgba(0,0,0,0.5)]">
                {/* Elements */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                    className="w-full z-3 h-full absolute top-0">
                    <LightRay raysColor="#3c0366" />
                    {/* <LightRay raysColor="#ff6b6b" /> */}
                </motion.div>

                {/* <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.7}
                    className="absolute z-2 h-full w-full rounded-lg">
                    <BgBeam />
                </motion.div> */}

                {/* Backgrounds */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="absolute z-1 h-full w-full bg-radial-[at_50%_190%] from-white via-purple-600/70 to-transparent via-30% to-67%"
                />

                <DotBackground
                    dotSize={1}
                    dotColor="#d4d4d4"
                    darkDotColor="#d4d4d4"
                    spacing={40}
                    showFade={true}
                    fadeIntensity={30}
                    className="h-[500px] bg-transparent">
                    {/* Main */}
                    <div className="flex flex-col py-10 md:py-0 3xl:py-12 md:flex-row justify-center items-center text-base text-white z-5 gap-6 md:gap-4 lg:gap-12 md:pl-16 w-full h-full">
                        {/* Text */}
                        <div className="flex flex-col justify-center items-start text-left gap-6 w-full md:w-3/5 max-w-2xl 3xl:max-w-5xl">
                            <motion.span
                                variants={fadeDown}
                                initial="hidden"
                                animate="visible"
                                custom={1.4}
                                className="text-gray-400 font-semibold text-[8px] sm:text-sm md:text-base 3xl:text-2xl tracking-wide bg-purple-600/20 rounded-full px-2 py-0.5">
                                Where Innovation Meets Perfection
                            </motion.span>

                            <motion.h1
                                variants={fadeLeft}
                                initial="hidden"
                                animate="visible"
                                custom={0.6}
                                className="font-bold text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-8xl">
                                <span className="uppercase">
                                    Creative Visuals
                                </span>{" "}
                                <br />
                                <span className="bg-linear-to-br bg-clip-text text-transparent from-purple-400 via-white">
                                    for Every Story
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeDown}
                                initial="hidden"
                                animate="visible"
                                custom={1.6}
                                className="text-gray-400 text-sm sm:text-base md:text-md lg:text-lg 3xl:text-3xl">
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
                                className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 pt-0 lg:pt-6 w-full px-4 md:px-0">
                                <Link
                                    href={"/contact"}
                                    className="relative cursor-target group text-sm 3xl:text-2xl text-center outline-none cursor-none px-6 sm:px-8 py-2 sm:py-4 bg-black/80 hover:bg-linear-to-r from-purple-400 to-purple-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-[inset_0px_2px_4px_rgb(255,255,255)] hover:shadow-xl">
                                    <div className="absolute -top-1 -left-1 w-2/3 h-5/6 bg-orange-500 -z-1 rounded-full blur-sm group-hover:opacity-10 transition-all duration-500 ease-out" />
                                    <div className="absolute -top-1 -right-1 w-2/3 h-5/6 bg-purple-700 -z-1 rounded-full blur-sm group-hover:opacity-10 transition-all duration-500 ease-out" />
                                    Let&apos;s Work Together
                                </Link>

                                <Link
                                    href={"/work"}
                                    className="cursor-target text-sm 3xl:text-2xl text-center outline-none cursor-none px-6 sm:px-8 py-2 sm:py-4 border border-white text-white font-semibold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-200">
                                    View Our Work
                                </Link>
                            </motion.div>
                        </div>

                        {/* Model/Image */}
                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            animate="visible"
                            custom={0.8}
                            className="flex justify-center items-center w-full md:w-1/2 md:h-full h-50 overflow-hidden">
                            <SplineScene sceneUrl="https://prod.spline.design/FT9uTU8FxfSgTMtl/scene.splinecode" />
                        </motion.div>
                    </div>
                </DotBackground>
            </div>
        </motion.div>
    );
};

export default Hero;
