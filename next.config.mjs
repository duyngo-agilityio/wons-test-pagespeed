/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.imgbb.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`;

const nextConfig = {
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['react-hook-form'],
  },
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [480, 1920],
    imageSizes: [40, 128],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=86400; includeSubDomains;',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
