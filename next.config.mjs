import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    loader: 'custom',
    loaderFile: './app/loader.js',
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
