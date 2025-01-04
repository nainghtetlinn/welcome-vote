import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gguxisgdpkihovayelnt.supabase.co',
        pathname: '/storage/v1/object/public/profile_pictures/**',
      },
    ],
  },
}

export default nextConfig
