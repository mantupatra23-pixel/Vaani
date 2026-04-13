/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Isse standalone server ko har jagah se access milta hai
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

export default nextConfig;
