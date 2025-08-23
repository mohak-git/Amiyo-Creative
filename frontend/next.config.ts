import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://creative-ball-1259652514.media.strapiapp.com/**"),
            new URL("https://upload.wikimedia.org/**"),
            new URL("https://images.unsplash.com/**"),
            new URL("https://picsum.photos/**"),
        ],
    },
};

export default nextConfig;
