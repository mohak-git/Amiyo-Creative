import {
    AgencyServicesProps,
    APIResponse,
    GalleryItem,
    PricingDataProps,
    Project,
    ServicesCardProps,
    SocialPlatformProps,
    TestimonialProps,
    ValueItem,
    VideoTestimonialProps,
} from "@/constants/types";

import {
    FaCamera,
    FaCode,
    FaEdit,
    FaEnvelope,
    FaFilm,
    FaHome,
    FaInstagram,
    FaLinkedin,
    FaMailBulk,
    FaPalette,
    FaPhoneAlt,
    FaPlay,
    FaProjectDiagram,
    FaTelegram,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

export const NavItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export const AdminNavItems = [
    { name: "Dashboard", href: "/admin", icon: FaHome },
    { name: "Projects", href: "/admin/projects", icon: FaProjectDiagram },
    { name: "Enquiries", href: "/admin/enquiries", icon: FaEnvelope },
];

export const hexToRgb = (hex: string): [number, number, number] => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m
        ? [
              parseInt(m[1], 16) / 255,
              parseInt(m[2], 16) / 255,
              parseInt(m[3], 16) / 255,
          ]
        : [1, 1, 1];
};

export async function parseAPIResponse<T>(
    res: Response,
    fallbackMessage: string
): Promise<T> {
    const text = await res.text();
    let json: unknown;

    try {
        json = JSON.parse(text);
    } catch {
        if (!res.ok) throw new Error(text.trim() || fallbackMessage);
        throw new Error("Unexpected non-JSON response");
    }

    const { success, message, data } = json as APIResponse<T>;
    if (!success) throw new Error(message || fallbackMessage);

    return data;
}

export const HomeAboutValues: ValueItem[] = [
    { label: "Projects Completed", value: 150 },
    { label: "Happy Clients", value: 120 },
    { label: "Years Experience", value: 8 },
    { label: "Team Members", value: 25 },
];

