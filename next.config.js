/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sanity image CDN will go here when CMS is wired up
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

module.exports = nextConfig;
