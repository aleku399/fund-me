/** @type {import('next').NextConfig} */

const isNetlify = process.env.NETLIFY === "true";

const nextConfig = {
  output: isNetlify ? "export" : undefined,
  images: {
      unoptimized: true, // Disable Next.js image optimization for static export
  },
};

export default nextConfig;
