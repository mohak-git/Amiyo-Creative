"use client";

import { AgencyServices } from "@/constants/constants";
import { FC, JSX, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaAward, FaEye, FaHandSparkles, FaQuoteLeft } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";

const AgencyValues = [
    {
        icon: FaHandSparkles,
        title: "Creativity",
        description:
            "Ideas that inspire and transform ordinary into extraordinary.",
        decoration: (
            <>
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-purple-400 rounded-full" />
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-purple-400 rounded-full" />
                <div className="absolute top-1/2 right-8 w-4 h-4 border border-purple-400 rotate-45" />
            </>
        ),
    },
    {
        icon: FaAward,
        title: "Professionalism",
        description: "Precision-crafted solutions you can trust completely.",
        decoration: (
            <>
                <div className="absolute inset-4 border border-blue-400 rounded-xl"></div>
                <div className="absolute top-6 left-6 w-3 h-3 bg-blue-400"></div>
            </>
        ),
    },
    {
        icon: FaEye,
        title: "Quality",
        description: "Pixel-perfect execution with zero compromises.",
        decoration: (
            <div className="grid grid-cols-6 gap-1 p-4 h-full">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-green-400 rounded-sm"
                        style={{ height: Math.random() * 20 + 5 }}
                    />
                ))}
            </div>
        ),
    },
    {
        icon: FaBoltLightning,
        title: "Client Focus",
        description: "Your vision becomes our obsession and mission.",
    },
];

const SectionHeading: FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-center space-x-4 text-center mb-10">
        <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="w-12 h-0.5 bg-gradient-to-l from-purple-500 to-blue-500" />
    </div>
);

const ServiceBadge: FC<{ icon: IconType; label: string; angle: string }> = ({
    icon: Icon,
    label,
    angle,
}) => (
    <div
        className={`flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 hover:border-purple-500/50 transition-all duration-300 ${angle} hover:rotate-0`}
    >
        <Icon className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-slate-300">{label}</span>
    </div>
);

const ValueCard: FC<{
    icon: IconType;
    title: string;
    description: string;
    decoration?: JSX.Element;
}> = ({ icon: Icon, title, description, decoration }) => (
    <div className="group relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 opacity-10">{decoration}</div>
        <div className="relative h-full p-8 flex flex-col justify-between">
            <h3 className="text-xl flex gap-2 text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                <Icon /> {title}
            </h3>
            <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {description}
            </p>
        </div>
        <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/50 rounded-3xl transition-all duration-300"></div>
    </div>
);

const AboutPage: FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) =>
            setMousePosition({ x: e.clientX, y: e.clientY });

        window.addEventListener("mousemove", updateMousePosition);
        return () =>
            window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return (
        <main className="pt-[18vh]">
            <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
                {/* Background */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950"></div>
                    <div
                        className="absolute inset-0 opacity-10 h-full w-full"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                <div className="relative z-10">
                    {/* Hero */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                <span className="block text-3xl lg:text-4xl text-white">
                                    About
                                </span>
                                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Amiyo Creative
                                </span>
                            </h1>
                            <p className="text-base lg:text-xl text-slate-300 leading-relaxed max-w-2xl">
                                A Kolkata-based creative and digital solutions
                                agency offering services for brands, startups,
                                influencers, and individuals. From storytelling
                                to strategy, from visuals to technology, we
                                merge imagination with execution.
                            </p>
                            <div className="hidden sm:flex flex-wrap gap-4 pt-8">
                                {AgencyServices.map((s, i) => (
                                    <ServiceBadge key={i} {...s} />
                                ))}
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full" />
                            <div className="absolute inset-8 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-800/40 to-purple-900/20 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden">
                                <FiTarget className="w-12 h-12 text-purple-400 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    Our Vision
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    To become your trusted partner in
                                    creativity, storytelling, and digital
                                    growth.
                                </p>
                            </div>
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce"></div>
                            <div
                                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce"
                                style={{ animationDelay: "1s" }}
                            />
                            <div
                                className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce"
                                style={{ animationDelay: "2s" }}
                            />
                        </div>
                    </section>

                    {/* Values */}
                    <section className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <SectionHeading title="Our Values" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {AgencyValues.map((v, i) => (
                                <ValueCard key={i} {...v} />
                            ))}
                        </div>
                    </section>

                    {/* Founder Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-center">
                        {/* Founder Card */}
                        <div className="lg:col-span-2 relative">
                            <div className="relative bg-gradient-to-br from-slate-800/60 to-purple-900/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden">
                                <div className="flex items-center space-x-4 px-6 py-4 border-b border-slate-700/50">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                        AP
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">
                                            Amiyo Panda
                                        </h4>
                                        <p className="text-purple-400 text-sm">
                                            Founder & CEO
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 py-4 grid grid-cols-2 gap-6">
                                    {[
                                        { label: "Years", value: "3+" },
                                        { label: "Projects", value: "50+" },
                                        { label: "Clients", value: "25+" },
                                        { label: "Ideas", value: "∞" },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-2xl font-bold text-white mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
                            <div
                                className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"
                                style={{ animationDelay: "1s" }}
                            />
                        </div>

                        {/* Note */}
                        <div className="lg:col-span-3 space-y-8">
                            <SectionHeading title="Founder’s Note" />
                            <div className="space-y-6 text-slate-300 leading-relaxed">
                                <p>
                                    Amiyo Panda, the Founder & CEO of Amiyo
                                    Creative, started this journey with pure
                                    passion and persistence. What began as a
                                    love for editing and storytelling turned
                                    into a full-fledged creative agency.
                                </p>
                                <p>
                                    From humble beginnings to premium projects
                                    across industries, Amiyo now leads a diverse
                                    team of creative minds. His belief is
                                    simple:
                                </p>
                            </div>
                            <div className="relative group bg-gradient-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border-l-4 border-purple-500 rounded-r-2xl p-6 hover:from-slate-800/60 hover:to-purple-800/30 transition-all duration-300">
                                <FaQuoteLeft className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <blockquote className="text-lg text-white font-medium italic mb-4 leading-relaxed">
                                    No story is too small, and no dream is too
                                    big to be told through visuals.
                                </blockquote>
                                <div className="text-purple-300 font-medium">
                                    — Amiyo Panda
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default AboutPage;
