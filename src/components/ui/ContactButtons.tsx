"use client";

import { SocialPlatforms } from "@/constants/constants";
import { FC } from "react";

const ContactButtons: FC = () => {
    return (
        <div className="fixed bottom-18 right-2 z-50 flex flex-col gap-4 p-3 opacity-70 hover:opacity-100 transition">
            {SocialPlatforms.slice(0, 2).map((platform) => (
                <a
                    key={platform.name}
                    href={platform.url}
                    target={platform.target || "_self"}
                    rel={platform.target ? "noopener noreferrer" : undefined}
                    className={`inline-flex cursor-none cursor-target items-center gap-2 rounded-full border p-3 text-sm backdrop-blur transition-all duration-200 hover:scale-105 hover:border-opacity-50 ${platform.borderColor} ${platform.textColor}`}>
                    <platform.icon className="size-6 3xl:size-8" />
                </a>
            ))}
        </div>
    );
};

export default ContactButtons;
