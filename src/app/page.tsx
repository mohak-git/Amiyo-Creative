"use client";

import About from "@/components/pages/Home/About";
import Hero from "@/components/pages/Home/Hero";
import Services from "@/components/pages/Home/Services";
import Testimonial from "@/components/pages/Home/Testimonial";
import WhyUs from "@/components/pages/Home/WhyUs";
import MovingLogos from "@/components/ui/MovingLogos";
import useInView from "@/hooks/useInView";

export default function Home() {
    const [heroRef] = useInView();
    const [logosRef, logosInView] = useInView();
    const [aboutRef, aboutInView] = useInView({
        threshold: 0.2,
        rootMargin: "150px",
    });
    const [servicesRef, servicesInView] = useInView();
    const [whyUsRef, whyUsInView] = useInView();
    const [testimonialRef, testimonialInView] = useInView();

    return (
        <main className="sm:pt-[8vh] 3xl:pt-[12vh]">
            <div ref={heroRef}>
                <Hero />
            </div>

            <div ref={logosRef} className="min-h-[80px]">
                {logosInView && <MovingLogos />}
            </div>

            <div ref={aboutRef} className="min-h-[500px]">
                {aboutInView && <About />}
            </div>

            <div ref={servicesRef} className="min-h-[500px]">
                {servicesInView && <Services />}
            </div>

            <div ref={whyUsRef} className="min-h-[500px]">
                {whyUsInView && <WhyUs />}
            </div>

            <div ref={testimonialRef} className="min-h-[500px]">
                {testimonialInView && <Testimonial />}
            </div>
        </main>
    );
}
