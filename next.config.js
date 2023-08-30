/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bungie.net',
        port: '',
        pathname: '/common/**',
      },
    ],
  },
};

module.exports = nextConfig;
