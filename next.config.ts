import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['s3.bucket.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule?.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );
    return config;
  },
};

export default nextConfig;
