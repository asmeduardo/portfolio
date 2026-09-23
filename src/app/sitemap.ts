import type { MetadataRoute } from "next";

import { portfolio } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: portfolio.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...portfolio.projects.map((project) => ({
      url: `${portfolio.siteUrl}/projetos/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
