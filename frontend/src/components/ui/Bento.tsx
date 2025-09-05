import { ServicesCardProps } from "@/constants/types";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { CiLocationArrow1 } from "react-icons/ci";

export interface BentoProps {
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    data: ServicesCardProps[];
}

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "0, 195, 255";

const updateCardGlowProperties = (
    card: HTMLElement,
    mouseX: number,
    mouseY: number,
    glow: number,
    radius: number
) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty("--glow-x", `${relativeX}%`);
    card.style.setProperty("--glow-y", `${relativeY}%`);
    card.style.setProperty("--glow-intensity", glow.toString());
    card.style.setProperty("--glow-radius", `${radius}px`);
};

const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}> = ({
    children,
    className = "",
    style,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        const element = cardRef.current;

        const handleMouseEnter = () => (isHoveredRef.current = true);

        const handleMouseLeave = () => {
            isHoveredRef.current = false;

            if (enableMagnetism)
                gsap.to(element, { x: 0, y: 0, duration: 0.1 });
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableMagnetism) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;

                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.1,
                    ease: "power2.out",
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (!clickEffect) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement("div");
            ripple.style.cssText = `
                position: absolute;
                width: ${maxDistance * 2}px;
                height: ${maxDistance * 2}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                left: ${x - maxDistance}px;
                top: ${y - maxDistance}px;
                pointer-events: none;
                z-index: 1000;
            `;

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                { scale: 0, opacity: 1 },
                {
                    scale: 1,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => ripple.remove(),
                }
            );
        };

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("click", handleClick);

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("click", handleClick);
        };
    }, [enableMagnetism, clickEffect, glowColor]);

    return (
        <div
            ref={cardRef}
            className={`${className} relative overflow-hidden`}
            style={{ ...style, position: "relative", overflow: "hidden" }}
        >
            {children}
        </div>
    );
};

const GlobalSpotlight: React.FC<{
    gridRef: React.RefObject<HTMLDivElement | null>;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}> = ({
    gridRef,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR,
}) => {
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    const isInsideSection = useRef(false);

    useEffect(() => {
        if (!gridRef?.current || !enabled) return;

        const spotlight = document.createElement("div");
        spotlight.className = "global-spotlight";
        spotlight.style.cssText = `
            position: fixed;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle,
                rgba(${glowColor}, 0.15) 0%,
                rgba(${glowColor}, 0.08) 15%,
                rgba(${glowColor}, 0.04) 25%,
                rgba(${glowColor}, 0.02) 40%,
                rgba(${glowColor}, 0.01) 65%,
                transparent 70%
            );
            z-index: 200;
            opacity: 0;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
        `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current || !gridRef.current) return;

            const section = gridRef.current.closest(".bento-section");
            const rect = section?.getBoundingClientRect();
            const mouseInside = rect
                ? e.clientX >= rect.left &&
                  e.clientX <= rect.right &&
                  e.clientY >= rect.top &&
                  e.clientY <= rect.bottom
                : false;

            isInsideSection.current = mouseInside;
            const cards = gridRef.current.querySelectorAll(".card");

            if (!mouseInside) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
                cards.forEach((card) => {
                    (card as HTMLElement).style.setProperty(
                        "--glow-intensity",
                        "0"
                    );
                });
                return;
            }

            const proximity = spotlightRadius * 0.5;
            const fadeDistance = spotlightRadius * 0.75;
            let minDistance = Infinity;

            cards.forEach((card) => {
                const cardElement = card as HTMLElement;
                const cardRect = cardElement.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance =
                    Math.hypot(e.clientX - centerX, e.clientY - centerY) -
                    Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);

                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) glowIntensity = 1;
                else if (effectiveDistance <= fadeDistance)
                    glowIntensity =
                        (fadeDistance - effectiveDistance) /
                        (fadeDistance - proximity);

                updateCardGlowProperties(
                    cardElement,
                    e.clientX,
                    e.clientY,
                    glowIntensity,
                    spotlightRadius
                );
            });

            gsap.to(spotlightRef.current, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            const targetOpacity =
                minDistance <= proximity
                    ? 0.8
                    : minDistance <= fadeDistance
                    ? ((fadeDistance - minDistance) /
                          (fadeDistance - proximity)) *
                      0.8
                    : 0;

            gsap.to(spotlightRef.current, {
                opacity: targetOpacity,
                duration: targetOpacity > 0 ? 0.2 : 0.5,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            isInsideSection.current = false;
            gridRef.current?.querySelectorAll(".card").forEach((card) => {
                (card as HTMLElement).style.setProperty(
                    "--glow-intensity",
                    "0"
                );
            });
            if (spotlightRef.current) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
        };
    }, [gridRef, enabled, spotlightRadius, glowColor]);

    return null;
};

const BentoCardGrid: React.FC<{
    children: React.ReactNode;
    gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
    <div
        className="bento-section grid gap-2 w-[100%] select-none relative"
        style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
        ref={gridRef}
    >
        {children}
    </div>
);

