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
  experimental: {
    // The slim manifest is read from disk at runtime rather than imported, so
    // file tracing can't discover it on its own.
    outputFileTracingIncludes: {
      '/api/get-full-profile': ['./manifest-data/**'],
    },
  },
};

module.exports = nextConfig;
