"use client";

import { RatingStars } from "@/components/elements/Smol";
import { Testimonials, VideoTestimonials } from "@/constants/constants";
import {
    TestimonialProps,
    TestimonialVariant,
    VideoTestimonialProps,
} from "@/constants/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useMemo } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard: FC<{ t: TestimonialProps }> = ({ t }) => {
    return (
        <div className="relative h-fit bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-2 mx-4 min-w-[450px] max-w-[500px] 3xl:max-w-[800px] hover:border-purple-400/40 transition-all duration-300">
            {/* Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-50"></div>

            <div className="relative bg-gray-900/60 rounded-2xl p-6">
                <div className="absolute -top-2 -left-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-2">
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
                            src={t.avatar}
                            alt={t.name}
                            className="w-12 h-12 rounded-full border-2 border-purple-500/30"
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
                        <RatingStars rating={t.rating} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoTestimonialCard: FC<{ t: VideoTestimonialProps }> = ({ t }) => {
    return (
        <div className="relative h-fit bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-2 mx-4 min-w-[450px] max-w-[500px] 3xl:max-w-[800px] hover:border-purple-400/40 transition-all duration-300">
            {/* Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-50"></div>

            <div className="relative bg-gray-900/60 rounded-2xl p-4">
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-purple-500/30">
                    <iframe
                        src={t.videoUrl}
                        title={t.title || "Testimonial Video"}
                        className="w-full h-full rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                {t.title && (
                    <h4 className="text-white font-semibold text-sm 3xl:text-2xl mt-4">
                        {t.title}
                    </h4>
                )}
            </div>
        </div>
    );
};

interface TestimonialRowProps<T> {
    testimonials: T[];
    speed?: number;
    direction?: "left" | "right";
    variant: TestimonialVariant;
}

const TestimonialRow = <T extends TestimonialProps | VideoTestimonialProps>({
    testimonials,
    speed = 40,
    direction = "left",
    variant,
}: TestimonialRowProps<T>) => {
    return (
        <div className="relative overflow-hidden w-full">
            <div
                className={`flex w-max items-center justify-center ${
                    direction === "left" ? "marquee-left" : "marquee-right"
                }`}
                style={{ animationDuration: `${speed}s` }}
            >
                {testimonials.map((t, i) =>
                    variant === "text" ? (
                        <TestimonialCard
                            key={`a-${i}`}
                            t={t as TestimonialProps}
                        />
                    ) : (
                        <VideoTestimonialCard
                            key={`a-${i}`}
                            t={t as VideoTestimonialProps}
                        />
                    )
                )}

                {testimonials.map((t, i) =>
                    variant === "text" ? (
                        <TestimonialCard
                            key={`a-${i}`}
                            t={t as TestimonialProps}
                        />
                    ) : (
                        <VideoTestimonialCard
                            key={`a-${i}`}
                            t={t as VideoTestimonialProps}
                        />
                    )
                )}
            </div>

            <div className="pointer-events-none absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent z-10"></div>
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-gray-900 via-gray-900/60 to-transparent z-10"></div>

            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                @keyframes scroll-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                .marquee-left {
                    animation: scroll-left linear infinite;
                }
                .marquee-right {
                    animation: scroll-right linear infinite;
                }

                .marquee-left:hover,
                .marquee-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

const TestimonialSection: React.FC = () => {
    const textTestimonials = useMemo(() => Testimonials, []);
    const videoTestimonials = useMemo(() => VideoTestimonials, []);

    return (
        <div className="relative w-full bg-gradient-to-b via-purple-900/20 overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto w-full h-full flex flex-col gap-10 px-4 py-16 sm:px-10">
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-extrabold leading-relaxed bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                            Testimonials
                        </h2>
                        <p className="text-gray-400 text-lg 3xl:text-2xl max-w-2xl mx-auto">
                            See what our clients are saying about us
                        </p>
                    </motion.div>
                </div>

                {/* Rows */}
                <div className="space-y-8 h-full w-full rounded-4xl overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <TestimonialRow
                            testimonials={textTestimonials}
                            direction="left"
                            variant="text"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <TestimonialRow
                            testimonials={videoTestimonials}
                            direction="right"
                            variant="video"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;
