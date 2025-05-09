export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://apollo247-clone.vercel.app/sitemap.xml",
  };
}
