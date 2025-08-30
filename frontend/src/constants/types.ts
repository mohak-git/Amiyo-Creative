import { IconType } from "react-icons";

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

export interface GalleryItem {
    image: string;
    heading: string;
    subheading: string;
}

export interface StrapiResponse<T> {
    data: T;
    meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
    data: T[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiMedia {
    id: number;
    documentId: string;
    url: string;
}

export interface ProjectFeature {
    id: number;
    title: string;
    description?: string;
    icon?: StrapiMedia;
}

export interface Project {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    coverImage: StrapiMedia;
    projectUrl?: string;
    technologies?: string[];
    clientName?: string;
    completionDate?: string;
    gallery?: StrapiMedia[];
    features?: ProjectFeature[];
}

export interface AgencyServicesProps {
    icon: IconType;
    label: string;
    angle: string;
}
