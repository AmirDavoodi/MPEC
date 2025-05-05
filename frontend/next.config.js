/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Remove all CSS-related loaders
    config.module.rules = config.module.rules.filter(
      (rule) => !rule.test?.toString().includes('css') && !rule.test?.toString().includes('font')
    );
    return config;
  },
  // Allow cross-origin requests from specific IP addresses during development
  experimental: {
    allowedDevOrigins: ['10.10.14.24'],
  },
};

module.exports = nextConfig;