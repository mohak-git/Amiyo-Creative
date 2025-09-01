import {
    AgencyServicesProps,
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
    FaGlobe,
    FaInstagram,
    FaLinkedin,
    FaMailBulk,
    FaPalette,
    FaPhone,
    FaPlay,
    FaTelegram,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const NavItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const NavbarLeftPositionsMobile = [3, 95, 179, 263];
export const NavbarLeftPositionsDesktop = [14, 110, 198, 295];

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
        borderColor: "border-gray-400/30",
        textColor: "text-gray-300",
        url: "mailto:hello@digicraft.one",
        target: "_self",
    },
    {
        name: "Phone",
        icon: FaPhone,
        borderColor: "border-gray-500/30",
        textColor: "text-gray-300",
        url: "tel:+918299797516",
        target: "_self",
    },
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        borderColor: "border-green-500/30",
        textColor: "text-green-400",
        url: "https://wa.me/+918299797516",
        target: "_blank",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        borderColor: "border-pink-500/30",
        textColor: "text-pink-400",
        url: "https://www.instagram.com/digicraft_technologies/",
        target: "_blank",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        url: "https://www.linkedin.com/company/digicraft-one/",
        target: "_blank",
    },
    {
        name: "X",
        icon: FaXTwitter,
        borderColor: "border-white/30",
        textColor: "text-white",
        url: "https://twitter.com/digicrafttechnologies",
        target: "_blank",
    },
    {
        name: "Telegram",
        icon: FaTelegram,
        borderColor: "border-cyan-500/30",
        textColor: "text-cyan-500",
        url: "https://t.me/digicrafttechnologies",
        target: "_blank",
    },
    {
        name: "Website",
        icon: FaGlobe,
        borderColor: "border-purple-600/30",
        textColor: "text-purple-400",
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
        subheading:
            "Fresh, unique, innovative ideas that don’t recycle the same Pinterest-board stuff.",
    },
    {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        heading: "Professionalism",
        subheading:
            "Clear, transparent communication and on-time delivery, every time.",
    },
    {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        heading: "Quality",
        subheading:
            "Industry-standard execution with zero shortcuts and no janky workarounds.",
    },
    {
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        heading: "Client Focus",
        subheading:
            "We co-create with you—your goals drive the roadmap, not our ego.",
    },
    {
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        heading: "Affordable Pricing",
        subheading:
            "Premium work without the premium bloat—packages that actually fit your budget.",
    },
];

