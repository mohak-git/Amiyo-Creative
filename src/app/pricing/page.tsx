import PricingCTA from "@/components/pages/Pricing/PricingCTA";
import PricingCalculator from "@/components/pages/Pricing/PricingCalculator";
import PricingHero from "@/components/pages/Pricing/PricingHero";
import PricingPackages from "@/components/pages/Pricing/PricingPackages";
import PricingPolicies from "@/components/pages/Pricing/PricingPolicies";
import ServicePricingList from "@/components/pages/Pricing/ServicePricingList";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-12 md:pt-[13vh]">
            <PricingHero />
            <PricingPackages />
            <PricingCalculator />
            <ServicePricingList />
            <PricingPolicies />
            <PricingCTA />
        </main>
    );
}
