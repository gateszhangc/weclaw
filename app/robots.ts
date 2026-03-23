import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-content";
import { absoluteUrl } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: siteConfig.url,
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
