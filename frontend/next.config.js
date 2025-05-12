/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow CSS imports
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
