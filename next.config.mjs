/** @type {import('next').NextConfig} */
const nextConfig = {
	// Prevent huge static directories from being bundled into serverless functions on Vercel
	outputFileTracingExcludes: {
		"*": [
			"./public/assets/**/*",
			"./public/applications/**/*"
		],
	},
};

export default nextConfig;
