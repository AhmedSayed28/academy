import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/ar", permanent: true },
      { source: "/courses", destination: "/ar/courses", permanent: true },
      { source: "/courses/:slug", destination: "/ar/courses/:slug", permanent: true },
      { source: "/tracks", destination: "/ar/tracks", permanent: true },
      { source: "/tracks/:slug", destination: "/ar/tracks/:slug", permanent: true },
      { source: "/instructors", destination: "/ar/instructors", permanent: true },
      { source: "/about", destination: "/ar/about", permanent: true },
      { source: "/contact", destination: "/ar/contact", permanent: true },
      { source: "/faq", destination: "/ar/faq", permanent: true },
      { source: "/register-interest", destination: "/ar/register-interest", permanent: true },
    ];
  },
};

export default nextConfig;
