/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  experimental: {
    // Must be an object, not a boolean
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
  },

  reactStrictMode: true,
  trailingSlash: false,

  webpack: (config) => {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
        vendors: false,
      },
    };
    return config;
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io", pathname: "/**" },
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
