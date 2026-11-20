import type { NextConfig } from "next";
import { projects } from './lib/projects';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...['custom-websites', 'interactive-web-experiences', 'web-applications'].map(slug => ({
        source: `/services/${slug}`,
        destination: `/services#${slug}`,
        permanent: true,
      })),
      ...projects.map(project => ({
        source: `/work/${project.slug}`,
        destination: `/work#${project.slug}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [{source:'/:path*',headers:[{key:'Referrer-Policy',value:'strict-origin'}]}];
  },
};

export default nextConfig;
