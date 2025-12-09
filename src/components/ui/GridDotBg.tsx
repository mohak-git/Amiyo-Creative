"use client";

import { HTMLProps, useEffect, useState } from "react";

export interface DotBackgroundProps extends HTMLProps<HTMLDivElement> {
    dotSize?: number;
    dotColor?: string;
    darkDotColor?: string;
    spacing?: number;
    showFade?: boolean;
    fadeIntensity?: number;
    children?: React.ReactNode;
}

export const DotBackground = ({
    className,
    children,
    dotSize = 1,
    dotColor = "#000",
    darkDotColor = "#fff",
    spacing = 20,
    showFade = true,
    fadeIntensity = 20,
    ...props
}: DotBackgroundProps) => {
    const [currentDotColor, setCurrentDotColor] = useState(dotColor);

    useEffect(() => {
        const prefersDarkMode =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDarkModeActive =
            document.documentElement.classList.contains("dark") ||
            prefersDarkMode;
        setCurrentDotColor(isDarkModeActive ? darkDotColor : dotColor);

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "class") {
                    const updatedIsDarkModeActive =
                        document.documentElement.classList.contains("dark");
                    setCurrentDotColor(
                        updatedIsDarkModeActive ? darkDotColor : dotColor
                    );
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return function () {
            return observer.disconnect();
        };
    }, [dotColor, darkDotColor]);

    return (
        <div
            className={`relative overflow-hidden flex h-130 w-full items-center justify-center ${
                className || ""
            }`}
            {...props}>
            <div
                className="absolute left-1/2 overflow-hidden rounded-full -translate-x-1/2 w-1/2 inset-0"
                style={{
                    backgroundSize: spacing + "px " + spacing + "px",
                    backgroundImage:
                        "radial-gradient(" +
                        currentDotColor +
                        " " +
                        dotSize +
                        "px, transparent " +
                        dotSize +
                        "px)",
                }}
            />

            {showFade && (
                <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center "
                    style={{
                        maskImage:
                            "radial-gradient(ellipse at center, transparent " +
                            fadeIntensity +
                            "%, black)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, transparent " +
                            fadeIntensity +
                            "%, black)",
                    }}
                />
            )}

            <div className="relative z-20">{children}</div>
        </div>
    );
};

export default DotBackground;
