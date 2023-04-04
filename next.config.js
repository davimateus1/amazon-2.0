/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com'],
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
