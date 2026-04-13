import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Ye Render/Docker ke liye build size chota rakhta hai
};

export default nextConfig;
