"use client";

import {
    AgencyServices,
    NavItems,
    SocialPlatforms,
} from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const footerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
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
            className="relative bg-slate-950 border-t border-slate-800 text-gray-300"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
                style={{ mixBlendMode: "screen" }}
            />

            <div className="mx-auto relative z-10 px-6 sm:px-10 3xl:px-30">
                {/* Main Footer Content */}
                <div className="w-full mx-auto py-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={itemVariants}>
                        <div className="flex items-center mb-4">
                            <Link
                                href="/"
                                target="_self"
                                rel="noopener noreferrer"
                                className="h-10 w-24 3xl:h-14 3xl:w-36 mr-3 cursor-none cursor-target">
                                <Image
                                    src="/logo.png"
                                    width={40}
                                    height={40}
                                    alt="Amiyo Creative Logo"
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                            <div>
                                <h3 className="text-xl 3xl:text-4xl font-semibold text-white">
                                    Amiyo Creative
                                </h3>
                                <p className="text-sm 3xl:text-2xl text-gray-400">
                                    Creative Visuals for Every Story
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed max-w-lg 3xl:max-w-2xl 3xl:text-2xl">
                            Transforming brands through compelling visual
                            stories and cutting-edge digital experiences. We
                            bring your vision to life with creativity and
                            precision.
                        </p>
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.div
                        className="lg:col-span-1"
                        variants={itemVariants}>
                        <h4 className="text-white font-semibold mb-4 text-sm 3xl:text-2xl uppercase tracking-wide">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {NavItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm 3xl:text-2xl cursor-none cursor-target px-2 py-1">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        className="lg:col-span-1"
                        variants={itemVariants}>
                        <h4 className="text-white font-semibold mb-4 text-sm 3xl:text-2xl uppercase tracking-wide">
                            Services
                        </h4>

                        <ul className="space-y-3">
                            {AgencyServices.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/work#${service?.service?.toLowerCase()}`}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm 3xl:text-2xl cursor-none cursor-target px-2 py-1">
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Media */}
                    <motion.div
                        className="lg:col-span-1"
                        variants={itemVariants}>
                        <h4 className="text-white font-semibold mb-4 text-sm 3xl:text-2xl uppercase tracking-wide">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 w-fit">
                            {SocialPlatforms.slice(2).map((platform, index) => (
                                <li key={index}>
                                    <Link
                                        href={platform.url}
                                        target={platform.target || "_self"}
                                        rel={
                                            platform.target
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="max-w-80 text-gray-400 hover:text-white transition-colors duration-200 text-sm 3xl:text-2xl flex items-center group gap-2 cursor-none cursor-target">
                                        <platform.icon
                                            className={`size-4 3xl:size-6 ${platform.textColor}`}
                                        />

                                        {platform.value}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="border-t border-slate-800 bg-slate-950"
                    variants={itemVariants}>
                    <div className="w-full mx-auto py-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm 3xl:text-2xl text-gray-500">
                            <p>
                                &copy; 2025 Amiyo Creative. All rights reserved.
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    href="/privacy"
                                    className="cursor-none cursor-target px-2 hover:text-gray-300 transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="cursor-none cursor-target px-2 hover:text-gray-300 transition-colors duration-200">
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/cookies"
                                    className="cursor-none cursor-target px-2 hover:text-gray-300 transition-colors duration-200">
                                    Cookie Policy
                                </Link>
                            </div>
                        </div>

                        {/* <div className="flex items-center text-sm 3xl:text-2xl text-gray-500">
                            <span className="mr-2">Crafted by</span>
                            <Link
                                href="https://www.digicraft.one"
                                className="flex items-center hover:text-gray-300 transition-colors duration-200 cursor-none cursor-target px-1">
                                <Image
                                    src="logo.svg"
                                    width={20}
                                    height={20}
                                    alt="DigiCraft Logo"
                                    className="mr-1 3xl:size-10"
                                />
                                DigiCraft
                            </Link>
                        </div> */}
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
