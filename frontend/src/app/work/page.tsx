"use client";

import Carousel from "@/components/ui/Carousel";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { categories, mockProjects } from "@/constants/constants";
import Image from "next/image";
import { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";

const Work = () => {
    const projectsByCategory = useMemo(
        () =>
            categories.reduce((acc, cat) => {
                acc[cat] = mockProjects.filter((p) => p.category === cat);
                return acc;
            }, {} as Record<string, typeof mockProjects>),
        []
    );

    return (
        <>
            <Image
                src={"/aaabstract.webp"}
                height={1000}
                width={2000}
                alt="bg-asset"
                className="absolute blur-lg"
            />

            <div className="relative h-[87vh] w-full flex flex-col gap-10 px-4 sm:px-10 mb-[13vh]">
                <ScrollStack>
                    {/* Heading */}
                    <div className="pt-6 flex flex-col justify-around text-center items-center gap-6">
                        <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug max-w-4xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                            Every project we take on is a story waiting to be
                            told.
                        </h1>

                        <p className="relative text-base sm:text-lg text-white/80 max-w-3xl">
                            At Amiyo Creative, we don&apos;t just deliver
                            “services” — we deliver experiences that last in
                            memories and brands that stand out in markets.
                        </p>

                        <div className="relative flex flex-wrap justify-center gap-3">
                            {categories.map((cat) => (
                                <a
                                    key={cat}
                                    href={`#category-${cat}`}
                                    className="cursor-none cursor-target border border-purple-500/50 text-white/80 sm:text-sm text-xs rounded-full px-4 py-1.5 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                                >
                                    {cat}
                                </a>
                            ))}
                        </div>
                    </div>

                    {categories.map((cat) => (
                        <ScrollStackItem
                            key={cat}
                            id={`category-${cat}`}
                            className="bg-neutral-900 backdrop-blur-lg text-white flex flex-col gap-8 px-6 py-12 scroll-mt-40"
                        >
                            <h2 className="relative text-4xl font-extrabold text-center tracking-wide drop-shadow-[0_0_20px_rgba(139,92,246,0.7)]">
                                {cat}
                            </h2>

                            <Carousel
                                items={projectsByCategory[cat] ?? []}
                                renderItem={(project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        color={"#171717"}
                                    />
                                )}
                            />
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs gap-1 animate-bounce">
                <p className="text-white/70 tracking-wide">Scroll to explore</p>
                <FaChevronDown className="size-5 text-cyan-400" />
            </div>
        </>
    );
};

export default Work;
