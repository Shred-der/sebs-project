/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true, // Add this line to enable experimental layers
    };
    return config;
  },
};
module.exports = nextConfig
