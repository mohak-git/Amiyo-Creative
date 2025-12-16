"use client";

import { RatingStars } from "@/components/elements/Smol";
import { Testimonial } from "@/constants/types";
import { useTestimonials } from "@/hooks/useTestimonials";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import { FC, useMemo, useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard: FC<{ t: Testimonial }> = ({ t }) => {
    return (
        <div className="relative h-fit bg-gray-900/40 sm:backdrop-blur-sm border border-purple-500/20 rounded-2xl p-2 mx-4 w-[85vw] max-w-[300px] sm:w-auto sm:min-w-[450px] sm:max-w-[500px] 3xl:max-w-[800px] hover:border-purple-400/40 transition-all duration-300">
            {/* Glow */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-50"></div>

            <div className="relative bg-gray-900/60 rounded-2xl p-6">
                <div className="absolute -top-2 -left-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-full p-2">
                    <FaQuoteLeft className="size-4 3xl:size-6 text-white" />
                </div>

                <h4 className="mb-6 text-sm 3xl:text-2xl leading-relaxed">
                    {t.content}
                </h4>

                <div className="flex items-center justify-between">
                    <div className="flex gap-4 justify-center items-center">
                        <Image
                            width={500}
                            height={500}
                            src={t.avatar || "/placeholder.png"}
                            alt={t.name || "Avatar"}
                            className="w-12 h-12 rounded-full border-2 border-purple-500/30 object-cover"
                        />

                        <div>
                            <h4 className="text-white font-semibold text-sm 3xl:text-2xl">
                                {t.name}
                            </h4>
                            <p className="text-purple-300 text-xs 3xl:text-xl">
                                {t.role}
                            </p>
                            <p className="text-gray-400 text-xs 3xl:text-xl">
                                {t.company}
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <RatingStars rating={t.rating || 5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoTestimonialCard: FC<{ t: Testimonial }> = ({ t }) => {
    return (
        <div className="relative h-fit bg-gray-900/40 sm:backdrop-blur-sm border border-purple-500/20 rounded-2xl p-2 mx-4 w-[85vw] max-w-[300px] sm:w-auto sm:min-w-[450px] sm:max-w-[500px] 3xl:max-w-[800px] hover:border-purple-400/40 transition-all duration-300">
            {/* Glow */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-50"></div>

            <div className="relative bg-gray-900/60 rounded-2xl p-4">
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-purple-500/30">
                    <iframe
                        src={t.videoUrl}
                        title={t.videoTitle || "Testimonial Video"}
                        className="w-full h-full rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                {t.videoTitle && (
                    <h4 className="text-white font-semibold text-sm 3xl:text-2xl mt-4">
                        {t.videoTitle}
                    </h4>
                )}
            </div>
        </div>
    );
};

interface TestimonialRowProps {
    testimonials: Testimonial[];
    speed?: number;
    direction?: "left" | "right";
    variant: "text" | "video";
}

const TestimonialRow = ({
    testimonials,
    speed = 40,
    direction = "left",
    variant,
}: TestimonialRowProps) => {
    const baseX = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const baseVelocity = 50 / speed;
    const directionFactor = direction === "left" ? -1 : 1;
    useAnimationFrame((_, delta) => {
        if (!isHovered && !isDragging) {
            const moveBy = baseVelocity * directionFactor * (delta / 1000);
            baseX.set(baseX.get() + moveBy);
        }
    });

    const wrap = (min: number, max: number, v: number) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    return (
        <div
            className="relative overflow-hidden w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <motion.div
                ref={containerRef}
                className="flex w-max items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
                style={{ x }}
                onPan={(_, info) => {
                    if (containerRef.current) {
                        const width = containerRef.current.offsetWidth;
                        const deltaPercent = (info.delta.x / width) * 100;
                        baseX.set(baseX.get() + deltaPercent);
                    }
                }}
                onPanStart={() => setIsDragging(true)}
                onPanEnd={() => setIsDragging(false)}>
                {testimonials.map((t, i) =>
                    variant === "text" ? (
                        <TestimonialCard key={`a-${i}`} t={t} />
                    ) : (
                        <VideoTestimonialCard key={`a-${i}`} t={t} />
                    )
                )}

                {testimonials.map((t, i) =>
                    variant === "text" ? (
                        <TestimonialCard key={`b-${i}`} t={t} />
                    ) : (
                        <VideoTestimonialCard key={`b-${i}`} t={t} />
                    )
                )}
            </motion.div>

            <div className="pointer-events-none absolute top-0 left-0 w-40 h-full bg-linear-to-r from-gray-900 via-gray-900/60 to-transparent z-10"></div>
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-full bg-linear-to-l from-gray-900 via-gray-900/60 to-transparent z-10"></div>
        </div>
    );
};

const TestimonialSection: React.FC = () => {
    const { data: dbTestimonials = [], isPending } = useTestimonials();

    const textTestimonials = useMemo(() => {
        const dbText = dbTestimonials.filter((t) => !t.isVideo);
        if (dbText.length > 0) return dbText;
        return dbText;
    }, [dbTestimonials]);

    const videoTestimonials = useMemo(() => {
        const dbVideo = dbTestimonials.filter((t) => t.isVideo);
        return dbVideo;
    }, [dbTestimonials]);

    const showTextRow = textTestimonials.length > 0;
    const showVideoRow = videoTestimonials.length > 0;

    if (!isPending && !showTextRow && !showVideoRow) return null;

    return (
        <div className="relative w-full bg-linear-to-b via-purple-900/20 overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-linear-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto w-full h-full flex flex-col gap-10 px-4 py-16 sm:px-10">
                {/* Header */}
                <div className="text-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-extrabold leading-relaxed bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                            Testimonials
                        </h2>
                        <p className="text-gray-400 text-lg 3xl:text-2xl max-w-2xl mx-auto">
                            See what our clients are saying about us
                        </p>
                    </div>
                </div>

                {/* Rows */}
                <div className="space-y-8 h-full w-full sm:rounded-4xl overflow-hidden min-h-[400px]">
                    {showTextRow && (
                        <TestimonialRow
                            testimonials={textTestimonials}
                            direction="left"
                            variant="text"
                        />
                    )}

                    {showVideoRow && (
                        <TestimonialRow
                            testimonials={videoTestimonials}
                            direction="right"
                            variant="video"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;
