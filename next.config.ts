import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Credly badge artwork used in components/Certifications.tsx
    remotePatterns: [{ protocol: "https", hostname: "images.credly.com", port: "", pathname: "/images/**", search: "" }],
  },
};

export default nextConfig;
