import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mantener la calidad normal del sitio y permitir mayor calidad en el Hero.
  images: {
    qualities: [75, 95],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
