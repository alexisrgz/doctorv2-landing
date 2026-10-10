import type { MetadataRoute } from "next";
import { footerNav, mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/jsonld";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdatedAt);
  const pages = [...mainNav, ...footerNav].map((item) => ({
    url: absoluteUrl(item.href),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const servicePages = services.map((service) => ({
    url: absoluteUrl(`/servicios/${service.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...servicePages];
}
