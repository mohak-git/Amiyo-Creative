"use client";

import {
    AgencyServices,
    NavItems,
    SocialPlatforms,
} from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const Footer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            color: string;
        }> = [];

        const colors = ["#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444", "#10b981"];

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.offsetWidth)
                    particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.offsetHeight)
                    particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle =
                    particle.color +
                    Math.floor(particle.opacity * 255)
                        .toString(16)
                        .padStart(2, "0");
                ctx.fill();

                particles.forEach((otherParticle, j) => {
                    if (i !== j) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = `rgba(139, 92, 246, ${
                                (1 - distance / 100) * 0.2
                            })`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return (
        <motion.footer
            className="relative bg-gradient-to-b border-t border-purple-300/50 from-slate-950 via-purple-950/30 to-slate-900 text-white pt-16 pb-8 px-4 sm:px-10 overflow-hidden"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
                style={{ mixBlendMode: "screen" }}
            />

            <div className="mx-auto relative z-10 px-6 sm:px-10">
                <motion.div
                    className="grid md:grid-cols-4  gap-8 mb-8"
                    variants={childVariants}
                >
                    {/* About */}
                    <div className="flex flex-col justify-center md:col-span-2 gap-6 p-6 rounded-2xl backdrop-blur-sm ">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                                <Image
                                    src="logo.svg"
                                    width={100}
                                    height={100}
                                    alt="logo"
                                />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                    Amiyo Creative
                                </h3>
                                <p className="text-white leading-relaxed text-lg">
                                    Creative Visuals for Every Story
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-300/90 leading-relaxed">
                            Transforming brands through compelling visual
                            stories and cutting-edge digital experiences.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {AgencyServices.map((service, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-purple-600/30 rounded-full text-xs font-medium"
                                >
                                    {service.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-6 p-6 w-full rounded-2xl backdrop-blur-sm">
                        <h4 className=" text-cyan-400 text-lg flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {NavItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group cursor-target cursor-none w-fit px-2"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="w-full flex flex-col gap-6 p-6 rounded-2xl backdrop-blur-sm">
                        <h4 className="text-yellow-400 text-lg flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" />
                            Connect
                        </h4>
                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                            {SocialPlatforms.map((platform, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <Link
                                        href={platform.url}
                                        target={platform.target || "_self"}
                                        rel={
                                            platform.target
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group cursor-target cursor-none w-fit px-2"
                                    >
                                        <span className="w-0 h-px bg-yellow-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                                        {platform.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    className="border-t border-gradient-to-r from-transparent via-gray-700 to-transparent pt-4"
                    variants={childVariants}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <p className="text-gray-400 text-sm">
                                &copy; 2025 Amiyo Creative. All Rights Reserved
                            </p>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <Link
                                href="/privacy"
                                className="hover:text-purple-400 transition-colors duration-300 p-1 cursor-none cursor-target"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-purple-400 transition-colors duration-300 p-1 cursor-none cursor-target"
                            >
                                Terms & Conditions
                            </Link>
                            <span className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></span>
                            <span className="justify-center items-center text-purple-400 font-medium flex">
                                Crafted by{" "}
                                <Link
                                    href={"https://www.digicraft.one"}
                                    className="cursor-none cursor-target"
                                >
                                    <Image
                                        src="logo.svg"
                                        width={30}
                                        height={30}
                                        alt="logo"
                                    />
                                </Link>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
