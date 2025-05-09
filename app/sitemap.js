export default function sitemap() {
  return [
    {
      url: "https://apollo247-clone.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://apollo247-clone.vercel.app/specialties/general-physician-internal-medicine",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
