/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: {
      allowedForwardedHosts: ["*", "localhost", "localhost:3000", "*:3000", "192.168.1.100"],
      allowedOrigins: [
        "*:3000",
        "localhost:3000",
        "http://localhost:3000",
        "192.168.1.100:3000",
        "http://192.168.1.100:3000",
      ],
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
