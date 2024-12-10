/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});
// https://pksfdigital.blob.core.windows.net/pksfdigital/uploads/
module.exports = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pksfdigital.blob.core.windows.net',
        port: '',
        pathname: '/pksfdigital/uploads/**',
      },
    ],
  },
};

module.exports = {
  output: 'standalone',
};

module.exports = withPWA({
  reactStrictMode: true,
  i18n,
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});
