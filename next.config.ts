import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tfuzimyrmupyqbxetspr.supabase.co',
      },
    ],
  },
};

export default nextConfig;
