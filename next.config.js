/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unilagnews.com",
        pathname: "/wp-content/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/:path*",
        destination: "https://unilagnews.com/wp-content/:path*",
      },
    ];
  },
};

module.exports = nextConfig;