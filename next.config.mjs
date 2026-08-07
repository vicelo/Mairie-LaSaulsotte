/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.BASE_PATH || "",
  images: {
    // L'export statique n'embarque pas le serveur d'optimisation d'images.
    // Les photos sont donc redimensionnées et compressées en amont, à
    // l'ajout dans public/images/.
    unoptimized: true,
  },
};

export default nextConfig;
