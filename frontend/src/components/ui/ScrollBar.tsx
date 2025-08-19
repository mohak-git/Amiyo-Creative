"use client";

import { useEffect, useState } from "react";

const ScrollBar: React.FC = () => {
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollPercent(scrolled);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "2px",
                width: `${scrollPercent}%`,
                background: "linear-gradient(90deg, #9b5de5, #845ec2, #d65db1)",
                zIndex: 9999,
                transition: "width 0.1s ease-out",
                willChange: "width",
            }}
        />
    );
};

export default ScrollBar;
