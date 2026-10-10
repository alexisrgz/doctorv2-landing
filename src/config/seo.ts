import { site } from "./site";

export const seo = {
  /** Plantilla de títulos de página. */
  titleTemplate: `%s | ${site.name}, ${site.descriptor.toLowerCase()} en ${site.address.city}`,
  defaultTitle: `${site.name} | ${site.descriptor} en ${site.address.city}`,
  defaultDescription:
    "Consulta de medicina general, seguimiento familiar y chequeos preventivos en Mazatlán. Agenda por WhatsApp.",
  keywords: [
    "médico general Mazatlán",
    "consulta médica Mazatlán",
    "chequeo preventivo",
    "certificado médico",
    "seguimiento de hipertensión y diabetes",
  ],
  ogImageSize: { width: 1200, height: 630 },
} as const;
