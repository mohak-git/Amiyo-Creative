"use client";

import { NavItems, SocialPlatforms } from "@/constants/constants";
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
    const titleRef = useRef<HTMLHeadingElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            const chars = Array.from(titleRef.current.children);
            gsap.fromTo(
                chars,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 90%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                }
            );
        }
    }, []);

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
            className="relative bg-gradient-to-b border-t border-purple-300/50 from-slate-950 via-purple-950 to-slate-900 text-white pt-16 pb-8 px-4 sm:px-10 overflow-hidden"
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
                    className="text-center mb-16"
                    variants={childVariants}
                >
                    <motion.h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent"
                        style={{
                            textShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                        }}
                    >
                        <span>C</span>
                        <span>R</span>
                        <span>E</span>
                        <span>A</span>
                        <span>T</span>
                        <span>E</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light tracking-wide"
                        variants={childVariants}
                    >
                        Amiyo Creative - Your Partner for Visuals, Stories &
                        Digital Growth
                    </motion.p>

                    {/* CTA Section */}
                    <motion.div
                        className="mt-6 flex flex-col sm:flex-row gap-6 justify-center items-center"
                        variants={childVariants}
                    >
                        <motion.button
                            className="cursor-target cursor-none group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">
                                Start Your Project
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>

                        <motion.button
                            className="cursor-target cursor-none px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-semibold hover:bg-purple-800 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Portfolio
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-4 place-items-center gap-8 mb-8"
                    variants={childVariants}
                >
                    {/* About */}
                    <div className="flex flex-col justify-center md:col-span-2 gap-6 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                                <Image
                                    src="logo.svg"
                                    width={100}
                                    height={100}
                                    alt="logo"
                                />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Amiyo Creative
                            </h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Transforming brands through compelling visual
                            stories and cutting-edge digital experiences.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Video Production",
                                "Brand Design",
                                "Digital Marketing",
                                "Web Development",
                            ].map((service) => (
                                <span
                                    key={service}
                                    className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs font-medium"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-6 p-6 w-full rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-400/20">
                        <h4 className="font-bold text-cyan-400 text-lg flex items-center">
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
                                        <span className="w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="w-full flex flex-col gap-6 p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-sm border border-yellow-400/20">
                        <h4 className="font-bold text-yellow-400 text-lg flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" />
                            Connect
                        </h4>
                        <div className="grid grid-cols-3 gap-3 place-items-center">
                            {SocialPlatforms.map((platform, index) => (
                                <motion.a
                                    key={index}
                                    href={platform.url}
                                    target={platform.target || "_self"}
                                    rel={
                                        platform.target
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className={`group cursor-target cursor-none relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden ${platform.bgColor} ${platform.borderColor} ${platform.textColor}`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <platform.icon className="w-5 h-5 relative z-10 transition-colors duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                </motion.a>
                            ))}
                        </div>
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