export const mockProjects: Project[] = [
    {
        id: 1,
        documentId: "1",
        title: "Ethereal Wedding Film",
        slug: "ethereal-wedding-film",
        description:
            "Cinematic wedding storytelling with drone footage and intimate moments",
        category: "Cinematography & Videography",
        coverImage: {
            id: 1,
            documentId: "cover1",
            url: "https://images.unsplash.com/photo-1519741497674-611481863552",
        },
        technologies: ["Wedding", "Drone", "Cinematic"],
        clientName: "Private Client",
        completionDate: "2023-06-15",
        features: [
            {
                id: 1,
                title: "Drone Footage",
                description: "Aerial shots for cinematic effect",
            },
            {
                id: 2,
                title: "Storytelling",
                description: "Emotional narrative editing",
            },
        ],
    },
    {
        id: 2,
        documentId: "2",
        title: "Tech Startup Branding",
        slug: "tech-startup-branding",
        description: "Complete brand identity for innovative fintech company",
        category: "Photography",
        coverImage: {
            id: 2,
            documentId: "cover2",
            url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
        },
        technologies: ["Logo", "Brand", "Startup"],
        clientName: "InnovateFin",
        completionDate: "2023-09-20",
        features: [
            {
                id: 1,
                title: "Logo Design",
                description: "Modern and scalable logo",
            },
            {
                id: 2,
                title: "Brand Guidelines",
                description: "Comprehensive brand book",
            },
        ],
    },
    {
        id: 3,
        documentId: "3",
        title: "Fashion Editorial Shoot",
        slug: "fashion-editorial-shoot",
        description: "High-fashion editorial photography for luxury magazine",
        category: "Design & Branding",
        coverImage: {
            id: 3,
            documentId: "cover3",
            url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
        },
        technologies: ["Editorial", "Fashion", "Studio"],
        clientName: "Luxe Magazine",
        completionDate: "2023-11-10",
        features: [
            {
                id: 1,
                title: "Studio Lighting",
                description: "Professional lighting setup",
            },
            {
                id: 2,
                title: "Model Direction",
                description: "Expert posing and expression guidance",
            },
        ],
    },
    {
        id: 4,
        documentId: "4",
        title: "Brand Commercial VFX",
        slug: "brand-commercial-vfx",
        description:
            "Visual effects and color grading for premium automobile commercial",
        category: "Editing & Post-Production",
        coverImage: {
            id: 4,
            documentId: "cover4",
            url: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
        },
        technologies: ["VFX", "Commercial"],
        clientName: "AutoPremium",
        completionDate: "2024-01-30",
        features: [
            {
                id: 1,
                title: "3D Effects",
                description: "Custom 3D animations",
            },
            {
                id: 2,
                title: "Color Grading",
                description: "Cinematic color palette",
            },
        ],
    },
    {
        id: 5,
        documentId: "5",
        title: "E-commerce Platform",
        slug: "e-commerce-platform",
        description: "Modern e-commerce website with seamless user experience",
        category: "Web & Digital Projects",
        coverImage: {
            id: 5,
            documentId: "cover5",
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        },
        technologies: ["E-commerce", "UX/UI", "React"],
        clientName: "ShopEase",
        completionDate: "2024-03-15",
        projectUrl: "https://shopease.example.com",
        features: [
            {
                id: 1,
                title: "Responsive Design",
                description: "Mobile-first approach",
            },
            {
                id: 2,
                title: "Checkout Flow",
                description: "Optimized for conversions",
            },
        ],
    },
    {
        id: 6,
        documentId: "6",
        title: "Product Photography Series",
        slug: "product-photography-series",
        description:
            "Minimalist product photography for premium skincare brand",
        category: "Cinematography & Videography",
        coverImage: {
            id: 6,
            documentId: "cover6",
            url: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        },
        technologies: ["Product", "Commercial"],
        clientName: "GlowSkin",
        completionDate: "2024-05-22",
        features: [
            {
                id: 1,
                title: "Lighting Setup",
                description: "Softbox and reflector use",
            },
            {
                id: 2,
                title: "Retouching",
                description: "High-end post-processing",
            },
        ],
    },
    {
        id: 7,
        documentId: "7",
        title: "Music Video Production",
        slug: "music-video-production",
        description:
            "Creative music video with artistic visuals and storytelling",
        category: "Cinematography & Videography",
        coverImage: {
            id: 7,
            documentId: "cover7",
            url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        },
        technologies: ["Video", "Creative", "Narrative"],
        clientName: "SoundWave Records",
        completionDate: "2024-07-05",
        features: [
            {
                id: 1,
                title: "Storyboard",
                description: "Detailed scene planning",
            },
            {
                id: 2,
                title: "Cinematography",
                description: "Dynamic camera movements",
            },
        ],
    },
    {
        id: 8,
        documentId: "8",
        title: "Restaurant Branding Suite",
        slug: "restaurant-branding-suite",
        description: "Complete brand package including menu design and signage",
        category: "Cinematography & Videography",
        coverImage: {
            id: 8,
            documentId: "cover8",
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
        },
        technologies: ["Restaurant", "Menu", "Signage"],
        clientName: "Gourmet Bistro",
        completionDate: "2024-08-18",
        features: [
            {
                id: 1,
                title: "Menu Design",
                description: "Custom typography and layout",
            },
            {
                id: 2,
                title: "Signage",
                description: "Exterior and interior branding",
            },
        ],
    },
    {
        id: 8,
        documentId: "8",
        title: "Restaurant Branding Suite",
        slug: "restaurant-branding-suite",
        description: "Complete brand package including menu design and signage",
        category: "Cinematography & Videography",
        coverImage: {
            id: 8,
            documentId: "cover8",
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
        },
        technologies: ["Restaurant", "Menu Design", "Signage"],
        clientName: "Gourmet Bistro",
        completionDate: "2024-08-18",
        features: [
            {
                id: 1,
                title: "Menu Design",
                description: "Custom typography and layout",
            },
            {
                id: 2,
                title: "Signage",
                description: "Exterior and interior branding",
            },
        ],
    },
    {
        id: 9,
        documentId: "9",
        title: "Motion Graphics Explainer",
        slug: "motion-graphics-explainer",
        description: "Animated explainer video with custom motion graphics",
        category: "Photography",
        coverImage: {
            id: 9,
            documentId: "cover9",
            url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
        },
        technologies: ["Graphics", "Animation", "Explainer"],
        clientName: "EduTech",
        completionDate: "2024-08-25",
        features: [
            {
                id: 1,
                title: "Scriptwriting",
                description: "Engaging and clear narrative",
            },
            {
                id: 2,
                title: "Animation",
                description: "Frame-by-frame custom graphics",
            },
        ],
    },
];

export const categories = [
    "Photography",
    "Design & Branding",
    "Web & Digital Projects",
    "Editing & Post-Production",
    "Cinematography & Videography",
];

export const categoryColors: Record<string, string> = {
    Photography: "#38b",
    "Design & Branding": "#818",
    "Web & Digital Projects": "#06b",
    "Editing & Post-Production": "#a78",
    "Cinematography & Videography": "#e87",
};

export const AgencyServices: AgencyServicesProps[] = [
    { icon: FaCamera, label: "Photography", angle: "rotate-0" },
    { icon: FaPlay, label: "Video Production", angle: "-rotate-0" },
    { icon: FaPalette, label: "Brand Design", angle: "rotate-0" },
    { icon: FaCode, label: "Web Development", angle: "-rotate-0" },
];
