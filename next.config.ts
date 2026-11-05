import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // Robust file-watching polling for Windows / OneDrive environments:
      // Ensures code edits immediately trigger Fast Refresh in the browser without server restarts.
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 200,
      };
    }
    return config;
  },
};

export default nextConfig;
