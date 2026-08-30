import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://gsm-sidi-moumen.ma", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://gsm-sidi-moumen.ma/confirmation", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
