"use client";

import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";

type Props = {
    sceneUrl: string;
    height?: string | number;
};

export default function SplineScene({ sceneUrl, height = 500 }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loaded, setLoaded] = useState(false);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height }}>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    Setting up the perfect shot...
                </div>
            )}
            <div className="absolute bg-linear-to-r text-xs flex justify-center items-center from-purple-950 to-slate-900 w-36 h-9 bottom-5 right-5 rounded-2xl z-20">
                Founder <span className="text-white font-bold ">: Amiyo Panda</span>
            </div>
            <Spline scene={sceneUrl} onLoad={() => setLoaded(true)} />
        </div>
    );
}
