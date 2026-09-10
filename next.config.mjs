/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.75", "local://"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
