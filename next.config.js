/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.picsum.photos"],
  },
};

module.exports = nextConfig;
