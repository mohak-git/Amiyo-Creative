"use client";

import { FAQsComp } from "@/components/pages/About/FAQ";
import { FAQs } from "@/constants/constants";
import Image from "next/image";
import { FC, JSX } from "react";
import { IconType } from "react-icons";
import {
    FaAward,
    FaCode,
    FaEye,
    FaHandSparkles,
    FaPalette,
    FaQuoteLeft,
    FaVideo,
} from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";

const AgencyValues = [
    {
        icon: FaHandSparkles,
        title: "Creativity",
        description: "Fresh ideas tailored to your brand.",
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
        description:
            "Clear communication, structured workflow, and deadline-focused execution.",
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
        description: "High-standard output across every service category.",
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
        description:
            "Work is customised around your goals and brand direction.",
    },
];

const SectionHeading: FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-center space-x-4 text-center mb-4">
        <div className="w-12 h-0.5 bg-linear-to-r from-purple-500 to-blue-500" />
        <h2 className="text-3xl 3xl:text-5xl font-bold text-white">{title}</h2>
        <div className="w-12 h-0.5 bg-linear-to-l from-purple-500 to-blue-500" />
    </div>
);

const ServiceBadge: FC<{ icon: IconType; label: string }> = ({
    icon: Icon,
    label,
}) => (
    <div
        className={`flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 hover:border-purple-500/50 transition-all duration-300 hover:rotate-0`}>
        <Icon className="w-4 h-4 text-purple-400" />
        <span className="text-sm 3xl:text-2xl text-gray-400">{label}</span>
    </div>
);

const ValueCard: FC<{
    icon: IconType;
    title: string;
    description: string;
    decoration?: JSX.Element;
}> = ({ icon: Icon, title, description, decoration }) => (
    <div className="group relative overflow-hidden rounded-3xl bg-slate-900/30 p-6 3xl:p-10">
        <div className="absolute inset-0 opacity-10">{decoration}</div>
        <div className="relative flex flex-col justify-center h-full">
            <h3 className="text-xl 3xl:text-3xl flex gap-2 items-center text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                <Icon /> {title}
            </h3>
            <p className="3xl:text-2xl text-gray-400 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {description}
            </p>
        </div>
        <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/50 rounded-3xl transition-all duration-300"></div>
    </div>
);

