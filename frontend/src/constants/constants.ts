import {
    PricingDataProps,
    ServicesCardProps,
    SocialPlatformProps,
    TestimonialProps,
    ValueItem,
} from "@/constants/types";

import {
    FaGlobe,
    FaInstagram,
    FaLinkedin,
    FaMailBulk,
    FaPhone,
    FaTelegram,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa";

export const NavItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const NavbarLeftPositionsMobile = [3, 95, 179, 263];
export const NavbarLeftPositionsDesktop = [14, 103, 187, 277];

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

export const HomeAboutValues: ValueItem[] = [
    { label: "Projects Completed", value: 250, suffix: "+" },
    { label: "Happy Clients", value: 150, suffix: "+" },
    { label: "Years Experience", value: 8, suffix: "" },
    { label: "Team Members", value: 25, suffix: "" },
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
        title: "Samsung",
        imageLink:
            "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
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
        title: "Films & Visual Content",
        description:
            "Cinematic storytelling with international quality standards.",
        services: [
            "Weddings",
            "Advertisements",
            "Events",
            "Music Videos",
            "Influencer Collaborations",
        ],
        tags: ["film", "cinematic", "visuals", "ads", "events"],
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5",
        cta: "Explore Films",
    },
    {
        title: "Photography Excellence",
        description:
            "Shoots designed to match brand and influencer aesthetics.",
        services: [
            "Editorial",
            "Lifestyle",
            "Fashion",
            "Product Photography",
            "Event Photography",
        ],
        tags: ["photography", "fashion", "brands", "events"],
        image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8",
        cta: "View Photography",
    },
    {
        title: "Creative Design & Branding",
        description:
            "Global-standard brand identities, campaigns, and digital design.",
        services: [
            "Brand Identity",
            "Logos",
            "Campaigns",
            "UI/UX Design",
            "Social Media Kits",
            "Graphic Assets",
        ],
        tags: ["design", "branding", "uiux", "identity"],
        image: "https://images.unsplash.com/photo-1621111848501-8d3634f82336",
        cta: "See Branding Work",
    },
    {
        title: "Post-Production Powerhouse",
        description: "Studio-grade editing, sound, and motion design.",
        services: [
            "Video Editing",
            "VFX & CGI",
            "Color Grading",
            "Motion Graphics",
            "Audio Mixing & Mastering",
            "Soundtracks & Podcasts",
        ],
        tags: ["editing", "postproduction", "audio", "motion"],
        image: "https://images.unsplash.com/photo-1516245834210-c4c142787335",
        cta: "Post-Production Services",
    },
    {
        title: "Web & Digital Strategy",
        description:
            "Clean, responsive websites and growth-driven digital marketing.",
        services: [
            "Custom Websites",
            "Responsive UI/UX",
            "SEO Optimization",
            "Ad Campaigns",
            "Influencer Partnerships",
            "Growth Analytics",
        ],
        tags: ["web", "digital", "seo", "growth"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        cta: "Build Digital Strategy",
    },
    {
        title: "Social Media & Influencer Marketing",
        description:
            "Daily content, reels, influencer tie-ups, and growth campaigns.",
        services: [
            "Content Creation",
            "Reels & Shorts",
            "Influencer Collaborations",
            "Instagram Growth",
            "YouTube Campaigns",
            "Facebook & LinkedIn Ads",
            "Twitter/X Marketing",
        ],
        tags: ["social", "influencers", "marketing", "growth"],
        image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
        cta: "Grow Your Socials",
    },
];

export const SocialPlatforms: SocialPlatformProps[] = [
    {
        name: "Email",
        icon: FaMailBulk,
        bgColor: "bg-gray-500/10",
        borderColor: "border-gray-400/30",
        textColor: "text-gray-300",
        url: "mailto:hello@digicraft.one",
        target: "_self",
    },
    {
        name: "Phone",
        icon: FaPhone,
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/30",
        textColor: "text-teal-300",
        url: "tel:+918299797516",
        target: "_self",
    },
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textColor: "text-green-300",
        url: "https://wa.me/+918299797516",
        target: "_blank",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
        textColor: "text-pink-300",
        url: "https://www.instagram.com/digicraft_technologies/",
        target: "_blank",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-300",
        url: "https://www.linkedin.com/company/digicraft-one/",
        target: "_blank",
    },
    {
        name: "Twitter",
        icon: FaTwitter,
        bgColor: "bg-sky-500/10",
        borderColor: "border-sky-500/30",
        textColor: "text-sky-300",
        url: "https://twitter.com/digicrafttechnologies",
        target: "_blank",
    },
    {
        name: "Telegram",
        icon: FaTelegram,
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        textColor: "text-cyan-300",
        url: "https://t.me/digicrafttechnologies",
        target: "_blank",
    },
    {
        name: "Website",
        icon: FaGlobe,
        bgColor: "bg-purple-600/10",
        borderColor: "border-purple-600/30",
        textColor: "text-purple-300",
        url: "https://www.digicraft.one/",
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
        primary: "from-amber-400 to-yellow-300",
        accent: "text-amber-400",
        border: "border-amber-400/60",
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
