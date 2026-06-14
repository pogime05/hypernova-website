import type { MetadataRoute } from "next";

const BASE_URL = "https://hypernova-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Single-page site — the home page plus its in-page anchor sections.
  const anchors = ["services", "ai", "work", "process", "contact"];

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...anchors.map((id) => ({
      url: `${BASE_URL}/#${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
