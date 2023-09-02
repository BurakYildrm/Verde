/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["react-daisyui"],
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
