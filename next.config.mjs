/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour le marché marocain (4G)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;

