import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['gerador-visionbord.s3.sa-east-1.amazonaws.com'],
    unoptimized: true // se estiver usando next/image
  },
};

export default nextConfig;
