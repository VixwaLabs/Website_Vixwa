import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/:path(sw\\.js|service-worker\\.js|worker\\.js|pwa-sw\\.js|OneSignalSDKWorker\\.js)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
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
