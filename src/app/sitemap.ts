import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable || !siteConfig.url) return [];
  return [
    {
      url: new URL("/", siteConfig.url).href,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
