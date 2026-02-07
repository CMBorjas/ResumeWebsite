/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  output: 'standalone',
  // basePath: '/ResumeWebsite',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
