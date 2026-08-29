import type { MetadataRoute } from "next";

const BASE_URL = "https://hypernova-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Five-page architecture — home carries top priority, the rest follow.
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
