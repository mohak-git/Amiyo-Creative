import { RisingDots } from "@/components/elements/MicroAnimations";
import { PricingDataProps } from "@/constants/types";
import {
    motion,
    SpringOptions,
    useMotionValue,
    useSpring,
    Variants,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface PricingCardProps {
    data: PricingDataProps;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showTooltip?: boolean;
}

const springValues: SpringOptions = {
    damping: 25,
    stiffness: 200,
    mass: 1,
};

export default function PricingCard({
    data,
    scaleOnHover = 0.95,
    rotateAmplitude = 12,
    showTooltip = false,
}: PricingCardProps) {
    const ref = useRef<HTMLElement>(null);
    const tier = data.title;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(0, springValues);
    const rotateY = useSpring(0, springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0, { damping: 30, stiffness: 300 });

    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const offsetX = e.clientX - rect.left - centerX;
            const offsetY = e.clientY - rect.top - centerY;

            const rotationX = (-offsetY / centerY) * rotateAmplitude;
            const rotationY = (offsetX / centerX) * rotateAmplitude;

            rotateX.set(rotationX);
            rotateY.set(rotationY);

            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
        },
        [rotateAmplitude, rotateX, rotateY, x, y]
    );

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        scale.set(scaleOnHover);
        opacity.set(1);
    }, [scaleOnHover, scale, opacity]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        scale.set(1);
        opacity.set(0);
        rotateX.set(0);
        rotateY.set(0);
    }, [scale, opacity, rotateX, rotateY]);

    const listVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <figure
            ref={ref}
            className="w-full h-full [perspective:1000px] flex flex-col items-center justify-center"
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card */}
            <motion.div
                style={{ rotateX, rotateY, scale }}
                className="[transform-style:preserve-3d] h-full w-full flex justify-center items-center relative"
            >
                <div
                    className={`group relative h-full w-full flex flex-col bg-black/10 rounded-2xl text-center p-8 backdrop-blur-2xl border transition-all duration-700 ease-out bg-gradient-to-br ${data.border} ${data.hoverGlow}`}
                >
                    {/* Content */}
                    <div className="relative z-10">
                        {data.popular && (
                            <span
                                className={`absolute -top-12 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-xl bg-gradient-to-r ${data.primary} flex items-center gap-1.5`}
                            >
                                Most Popular
                            </span>
                        )}

                        <h3 className="text-xl font-bold text-white mb-2">
                            {tier}
                        </h3>
                        <p className="text-xs mb-4 opacity-80">
                            {data.tagline}
                        </p>

                        <p
                            className={`my-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                                data.primary
                            } ${tier === "Custom" && "animate-pulse"}
                            `}
                        >
                            {data.price}
                            {tier !== "Custom" && (
                                <span className="text-xs text-white/60 font-light">
                                    {" "}
                                    / month
                                </span>
                            )}
                        </p>

                        <motion.ul
                            className="flex flex-col gap-3 text-sm text-left text-white/90 mb-8"
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {data.features.map((feature, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-3"
                                    variants={itemVariants}
                                >
                                    <FaCheckCircle
                                        className={`h-4 w-4 ${data.accent} shrink-0 mt-0.5`}
                                    />
                                    <span>{feature}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <button
                            className={`w-full cursor-target cursor-none py-3 px-6 outline-none border-0 rounded-xl font-semibold text-white bg-gradient-to-r ${data.primary} shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-white/200`}
                        >
                            {tier === "Custom"
                                ? "Contact Sales"
                                : "Get Started"}
                        </button>
                    </div>

                    {tier === "Custom" && isHovered && <RisingDots />}
                </div>
            </motion.div>

            {/* Tooltip */}
            {showTooltip && (
                <motion.figcaption
                    className={`pointer-events-none absolute left-0 top-0 rounded-lg px-3 py-2 text-xs text-white font-medium opacity-0 z-[3] hidden sm:block backdrop-blur-xl border shadow-xl bg-gradient-to-r ${data.border} `}
                    style={{ x, y, opacity }}
                >
                    {data.price}
                    <div className="text-xs opacity-70 mt-1">{tier}</div>
                </motion.figcaption>
            )}
        </figure>
    );
}