export const Companies: { title: string; imageLink: string }[] = [
    {
        title: "Spotify",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
    {
        title: "Microsoft",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
        title: "Google",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
        title: "Apple",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
        title: "Amazon",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
        title: "Tesla",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
        title: "Twitter",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    },
    {
        title: "Netflix",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
    },
    {
        title: "IBM",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
        title: "LinkedIn",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    },
    {
        title: "Uber",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    },
    {
        title: "Airbnb",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
    },
    {
        title: "PayPal",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
];

export const ServicesData: ServicesCardProps[] = [
    {
        title: "Photography (All Types)",
        description:
            "Product, model, fashion, e-commerce, lifestyle, events, food, interiors and more.",
        service: "Photography",
        image: "https://images.unsplash.com/photo-1518930107639-f4538ad82a00",
        cta: "Explore Photography",
    },
    {
        title: "Video Production (All Types)",
        description:
            "Commercials, brand films, product videos, interviews, documentaries, events, weddings — complete production from planning to delivery",
        service: "Video-Production",
        image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea",
        cta: "View Video Production",
    },
    {
        title: "Video Editing (Complete Spectrum)",
        description:
            "Reels, shorts, YouTube long-form, cinematic edits, ads, documentaries, corporate films, wedding edits, color grading —we edit every format and every style.",
        service: "Video-Editing",
        image: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7",
        cta: "View Video Editing",
    },
    {
        title: "Brand Design (Full Identity System)",
        description:
            "Logo design, brand identity, packaging, marketing creatives, banners, posters, social media kit — complete branding solutions.",
        service: "Brand-Design",
        image: "https://images.unsplash.com/photo-1621111848501-8d3634f82336",
        cta: "View Brand Design",
    },
    {
        title: "Web Development (All Solutions)",
        description:
            "Business websites, portfolios, e-commerce, landing pages, custom UI/UX.",
        service: "Web-Development",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
        cta: "View Web Development",
    },
    {
        title: "CGI & VFX (All Categories)",
        description:
            "3D product rendering, animations, motion graphics, compositing, cinematic VFX — simple to high-end visuals.",
        service: "CGI-VFX",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        cta: "View CGI & VFX",
    },
];

export const SocialPlatforms: SocialPlatformProps[] = [
    {
        name: "Phone",
        icon: FaPhoneAlt,
        borderColor: "border-gray-500/30",
        textColor: "text-gray-300",
        url: "tel:+919330231517",
        value: "+91 93302 31517",
        target: "_self",
    },
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        borderColor: "border-green-500/30",
        textColor: "text-green-400",
        url: "https://wa.me/+919330231517",
        value: "+91 93302 31517",
        target: "_blank",
    },
    {
        name: "Email",
        icon: FaMailBulk,
        borderColor: "border-gray-400/30",
        textColor: "text-gray-300",
        url: "mailto:contact@amiyocreative.com",
        value: "contact@amiyocreative.com",
        target: "_self",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        borderColor: "border-pink-500/30",
        textColor: "text-pink-400",
        url: "https://www.instagram.com/amiyo_creative/",
        value: "@amiyo_creative",
        target: "_blank",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        url: "https://www.linkedin.com/company/amiyocreative/",
        value: "amiyocreative",
        target: "_blank",
    },
    {
        name: "X",
        icon: FaXTwitter,
        borderColor: "border-white/30",
        textColor: "text-white",
        url: "https://x.com/Amiyo_Creative",
        value: "@Amiyo_Creative",
        target: "_blank",
    },
    {
        name: "Telegram",
        icon: FaTelegram,
        borderColor: "border-cyan-500/30",
        textColor: "text-cyan-500",
        url: "https://t.me/amiyocreative",
        value: "@amiyocreative",
        target: "_blank",
    },
    {
        name: "YouTube",
        icon: FaYoutube,
        borderColor: "border-red-500/30",
        textColor: "text-red-400",
        url: "https://www.youtube.com/@amiyocreative",
        value: "@amiyocreative",
        target: "_blank",
    },
    {
        name: "Threads",
        icon: FaThreads,
        borderColor: "border-white/30",
        textColor: "text-white",
        url: "https://threads.com/@amiyo_creative",
        value: "@amiyo_creative",
        target: "_blank",
    },
];

export const PricingData: PricingDataProps[] = [
    {
        title: "Starter",
        price: "₹7,999",
        tagline: "Perfect for freelancers, startups & individuals",
        features: [
            "5 Social Media Posts (static or carousel)",
            "2 Short Reels / Shorts (up to 30 sec)",
            "1 Long Video Editing (up to 5 min)",
            "Basic Photo Retouching (5 photos)",
            "Standard Turnaround (3-4 days)",
            "Email Support",
        ],
        popular: false,
        primary: "from-slate-600 to-slate-400",
        accent: "text-slate-400",
        border: "border-slate-300/30",
        hoverGlow: "hover:shadow-[0_12px_20px_-8px_rgba(148,163,184,0.4)]",
    },
    {
        title: "Growth",
        price: "₹14,999",
        tagline: "Ideal for growing brands & small businesses",
        features: [
            "12 Social Media Posts (mix of static, carousel, motion)",
            "5 Short Reels / Shorts (up to 45 sec)",
            "2 Long Video Edits (up to 8 min each)",
            "Photo Retouching (10 photos)",
            "Priority Turnaround (2-3 days)",
            "Monthly Content Strategy Guidance",
            "WhatsApp + Email Support",
        ],
        popular: true,
        primary: "from-blue-500 to-cyan-400",
        accent: "text-blue-400",
        border: "border-blue-400/40",
        hoverGlow: "hover:shadow-[0_16px_28px_-8px_rgba(59,130,246,0.6)]",
    },
    {
        title: "Premium",
        price: "₹29,999",
        tagline: "For established businesses & creators",
        features: [
            "20 Social Media Posts (advanced design, animations, carousels)",
            "8 Short Reels / Shorts (up to 60 sec)",
            "4 Long Video Edits (up to 10 min each)",
            "Photo Retouching (20 photos)",
            "Monthly Creative Consultation Call (1 hr)",
            "Priority Turnaround (1-2 days)",
            "Dedicated Support (WhatsApp + Call)",
            "Basic Motion Graphics in Videos",
        ],
        popular: false,
        primary: "from-purple-500 to-pink-500",
        accent: "text-pink-400",
        border: "border-pink-400/50",
        hoverGlow: "hover:shadow-[0_20px_35px_-8px_rgba(236,72,153,0.4)]",
    },
    {
        title: "Custom",
        price: "On Request",
        tagline: "Tailor-made for agencies & brands",
        features: [
            "Branding (Logo, Brand Guidelines)",
            "Custom Social Media Strategy",
            "Unlimited Post & Video Options",
            "On-demand Content Shoots",
            "Flexible Deliverables & Timeline",
            "Dedicated Account Manager",
        ],
        popular: false,
        primary: "from-orange-400 to-amber-700",
        accent: "text-orange-400",
        border: "border-orange-400/60",
        hoverGlow: "hover:shadow-[0_24px_40px_-8px_rgba(245,158,11,0.4)]",
    },
];

export const Testimonials: TestimonialProps[] = [
    {
        id: "1",
        name: "Anna Foster",
        role: "Project Lead",
        company: "AgileWorks",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
        rating: 5,
        content:
            "Their team managed our multi-platform campaign with precision and creativity. The content was consistent, high-quality, and drove real engagement across all channels.",
    },
    {
        id: "2",
        name: "Marcus Rodriguez",
        role: "Creative Lead",
        company: "InnovateLab",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 3,
        content:
            "From concept to execution, their creative direction elevated our campaign. The video content and visuals were stunning and performed exceptionally across all platforms.",
    },
    {
        id: "3",
        name: "Emily Watson",
        role: "Brand Strategist",
        company: "CreativeStudio",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        rating: 5,
        content:
            "They transformed our outdated brand into something fresh, modern, and impactful. The rebranding process was smooth, collaborative, and delivered beyond expectations.",
    },
    {
        id: "4",
        name: "David Kim",
        role: "Founder",
        company: "NextGen Solutions",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        rating: 5,
        content:
            "As a startup launching into a competitive market, we needed standout media presence. Their social media campaigns and content strategy gave us instant visibility and credibility.",
    },
    {
        id: "5",
        name: "Lisa Thompson",
        role: "Operations Director",
        company: "Global Dynamics",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        rating: 5,
        content:
            "Their end-to-end production services saved us time and resources. From scripting to final edits, everything was handled professionally and on schedule every single time.",
    },
    {
        id: "6",
        name: "Alex Johnson",
        role: "Campaign Manager",
        company: "BrandForce",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        rating: 5,
        content:
            "The ROI on our digital ad campaigns skyrocketed after they took over creative production. Their eye for detail and data-driven creative approach made all the difference.",
    },
    {
        id: "7",
        name: "Rachel Green",
        role: "Creative Director",
        company: "DesignMakers",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
        rating: 5,
        content:
            "Working with them felt like an extension of our own team. Their storytelling, visuals, and motion graphics brought our ideas to life in ways we hadn’t imagined.",
    },
    {
        id: "8",
        name: "James Wilson",
        role: "CTO",
        company: "TechVision",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5",
        rating: 5,
        content:
            "We needed tech-focused content that wasn’t dry or overly complex. They created engaging explainer videos and social content that made our innovations accessible and exciting.",
    },
    {
        id: "9",
        name: "Marcus Rodriguez",
        role: "Creative Lead",
        company: "InnovateLab",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 5,
        content:
            "From concept to execution, their creative direction elevated our campaign. The video content and visuals were stunning and performed exceptionally across all platforms.",
    },
    {
        id: "10",
        name: "Emily Watson",
        role: "Brand Strategist",
        company: "CreativeStudio",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        rating: 5,
        content:
            "They transformed our outdated brand into something fresh, modern, and impactful. The rebranding process was smooth, collaborative, and delivered beyond expectations.",
    },
];

export const VideoTestimonials: VideoTestimonialProps[] = [
    {
        id: "v1",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Client Story - AgileWorks",
    },
    {
        id: "v2",
        videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        title: "Case Study - NextGen Solutions",
    },
    {
        id: "v3",
        videoUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
        title: "Success Journey - TechVision",
    },
];

export const GalleryItems: GalleryItem[] = [
    {
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        heading: "Creativity",
        subheading: "Full creative & production team.",
    },
    {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        heading: "Expertise",
        subheading: "Complete solutions in every service category.",
    },
    {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        heading: "Availability",
        subheading: "24/7 availability and support.",
    },
    {
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        heading: "Speed",
        subheading: "Fast delivery without compromising quality.",
    },
    {
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        heading: "Professionalism",
        subheading: "Clear, professional communication.",
    },
    {
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        heading: "Experience",
        subheading: "Experience across multiple industries and countries.",
    },
];

export const AgencyServices: AgencyServicesProps[] = [
    {
        icon: FaCamera,
        label: "Photography",
        service: "Photography",
        color: "#828DED",
    },
    {
        icon: FaPlay,
        label: "Video Production",
        service: "Video-Production",
        color: "#5E6CE8",
    },
    {
        icon: FaPalette,
        label: "Brand Design",
        service: "Brand-Design",
        color: "#293BE0",
    },
    {
        icon: FaCode,
        label: "Web Development",
        service: "Web-Development",
        color: "#1929B3",
    },
    {
        icon: FaEdit,
        label: "Video Editing",
        service: "Video-Editing",
        color: "#121D7D",
    },
    {
        icon: FaFilm,
        label: "CGI & VFX",
        service: "CGI-VFX",
        color: "#0A1045",
    },
];

export const FAQs: { q: string; a: string }[] = [
    {
        q: "How can I book your services?",
        a: "Booking is flexible! You can reach us through WhatsApp, Instagram, LinkedIn, Twitter, Telegram, Email, Phone, or directly on our Website.",
    },
    {
        q: "Do you work outside Kolkata?",
        a: "Absolutely. We provide services across India and internationally.",
    },
    {
        q: "Do you collaborate with influencers?",
        a: "Yes, we work with influencers, creators, and public figures to produce engaging and professional content.",
    },
    {
        q: "Can you handle both small and large projects?",
        a: "100%. From a personal photoshoot to a full-scale brand campaign, every project gets the same dedication.",
    },
    {
        q: "Do you provide customized packages?",
        a: "Yes. Every project is unique, and we create packages based on your goals, vision, and budget.",
    },
    {
        q: "Do you provide remote/online services?",
        a: "Yes, for services like design, branding, editing, marketing & strategy — we collaborate online with clients worldwide.",
    },
    {
        q: "What makes Amiyo Creative different from others?",
        a: "Our all-in-one approach. Instead of hiring separate teams for film, design, web, and marketing — we provide it all under one roof, ensuring consistency and quality.",
    },
    {
        q: "Do you offer long-term partnerships?",
        a: "Yes, we work on both one-time projects and long-term retainers with brands, agencies, and influencers.",
    },
];

export const mockProjects: Project[] = [
    {
        _id: "1",
        title: "Ethereal Wedding Film",
        category: "Video-Production",
        coverImage:
            "https://images.unsplash.com/photo-1519741497674-611481863552",
        projectUrl: "https://etherealweddingfilm.com",
        tags: ["Wedding", "Drone", "Cinematic"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "2",
        title: "Tech Startup Branding",
        category: "Brand-Design",
        coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
        projectUrl: "https://techstartup.com",
        tags: ["Logo", "Brand", "Startup"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "3",
        title: "Fashion Editorial Shoot",
        category: "Video-Editing",
        coverImage:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
        projectUrl: "https://luxefashion.com",
        tags: ["Editorial", "Fashion", "Studio"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "4",
        title: "Brand Commercial VFX",
        category: "CGI-VFX",
        coverImage:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728",
        projectUrl: "https://autopremium.com",
        tags: ["VFX", "Commercial"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "5",
        title: "E-commerce Platform",
        category: "Web-Development",
        coverImage:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        projectUrl: "https://shopease.example.com",
        tags: ["E-commerce", "UX/UI", "React"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "6",
        title: "Product Photography Series",
        category: "Photography",
        coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        projectUrl: "https://skincarepremium.com",
        tags: ["Product", "Commercial"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "7",
        title: "Music Video Production",
        category: "Video-Production",
        coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        projectUrl: "https://musicvideo.example.com",
        tags: ["Video", "Creative", "Narrative"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "8",
        title: "Restaurant Branding Suite",
        category: "Brand-Design",
        coverImage:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
        projectUrl: "https://gourmetbistro.com",
        tags: ["Restaurant", "Menu", "Signage"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        _id: "9",
        title: "Motion Graphics Explainer",
        category: "Video-Editing",
        coverImage:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
        projectUrl: "https://explainervideo.example.com",
        tags: ["Graphics", "Animation", "Explainer"],
        coverImagePublicId: "",
        createdAt: "",
        updatedAt: "",
    },
];
