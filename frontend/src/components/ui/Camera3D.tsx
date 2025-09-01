"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
    sceneUrl: string;
    fallbackImg?: string;
    height?: string | number;
};

export default function SplineScene({
    sceneUrl,
    fallbackImg = "/logo.svg",
    height = 500,
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (isMobile)
        return (
            <Image
                src={fallbackImg}
                alt="Creative Visuals"
                className="rounded-2xl w-full h-auto object-cover aspect-video"
                width={2000}
                height={2000}
            />
        );

    return (
        <div ref={containerRef} className="relative w-full" style={{ height }}>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    Loading 3D…
                </div>
            )}
            <Spline scene={sceneUrl} onLoad={() => setLoaded(true)} />
        </div>
    );
}
