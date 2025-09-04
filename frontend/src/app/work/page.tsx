"use client";

import Carousel from "@/components/ui/Carousel";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { AgencyServices, mockProjects } from "@/constants/constants";
import { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";

const Work = () => {
    const projectsByCategory = useMemo(
        () =>
            AgencyServices.reduce((acc, ser) => {
                acc[ser.service] = mockProjects.filter(
                    (p) => p.category === ser.service
                );
                return acc;
            }, {} as Record<string, typeof mockProjects>),
        []
    );

    return (
        <>
            <div className="absolute blur-lg bg-cover w-full h-full -z-0 bg-[url(/aaabstract.webp)]" />

            <div className="relative h-[88vh] w-full flex flex-col gap-10 px-4 sm:px-10 3xl:px-30 mb-[12vh]">
                <ScrollStack>
                    {/* Heading */}
                    <div className="pt-6 pb-10 flex flex-col justify-around text-center items-center gap-6">
                        <h1 className="relative text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl font-extrabold leading-snug max-w-4xl 3xl:max-w-5xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                            Every project we take on is a story waiting to be
                            told.
                        </h1>

                        <p className="relative text-base sm:text-lg 3xl:text-2xl text-white/80 max-w-3xl 3xl:max-w-4xl">
                            At Amiyo Creative, we don&apos;t just deliver
                            “services” — we deliver experiences that last in
                            memories and brands that stand out in markets.
                        </p>

                        <div className="relative flex flex-wrap justify-center gap-3">
                            {AgencyServices.map((service, index) => (
                                <a
                                    key={index}
                                    href={`#${service?.service?.toLowerCase()}`}
                                    className="cursor-none cursor-target border border-purple-500/50 text-white/80 sm:text-sm text-xs 3xl:text-2xl rounded-full px-4 py-1.5 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                                >
                                    {service.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {AgencyServices.map((ser, idx) => (
                        <ScrollStackItem
                            key={idx}
                            id={ser?.service?.toLowerCase()}
                            className="backdrop-blur-md text-white flex flex-col gap-8 px-6 py-12 scroll-mt-40"
                            style={{
                                background: ser.color ?? "#171717",
                            }}
                        >
                            <h2 className="relative text-4xl 3xl:text-5xl font-extrabold text-center tracking-wide drop-shadow-[0_0_20px_rgba(139,92,246,0.7)]">
                                {ser.service}
                            </h2>

                            <Carousel
                                items={projectsByCategory[ser.service] ?? []}
                                renderItem={(project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        color={ser.color ?? "#171717"}
                                    />
                                )}
                            />
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs 3xl:text-2xl gap-1 animate-bounce">
                <p className="text-white/70 tracking-wide">Scroll to explore</p>
                <FaChevronDown className="size-5 3xl:size-8 text-cyan-400" />
            </div>
        </>
    );
};

export default Work;
