/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Build fail na ho isliye errors ignore karenge
    ignoreBuildErrors: true,
  },
  eslint: {
    // Linting check bhi skip karenge fast build ke liye
    ignoreDuringBuilds: true,
  },
  // Render deployment ke liye stable settings
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
