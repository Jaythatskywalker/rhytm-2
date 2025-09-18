import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['www.soundhelix.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
