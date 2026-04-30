import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    reactCompiler: true,
    cacheComponents: true,
    experimental:{
        turbopackFileSystemCacheForDev: true,
    },
};

export default nextConfig;
