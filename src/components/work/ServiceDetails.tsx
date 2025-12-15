import React from "react";
import {
    FaCamera,
    FaFilm,
    FaEdit,
    FaPalette,
    FaCode,
    FaCube,
} from "react-icons/fa";

const ServiceDetails = () => {
    const services = [
        {
            icon: FaCamera,
            title: "Photography",
            points: [
                "Product photography",
                "Model & fashion shoots",
                "E-commerce catalog",
                "Lifestyle & outdoor",
                "Food & restaurant",
                "Interior & architecture",
                "Event coverage",
            ],
            footer: "All categories available.",
            color: "text-purple-400",
            borderColor: "border-purple-500/20",
            hoverBorder: "group-hover:border-purple-500/50",
        },
        {
            icon: FaFilm,
            title: "Video Production",
            points: [
                "Brand films",
                "Commercials",
                "Product videos",
                "Interviews",
                "Documentaries",
                "Events",
                "Weddings",
                "Music & fashion visuals",
            ],
            footer: "Complete pre-production → production → post-production support.",
            color: "text-blue-400",
            borderColor: "border-blue-500/20",
            hoverBorder: "group-hover:border-blue-500/50",
        },
        {
            icon: FaEdit,
            title: "Video Editing",
            points: [
                "Reels & shorts",
                "YouTube content",
                "Commercial edits",
                "Corporate films",
                "Documentaries",
                "Wedding films",
                "Color grading",
                "VFX integration",
            ],
            footer: "We handle every editing style.",
            color: "text-cyan-400",
            borderColor: "border-cyan-500/20",
            hoverBorder: "group-hover:border-cyan-500/50",
        },
        {
            icon: FaPalette,
            title: "Brand Design",
            points: [
                "Logo design",
                "Brand identity development",
                "Packaging",
                "Marketing creatives",
                "Posters & banners",
                "Social media branding",
            ],
            footer: "Consistent and professional brand systems.",
            color: "text-pink-400",
            borderColor: "border-pink-500/20",
            hoverBorder: "group-hover:border-pink-500/50",
        },
        {
            icon: FaCode,
            title: "Web Development",
            points: [
                "Business websites",
                "Portfolio sites",
                "E-commerce stores",
                "Landing pages",
                "Custom UI/UX",
                "Responsive designs",
                "Fast, secure & SEO-ready",
            ],
            footer: "Complete design + development.",
            color: "text-indigo-400",
            borderColor: "border-indigo-500/20",
            hoverBorder: "group-hover:border-indigo-500/50",
        },
        {
            icon: FaCube,
            title: "CGI & VFX",
            points: [
                "3D product renders",
                "3D animations",
                "Motion graphics",
                "Advanced VFX shots",
                "Compositing",
                "Promotional visuals",
            ],
            footer: "From basic to cinematic-level output.",
            color: "text-orange-400",
            borderColor: "border-orange-500/20",
            hoverBorder: "group-hover:border-orange-500/50",
        },
    ];

    return (
        <div className="w-full relative z-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`group relative p-6 rounded-3xl bg-neutral-900/50 backdrop-blur-sm border ${service.borderColor} transition-all duration-300 ${service.hoverBorder} hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]`}>
                        <div className="flex items-center gap-4 mb-4">
                            <service.icon
                                className={`text-3xl 3xl:text-4xl ${service.color}`}
                            />
                            <h3 className="text-xl 3xl:text-3xl font-bold text-white">
                                {service.title}
                            </h3>
                        </div>

                        <ul className="space-y-2 mb-6 grid grid-cols-2">
                            {service.points.map((point, idx) => (
                                <li
                                    key={idx}
                                    className="group/item flex items-center gap-2 text-sm 3xl:text-xl text-gray-300">
                                    <span className="mt-2 block h-0.5 w-0 bg-cyan-400 transition-all duration-300 ease-in-out group-hover/item:w-2" />
                                    {point}
                                </li>
                            ))}
                        </ul>

                        <div
                            className={`pt-4 border-t ${service.borderColor} group-hover:border-opacity-50 transition-colors`}>
                            <p className="text-xs 3xl:text-xl font-medium text-gray-400 group-hover:text-gray-300 italic">
                                {service.footer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceDetails;
