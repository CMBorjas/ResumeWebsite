/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/ResumeWebsite' : '',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
}

module.exports = nextConfig
