import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js packages if needed
  transpilePackages: ["three"],
  devIndicators: false,
};

export default nextConfig;
