import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "personal-editorial-blog";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProduction ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
