/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com'],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
