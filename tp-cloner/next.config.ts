import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/signin", destination: "/demo", permanent: false },
      { source: "/workspace", destination: "/demo", permanent: false },
      { source: "/newsletter", destination: "/", permanent: false },
      { source: "/newsletter/:slug", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
