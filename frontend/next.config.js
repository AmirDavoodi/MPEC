/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow CSS imports
  webpack: (config) => {
    return config;
  },
  allowedDevOrigins: ['*', '10.10.14.24'],
}

module.exports = nextConfig
