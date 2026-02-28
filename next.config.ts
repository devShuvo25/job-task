import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This wildcard allows all HTTPS sources
      },
      {
        protocol: 'http',
        hostname: '**', // This allows all HTTP sources (optional)
      },
    ],
  },
};

export default nextConfig;