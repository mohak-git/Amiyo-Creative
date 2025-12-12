import About from "@/components/pages/Home/About";
import Hero from "@/components/pages/Home/Hero";
import Services from "@/components/pages/Home/Services";
import Testimonial from "@/components/pages/Home/Testimonial";
import WhyUs from "@/components/pages/Home/WhyUs";
import MovingLogos from "@/components/ui/MovingLogos";

export default function Home() {
    return (
        <>
            <main className="sm:pt-[8vh] 3xl:pt-[12vh]">
                <Hero />
                <MovingLogos />
                <About />
                <Services />
                {/* <Pricing /> */}
                <WhyUs />
                <Testimonial />
            </main>
        </>
    );
}
