"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Carousel from "@/components/ui/Carousel";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { AgencyServices } from "@/constants/constants";
import { useProjects } from "@/hooks/useFetchProjects";
import { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";

const Work = () => {
    const { data, isLoading, error, refetch } = useProjects();

    // const { projectsByCategory, servicesWithProjects } = useMemo(() => {
    //     const byCategory: Record<string, (typeof mockProjects)[0][]> = {};
    //     mockProjects.forEach((project) =>
    //         (byCategory[project.category] ||= []).push(project)
    //     );

    //     const services = AgencyServices.filter(
    //         (ser) => (byCategory[ser.service]?.length ?? 0) > 0
    //     );

    //     return {
    //         projectsByCategory: byCategory,
    //         servicesWithProjects: services,
    //     };
    // }, [mockProjects]);

    const { projectsByCategory, servicesWithProjects } = useMemo(() => {
        if (!data) return { projectsByCategory: {}, servicesWithProjects: [] };

        const projects = data.data;

        const byCategory: Record<string, typeof projects> = {};
        projects.forEach((project) =>
            (byCategory[project.category] ||= []).push(project)
        );

        const services = AgencyServices.filter(
            (ser) => (byCategory[ser.service]?.length ?? 0) > 0
        );

        return {
            projectsByCategory: byCategory,
            servicesWithProjects: services,
        };
    }, [data]);

    if (isLoading) return <Loader />;
    if (error) return <Error message={error.message} onRetry={refetch} />;

    return (
        <>
            <div
                className="absolute inset-0 blur-lg bg-cover bg-center -z-0 pointer-events-none"
                style={{ backgroundImage: "url(/aaabstract.webp)" }}
            />

            <div className="relative h-[88vh] w-full flex flex-col gap-10 px-4 sm:px-10 3xl:px-30 mb-[12vh]">
                <ScrollStack>
                    {/* Heading */}
                    <div className="pt-6 pb-10 flex flex-col justify-around text-center items-center gap-6">
                        <h1 className="relative text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl font-extrabold leading-snug max-w-4xl 3xl:max-w-5xl bg-gradient-to-br from-purple-400 via-white bg-clip-text text-transparent drop-shadow-lg">
                            Every project we take on is a story waiting to be
                            told.
                        </h1>

                        <p className="relative text-base sm:text-lg 3xl:text-2xl text-gray-400 max-w-3xl 3xl:max-w-4xl">
                            At Amiyo Creative, we don&apos;t just deliver
                            “services” — we deliver experiences that last in
                            memories and brands that stand out in markets.
                        </p>

                        <div className="relative flex flex-wrap justify-center gap-3">
                            {servicesWithProjects.map((service, index) => (
                                <a
                                    key={index}
                                    href={`#${service.service.toLowerCase()}`}
                                    className="cursor-none cursor-target border border-purple-500/50 text-purple-300 sm:text-sm text-xs 3xl:text-2xl rounded-full px-4 py-1.5 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                                >
                                    {service.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {servicesWithProjects.map((ser, idx) => {
                        const bgColor = ser.color ?? "#171717";

                        return (
                            <ScrollStackItem
                                key={idx}
                                id={ser.service.toLowerCase()}
                                className="backdrop-blur-md text-white flex flex-col gap-8 px-6 py-6 sm:px-6 sm:py-12 scroll-mt-40"
                                style={{ background: bgColor }}
                            >
                                <h2 className="relative text-2xl sm:text-4xl 3xl:text-5xl font-extrabold text-center tracking-wide drop-shadow-[0_0_20px_rgba(139,92,246,0.7)]">
                                    {ser.service}
                                </h2>

                                <Carousel
                                    items={
                                        projectsByCategory[ser.service] ?? []
                                    }
                                    renderItem={(project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            color={bgColor}
                                        />
                                    )}
                                />
                            </ScrollStackItem>
                        );
                    })}
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
