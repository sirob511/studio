import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ['custom-websites', 'interactive-web-experiences', 'web-applications'].map(slug => ({
      source: `/services/${slug}`,
      destination: `/services#${slug}`,
      permanent: true,
    }));
  },
  async headers() {
    return [{source:'/:path*',headers:[{key:'Referrer-Policy',value:'strict-origin'}]}];
  },
};

export default nextConfig;
