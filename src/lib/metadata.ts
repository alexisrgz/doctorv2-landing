import type { Metadata } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "./site-url";

type PageMetadataInput = {
  /** Título de la página; si falta, se usa el título por defecto del sitio. */
  title?: string;
  description: string;
  /** Ruta canónica, por ejemplo "/servicios". */
  path: string;
};

/** Metadata por página: title, description, canonical y Open Graph. La og:image sale de opengraph-image.tsx. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: site.locale.replace("-", "_"),
      siteName: site.name,
      url: absoluteUrl(path),
      ...(title ? { title } : {}),
      description,
    },
  };
}
