import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-content";

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildMetadata({ title, description, path, keywords }: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