const AboutPage: FC = () => {
    return (
        <main className="bg-slate-950 text-white overflow-x-hidden sm:px-10 md:px-20">
            {/* HERO */}
            <div>
                <section className="pt-20 md:pt-32 3xl:pt-50 pb-12 sm:pb-20 mx-auto px-6 sm:px-10 3xl:px-30 grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                    {/* Left: Text */}
                    <div className="space-y-8">
                        <h1 className="text-5xl lg:text-6xl 3xl:text-7xl font-bold leading-tight">
                            <span className="block text-3xl lg:text-4xl 3xl:text-5xl text-white mb-2">
                                About
                            </span>
                            <span className="block bg-linear-to-br from-purple-400 via-white bg-clip-text text-transparent">
                                Amiyo Creative
                            </span>
                        </h1>
                        <p className="text-base lg:text-xl 3xl:text-3xl text-gray-400 leading-relaxed max-w-2xl 3xl:max-w-6xl">
                            Amiyo Creative is a full-scale creative and
                            production company offering complete visual,
                            digital, and branding solutions. We deliver every
                            service category — photo, video, editing, design,
                            CGI, VFX, and web — with 24/7 operational support.
                            We are the one-stop partner for brands that want
                            reliability, speed, and premium quality
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div className="relative w-full aspect-square max-w-md 3xl:max-w-2xl mx-auto flex justify-center items-center">
                        <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full" />
                        <div className="relative w-4/5 aspect-square mx-auto rounded-3xl bg-linear-to-br from-slate-800/40 to-purple-900/20 backdrop-blur-xl border border-purple-500/20 overflow-hidden">
                            <Image
                                src="/amiyo.jpg"
                                alt="amiyo-image"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-r from-purple-500 to-blue-500 rounded-full animate-bounce" />
                        <div
                            className="absolute -bottom-4 -left-4 w-6 h-6 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce"
                            style={{ animationDelay: "1s" }}
                        />
                        <div
                            className="absolute top-1/2 -right-8 w-4 h-4 bg-linear-to-r from-pink-500 to-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "2s" }}
                        />
                    </div>
                </section>
                <div className="flex w-full justify-center items-center flex-wrap gap-4 pt-6">
                    {[
                        {
                            icon: FaVideo,
                            label: "Creative Pre & Post Production",
                            color: "#828DED",
                        },
                        {
                            icon: FaPalette,
                            label: "Branding & Designing",
                            color: "#5E6CE8",
                        },
                        {
                            icon: FaCode,
                            label: "Digital & Web",
                            color: "#293BE0",
                        },
                        {
                            icon: FaBoltLightning,
                            label: "Content and Strategy",
                            color: "#1929B3",
                        },
                    ].map((s, i) => (
                        <ServiceBadge key={i} {...s} />
                    ))}
                </div>
            </div>

            {/* VISION */}
            <section className="py-12 sm:py-20 mx-auto px-6 sm:px-10 3xl:px-30 text-center max-w-4xl">
                <SectionHeading title="Our Vision" />
                <p className="text-gray-400 text-base lg:text-xl 3xl:text-3xl leading-relaxed">
                    To become the most reliable and complete creative partner
                    for brands worldwide — delivering everything from content to
                    websites to CGI in one place.
                </p>
            </section>

            {/* VALUES */}
            <section className="py-12 sm:py-20 mx-auto px-6 sm:px-10 3xl:px-30">
                <SectionHeading title="Our Values" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {AgencyValues.map((v, i) => (
                        <ValueCard key={i} {...v} />
                    ))}
                </div>
            </section>

            {/* FOUNDER */}
            <section className="py-12 sm:py-20 mx-auto px-6 sm:px-10 3xl:px-30 space-y-8">
                <div className=" grid lg:grid-cols-5 gap-16 items-start">
                    {/* Founder Card */}
                    <div className="lg:col-span-2 relative">
                        <div className="relative bg-linear-to-br from-slate-800/60 to-purple-900/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden">
                            <div className="flex items-center space-x-4 px-6 py-4  border-b border-slate-700/50">
                                <Image
                                    src={"/amiyo.jpg"}
                                    alt="amiyo-image"
                                    width={120}
                                    height={120}
                                    className="size-16 sm:size-20 3xl:size-28 rounded-full aspect-square object-cover"
                                />
                                <div>
                                    <h4 className="text-lg 3xl:text-3xl font-semibold text-white">
                                        Amiyo Panda
                                    </h4>
                                    <p className="text-purple-400 text-sm 3xl:text-xl">
                                        Founder & CEO
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 py-4 grid grid-cols-3 gap-4">
                                {[
                                    { label: "Years", value: "7+" },
                                    { label: "Projects", value: "150+" },
                                    { label: "Clients", value: "30+" },
                                    { label: "Operations", value: "24/7" },
                                    { label: "Countries", value: "8+" },
                                    { label: "Ideas", value: "∞" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl 3xl:text-4xl font-bold text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs 3xl:text-xl text-slate-400">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -top-3 -right-3 w-24 h-24 bg-linear-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
                        <div
                            className="absolute -bottom-3 -left-3 w-16 h-16 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        />
                    </div>

                    {/* Founder Note */}
                    <div className="lg:col-span-3 space-y-10">
                        <SectionHeading title="Founder's Note" />
                        <div className="space-y-6 text-gray-400 3xl:text-2xl leading-relaxed">
                            <p>
                                Amiyo Creative was built with one mission — to
                                give brands a place where every creative and
                                digital need is solved with quality, clarity,
                                and speed. From photography and video to
                                editing, branding, CGI, and websites — our team
                                operates 24/7 to deliver world-class results
                            </p>
                            <p>
                                From humble beginnings to premium projects
                                across industries, Amiyo now leads a diverse
                                team of creative minds. His belief is simple:
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative max-w-3xl 3xl:max-w-7xl mx-auto group bg-linear-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border-l-4 border-purple-500 rounded-r-2xl p-6 hover:from-slate-800/60 hover:to-purple-800/30 transition-all duration-300">
                    <FaQuoteLeft className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <blockquote className="text-lg 3xl:text-4xl text-white font-medium italic mb-4 leading-relaxed">
                        No story is too small, and no dream is too big to be
                        told through visuals.
                    </blockquote>
                    <div className="text-purple-300 3xl:text-2xl font-medium">
                        — Amiyo Panda
                    </div>
                </div>
            </section>

            {/* HOW WE WORK */}
            <section className="py-12 sm:py-20 mx-auto px-6 sm:px-10 3xl:px-30">
                <SectionHeading title="How We Work" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
                    {[
                        {
                            num: "1",
                            title: "Requirement Discussion",
                            desc: "We understand your goals, style, timeline, and deliverables — available 24/7 for communication.",
                            color: "text-purple-400",
                            border: "border-purple-500/20",
                            bg: "bg-purple-500/5",
                        },
                        {
                            num: "2",
                            title: "Creative & Technical Execution",
                            desc: "Our team handles the full workflow of photography, editing, design, CGI, or development.",
                            color: "text-blue-400",
                            border: "border-blue-500/20",
                            bg: "bg-blue-500/5",
                        },
                        {
                            num: "3",
                            title: "On-Time Delivery",
                            desc: "Fast turnaround with consistent quality.",
                            color: "text-green-400",
                            border: "border-green-500/20",
                            bg: "bg-green-500/5",
                        },
                    ].map((step, i) => (
                        <div
                            key={i}
                            className={`group relative p-8 rounded-3xl backdrop-blur-sm border ${step.border} ${step.bg} hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2`}>
                            <div
                                className={`text-6xl font-black ${step.color} opacity-20 absolute top-4 right-6 pointer-events-none select-none group-hover:opacity-30 transition-opacity`}>
                                {step.num}
                            </div>
                            <h3 className="text-xl 3xl:text-3xl font-bold text-white mb-4 relative z-10">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 3xl:text-2xl relative z-10 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 sm:py-20 mx-auto px-6 sm:px-10 3xl:px-30">
                <SectionHeading title="FAQs" />
                <FAQsComp items={FAQs} />
            </section>
        </main>
    );
};

export default AboutPage;
