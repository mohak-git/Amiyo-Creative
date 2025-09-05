"use client";

import Bento from "@/components/ui/Bento";
import { ServicesData, SocialPlatforms } from "@/constants/constants";
import { motion, Variants } from "framer-motion";

const Services = () => {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    const fadeIn: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-20">
                <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_10%_80%,rgba(217,70,239,0.25),transparent_60%),radial-gradient(700px_500px_at_90%_70%,rgba(99,102,241,0.25),transparent_65%)]" />
                <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent 0px, transparent 28px, rgba(255,255,255,0.08) 29px, transparent 30px), repeating-linear-gradient(90deg, transparent 0px, transparent 28px, rgba(255,255,255,0.08) 29px, transparent 30px)",
                    }}
                />
                <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl" />
                <div className="absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
            </div>

            <div className="relative mx-auto flex w-full flex-col gap-10 px-4 pt-16 pb-4 sm:px-10">
                {/* Text */}
                <motion.section
                    className="mx-auto w-full"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div
                        className="mx-auto max-w-5xl text-center"
                        variants={fadeUp}
                    >
                        <h1 className="text-4xl 3xl:text-6xl font-extrabold tracking-tight  sm:text-5xl">
                            Our Services
                        </h1>
                        <p className="mx-auto mt-5 max-w-4xl 3xl:max-w-6xl text-balance text-base leading-relaxed text-white/80 sm:text-lg 3xl:text-2xl">
                            At{" "}
                            <span className="font-semibold text-gray">
                                Amiyo Creative
                            </span>
                            , we partner with brands, startups, influencers, and
                            individuals — across India and worldwide. Booking us
                            is simple: reach out via WhatsApp, Instagram,
                            LinkedIn, Twitter, Telegram, Email, Phone, or
                            directly through our Website.
                        </p>
                        <p className="mx-auto mt-4 max-w-3xl text-balance text-base leading-relaxed text-gray-400 sm:text-lg 3xl:text-2xl">
                            We don&apos;t box ourselves into categories. We
                            assemble the right squad — cinematographers,
                            photographers, designers, editors, developers,
                            marketers, and strategists — to deliver end-to-end
                            outcomes that actually move the needle.
                        </p>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        className="mx-auto mt-7 flex w-full max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-4"
                        variants={fadeIn}
                    >
                        {SocialPlatforms.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.url}
                                target={platform.target || "_self"}
                                rel={
                                    platform.target
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`inline-flex cursor-none cursor-target items-center gap-2 rounded-full border p-3 text-sm backdrop-blur transition-all duration-200 hover:scale-105 hover:border-opacity-50 ${platform.borderColor} ${platform.textColor}`}
                            >
                                <platform.icon className="size-6 3xl:size-8" />
                                {/* {platform.name} */}
                            </a>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Cards */}
                <motion.section
                    className="relative rounded-lg sm:p-10 backdrop-blur-3xl border shadow-xl bg-black/20 border-white/10"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Bento data={ServicesData} />
                </motion.section>
            </div>
        </div>
    );
};

export default Services;
