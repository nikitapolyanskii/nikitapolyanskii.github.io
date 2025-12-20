import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Uncomment if deploying to a subdirectory
  // basePath: "",
};

export default nextConfig;
