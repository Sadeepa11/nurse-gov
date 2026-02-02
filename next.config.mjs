/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	// IMPORTANT: If deploying to a subdirectory (e.g. domain.com/subfolder), change '' to '/subfolder'
	basePath: '',
};

export default nextConfig;

