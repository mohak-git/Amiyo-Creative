import About from "@/components/pages/Home/About";
import Hero from "@/components/pages/Home/Hero";
import Pricing from "@/components/pages/Home/Pricing";
import Services from "@/components/pages/Home/Services";
import Testimonial from "@/components/pages/Home/Testimonial";
import WhyUs from "@/components/pages/Home/WhyUs";

export default function Home() {
    return (
        <>
            <main className="pt-[13vh]">
                <Hero />
                <About />
                <Services />
                <Pricing />
                <WhyUs />
                <Testimonial />
            </main>
        </>
    );
}
