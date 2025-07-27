/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dawexksmkjeubjhgchjt.supabase.co",
        pathname: "/storage/v1/object/public/celebrity-images/**",
      },
    ],
  },
};

export default nextConfig;
