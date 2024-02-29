/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
      },
      {
        hostname: "ckthhpmgcnugotxhowns.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