const Bento: React.FC<BentoProps> = ({
    enableSpotlight = true,
    enableBorderGlow = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true,
    data = [],
}) => {
    const gridRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <style>
                {`
                    .bento-section {
                      --glow-x: 50%;
                      --glow-y: 50%;
                      --glow-intensity: 0;
                      --glow-radius: 200px;
                      --glow-color: ${glowColor};
                      --border-color: #392e4e;
                      --background-dark: #060010;
                      --white: hsl(0, 0%, 100%);
                      --purple-primary: rgba(132, 0, 255, 1);
                      --purple-glow: rgba(132, 0, 255, 0.2);
                      --purple-border: rgba(132, 0, 255, 0.8);
                    }
                            
                    .card-responsive {
                      display: grid;
                      gap: 1rem;
                      grid-template-columns: 1fr;
                      width: 100%;
                      margin: 0 auto;
                    }
                            
                    @media (min-width: 600px) {
                      .card-responsive {
                        grid-template-columns: repeat(2, 1fr);
                      }
                    }
                            
                    @media (min-width: 1024px) {
                      .card-responsive {
                        grid-template-columns: repeat(4, 1fr);
                      }
                            
                      .card-responsive .card:nth-child(3) {
                        grid-column: span 2;
                        grid-row: span 2;
                      }
                            
                      .card-responsive .card:nth-child(4) {
                        grid-column: 1 / span 2;
                        grid-row: 2 / span 2;
                      }
                            
                      .card-responsive .card:nth-child(6) {
                        grid-column: 4;
                        grid-row: 3;
                      }
                    }
                            
                    .card--border-glow::after {
                      content: '';
                      position: absolute;
                      inset: 0;
                      padding: 4px;
                      background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                          rgba(${glowColor}, calc(var(--glow-intensity) * 1.2)) 0%,
                          rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 30%,
                          transparent 60%);
                      border-radius: inherit;
                      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                      mask-composite: subtract;
                      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                      -webkit-mask-composite: xor;
                      pointer-events: none;
                      transition: opacity 0.3s ease;
                      z-index: 1;
                    }
                            
                    .card--border-glow:hover::after {
                      opacity: 1;
                    }
                            
                    .card--border-glow:hover {
                      box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${glowColor}, 0.2);
                    }
                            
                    .particle::before {
                      content: '';
                      position: absolute;
                      top: -2px;
                      left: -2px;
                      right: -2px;
                      bottom: -2px;
                      background: rgba(${glowColor}, 0.2);
                      border-radius: 50%;
                      z-index: -1;
                    }
                            
                    .particle-container:hover {
                      box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
                    }
                            
                    .text-clamp-1 {
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 1;
                      line-clamp: 1;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                            
                    .text-clamp-2 {
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2;
                      line-clamp: 2;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                            
                    @media (max-width: 599px) {
                      .card-responsive {
                        grid-template-columns: 1fr;
                        width: 100%;
                        margin: 0 auto;
                      }
                            
                      .card-responsive .card {
                        width: 100%;
                        min-height: 180px;
                      }
                    }
                `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <BentoCardGrid gridRef={gridRef}>
                <div className="card-responsive grid">
                    {data.map((card, index) => {
                        const baseClassName = `card flex flex-col justify-between relative aspect-[16/9] min-h-[200px] w-full max-w-full rounded-[20px] font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${
                            enableBorderGlow ? "card--border-glow" : ""
                        }`;

                        const cardStyle = {
                            backgroundColor: "var(--background-dark)",
                            borderColor: "var(--border-color)",
                            color: "var(--white)",
                            "--glow-x": "50%",
                            "--glow-y": "50%",
                            "--glow-intensity": "0",
                            "--glow-radius": "200px",
                        } as React.CSSProperties;

                        return (
                            <ParticleCard
                                key={index}
                                className={`${baseClassName} group`}
                                style={cardStyle}
                                glowColor={glowColor}
                                clickEffect={clickEffect}
                                enableMagnetism={enableMagnetism}
                            >
                                <Image
                                    src={card.image}
                                    height={5000}
                                    width={5000}
                                    alt={card.description}
                                    className="absolute w-full h-full object-cover group-hover:brightness-25 transition-all duration-500"
                                />

                                <Link
                                    href={`/work#${card?.service?.toLowerCase()}`}
                                    className="cta-overlay absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                                >
                                    <span className="px-2 cursor-target cursor-none py-2 rounded-full backdrop-blur-md bg-white/2 border border-white/20 flex justify-center items-center text-white text-sm font-bold tracking-wide shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,215,255,0.7)]">
                                        <CiLocationArrow1 className="arrow-icon size-6 z-10 p-1" />
                                        {card.cta}
                                    </span>
                                </Link>

                                <div className="group-hover:hidden flex flex-col justify-end h-full w-full relative text-white p-4 3xl:p-10 z-10">
                                    <h3 className="w-fit font-normal text-base 3xl:text-2xl m-0 mb-1 bg-black/70 p-1 rounded-lg">
                                        {card.title}
                                    </h3>
                                    <p className="w-fit text-xs 3xl:text-xl leading-5 opacity-90">
                                        {card.description}
                                    </p>
                                </div>
                            </ParticleCard>
                        );
                    })}
                </div>
            </BentoCardGrid>
        </>
    );
};

export default Bento;
