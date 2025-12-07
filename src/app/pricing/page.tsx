import PricingCalculator from "@/components/pages/Pricing/PricingCalculator";
import PricingHero from "@/components/pages/Pricing/PricingHero";
import PricingPackages from "@/components/pages/Pricing/PricingPackages";
import PricingPolicies from "@/components/pages/Pricing/PricingPolicies";
import ServicePricingList from "@/components/pages/Pricing/ServicePricingList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | Amiyo Creative - Transparent Production Rates",
    description: "Explore our transparent pricing for video editing, motion graphics, VFX, and branding. Use our calculator to get an instant quote or choose from our curated packages.",
    keywords: ["Video Production Cost", "Pricing Calculator", "Editing Rates", "Amiyo Creative Pricing", "Freelance Rates India"]
};

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-24 md:pt-[13vh]">
            <PricingHero />
            <PricingPackages />
            <PricingCalculator />
            <ServicePricingList />
            <PricingPolicies />
        </main>
    );
}
