import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isse Next.js natively Tailwind v4 (Alpha/Beta) ko handle karta hai
  experimental: {
    // Agar Next.js version 15 hai toh ye natively work karega
  }
};

export default nextConfig;
