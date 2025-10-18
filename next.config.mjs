/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  experimental: {
    // Lower concurrency to reduce build memory use
    workerThreads: false,
    cpus: 1,
  },

  trailingSlash: false,

  webpack: (config) => {
    // Reduce bundle splitting to keep memory low
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
