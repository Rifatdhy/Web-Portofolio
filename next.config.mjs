/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
