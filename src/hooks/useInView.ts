"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = IntersectionObserverInit & {
    triggerOnce?: boolean;
};

export default function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {
        threshold: 0.1,
        rootMargin: "100px",
        triggerOnce: true,
    }
) {
    const { triggerOnce = true, ...observerOptions } = options;
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                if (triggerOnce) setHasBeenInView(true);
            } else if (!triggerOnce) setIsInView(false);
        }, observerOptions);

        const currentRef = ref.current;
        observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [triggerOnce, observerOptions]);

    const isVisible = triggerOnce ? hasBeenInView : isInView;
    return [ref, isVisible] as const;
}
