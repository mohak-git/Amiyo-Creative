"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { GoMoveToTop } from "react-icons/go";

interface GoToTopProps {
    threshold?: number;
    scrollBehavior?: ScrollBehavior;
    children?: ReactNode;
}

const GoToTop: FC<GoToTopProps> = ({
    threshold = 50,
    scrollBehavior = "smooth",
}) => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > threshold);

        window.addEventListener("scroll", handler, { passive: true });
        handler();

        return () => window.removeEventListener("scroll", handler);
    }, [threshold]);

    const scrollToTop = (): void =>
        window.scrollTo({ top: 0, behavior: scrollBehavior });

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-800 text-white text-lg opacity-70 hover:opacity-100 shadow-md transition"
        >
            <GoMoveToTop />
        </button>
    );
};

export default GoToTop;
