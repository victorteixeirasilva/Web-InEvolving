import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['gerador-visionbord.s3.sa-east-1.amazonaws.com'],
    unoptimized: true // se estiver usando next/image
  },
};

// export default nextConfig;
export default withPWA(nextConfig);
