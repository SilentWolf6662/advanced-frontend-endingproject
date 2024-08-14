/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'urugkonudzsrjlbvamip.supabase.co'
			}
		]
	}
}

export default nextConfig
