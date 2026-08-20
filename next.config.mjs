/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Relative assets work both under /repository on GitHub Pages and at a custom-domain root.
  assetPrefix: './',
  images: { unoptimized: true },
};
export default nextConfig;
