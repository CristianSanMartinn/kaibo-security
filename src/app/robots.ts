import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteConfig.indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    ...(siteConfig.indexable && siteConfig.url
      ? { sitemap: new URL("/sitemap.xml", siteConfig.url).href }
      : {}),
  };
}
