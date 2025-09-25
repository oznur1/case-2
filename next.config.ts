import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure correct workspace root in OneDrive environment
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

export default nextConfig;
