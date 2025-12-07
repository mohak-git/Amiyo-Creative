import { ComponentType } from "react";
import { IconType } from "react-icons";

export interface ValueItem {
    label: string;
    value: number;
}

export type ServicesTypes =
    | "Cinematography-and-Videography"
    | "Photography"
    | "Design-and-Branding"
    | "Post-Production"
    | "Web-and-Digital"
    | "Marketing";

export interface ServicesCardProps {
    title: string;
    description: string;
    service: ServicesTypes;
    image: string;
    cta: string;
}

export interface SocialPlatformProps {
    name: string;
    icon: ComponentType<{ className?: string }>;
    borderColor: string;
    textColor: string;
    url: string;
    value: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

export type PricingTypes = "Starter" | "Growth" | "Premium" | "Custom";

export interface PricingDataProps {
    title: string;
    price: string;
    tagline: string;
    features: string[];
    popular: boolean;
    primary: string;
    accent: string;
    border: string;
    hoverGlow: string;
}

export type TestimonialVariant = "text" | "video";

export interface TestimonialProps {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    content: string;
}

export interface VideoTestimonialProps {
    id: string;
    videoUrl: string;
    title?: string;
}

export interface GalleryItem {
    image: string;
    heading: string;
    subheading: string;
}

export interface APIResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface Project {
    _id: string;
    title: string;
    category: ServicesTypes;
    coverImage: string;
    coverImagePublicId: string;
    projectUrl: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export type EnquiryStatus = "new" | "in-progress" | "closed";

export interface Enquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: EnquiryStatus;
    createdAt: string;
    updatedAt: string;
}

export interface AgencyServicesProps {
    icon: IconType;
    label: string;
    service: ServicesTypes;
    color: string;
}

export interface UploadImageResponse {
    url: string;
    public_id: string;
}
