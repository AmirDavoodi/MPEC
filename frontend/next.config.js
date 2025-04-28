/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Remove all CSS-related loaders
    config.module.rules = config.module.rules.filter(
      (rule) => !rule.test?.toString().includes('css') && !rule.test?.toString().includes('font')
    );
    return config;
  },
};

module.exports = nextConfig; 