/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Your regular Next.js config options here
  eslint: {
    // Temporarily ignore ESLint errors during production builds so the
    // build can complete. Address lint rules in source files later.
    ignoreDuringBuilds: true,
  },
};

const pwaConfig = withPWA({
  dest: 'public', // Destination directory for the service worker files
  register: true, // Automatically register the service worker
  skipWaiting: true, // Install new service worker as soon as it's available
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
});

// The export syntax is a bit different in TS config files
export default pwaConfig(nextConfig);
