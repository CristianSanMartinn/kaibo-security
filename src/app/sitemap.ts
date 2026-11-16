import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { courses } from "@/features/landing/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable || !siteConfig.url) return [];
  return [
    {
      url: new URL("/", siteConfig.url).href,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/cursos", siteConfig.url).href,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...courses
      .filter((course) => course.indexable)
      .map((course) => ({
        url: new URL("/cursos/" + course.slug, siteConfig.url).href,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
