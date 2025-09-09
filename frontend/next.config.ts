import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL(
                "https://hospitable-dawn-d2a92862c5.media.strapiapp.com/**"
            ),
            new URL("https://upload.wikimedia.org/**"),
            new URL("https://**.unsplash.com/**"),
            new URL("https://picsum.photos/**"),
            new URL("https://amiyo-creative.s3.ap-south-1.amazonaws.com/**"),
        ],
    },
};

export default nextConfig;
