import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Standard configuration for Render stable deployment */
  reactStrictMode: true,
  
  // Standalone mode ko hata diya hai taaki standard 'npm run start' chale
  // Isse Tailwind aur static assets load hone mein koi issue nahi aayega
};

export default nextConfig;
