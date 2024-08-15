/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig = bundleAnalyzer({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'urugkonudzsrjlbvamip.supabase.co'
            }
        ]
    }
});

export default nextConfig;