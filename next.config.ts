import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/classes',
        permanent: true, // or false depending on whether this is permanent
      },
    ];
  },
};

export default nextConfig;
