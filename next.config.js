/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'uploadthing.com',
        'utfs.io',
        'img.clerk.com',
        'subdomain',

      ],
    },
    reactStrictMode: false,
  }
  
  module.exports = nextConfig