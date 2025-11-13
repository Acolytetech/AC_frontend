import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "picsum.photos",
      "images.unsplash.com",
      "i.pinimg.com",
      "res.cloudinary.com", // ✅ Added Cloudinary domain
    ],
  },
};

export default nextConfig;
