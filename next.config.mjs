/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
		],
	},
	experimental: {
		serverComponentsExternalPackages: ['@node-rs/argon2'],
	},
};

export default nextConfig;
