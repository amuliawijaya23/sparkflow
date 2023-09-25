/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
  },
};

module.exports = nextConfig;
