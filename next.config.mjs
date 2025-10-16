/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Keep your custom Webpack optimization
  webpack: (config) => {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
        vendors: false,
      },
    };
    return config;
  },

  // ✅ Remote image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // ✅ Disable lint warnings in production (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
