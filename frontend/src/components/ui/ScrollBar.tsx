"use client";

import { useEffect, useRef } from "react";

const ScrollBar: React.FC = () => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            if (barRef.current) barRef.current.style.width = `${scrolled}%`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={barRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "2px",
                width: "0%",
                background: "linear-gradient(90deg, #9b5de5, #845ec2, #d65db1)",
                zIndex: 9999,
            }}
        />
    );
};

export default ScrollBar;
//
