export interface ValueItem {
    label: string;
    value: number;
    suffix: string;
}

export interface ServicesCardProps {
    color?: string;
    title: string;
    description: string;
    services: string[];
    tags: string[];
    image: string;
    cta: string;
}

export interface SocialPlatformProps {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    borderColor: string;
    textColor: string;
    url: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

export type PricingTypes = "Starter" | "Growth" | "Premium" | "Custom";

export interface PricingDataProps {
    title: PricingTypes;
    price: string;
    tagline: string;
    features: string[];
    popular: boolean;
    primary: string;
    accent: string;
    border: string;
    hoverGlow: string;
}

export interface TestimonialProps {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    content: string;
}
