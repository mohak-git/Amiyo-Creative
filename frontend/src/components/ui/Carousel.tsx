"use client";

import { ReactNode, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
}

const Carousel = <T,>({ items, renderItem }: CarouselProps<T>) => {
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);

    const getVisibleCount = () => {
        if (typeof window === "undefined") return 1;
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    };

    useEffect(() => {
        const update = () => setVisibleCount(getVisibleCount());
        update();

        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const maxIndex = Math.max(0, items.length - visibleCount);
    const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrent((prev) => Math.min(prev + 1, maxIndex));

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${
                        (current * 100) / visibleCount
                    }%)`,
                }}
            >
                {items.map((item, idx) => (
                    <ul
                        key={idx}
                        className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
                    >
                        {renderItem(item, idx)}
                    </ul>
                ))}
            </div>

            {current > 0 && (
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
                >
                    <FaChevronLeft />
                </button>
            )}

            {current < maxIndex && (
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
                >
                    <FaChevronRight />
                </button>
            )}
        </div>
    );
};
export default Carousel;
