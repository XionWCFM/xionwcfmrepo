import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://d2f4hj0sh329cz.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
