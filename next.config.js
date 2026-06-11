/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  turbopack: {},
  allowedDevOrigins: ['192.168.1.9'],
};

module.exports = nextConfig;
