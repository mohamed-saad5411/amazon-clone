import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      }
    ],
  },
  env: {
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  },
  experimental: {
    serverComponentsExternalPackages: ["@opentelemetry/api"],
  }
};

export default nextConfig;
