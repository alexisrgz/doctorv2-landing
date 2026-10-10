/**
 * Datos estructurados (schema.org) generados desde config y data.
 * Se usa Service (no MedicalProcedure) porque lo que se ofrece son consultas, no procedimientos.
 */
import { site } from "@/config/site";
import { seo } from "@/config/seo";
import { doctor } from "@/data/doctor";
import { dayNames, weekDisplayOrder, weeklyHours, type DayIndex } from "@/data/hours";
import type { Faq } from "@/data/faqs";
import { services, getStartingPrice, type Service } from "@/data/services";
import { getMapsHref } from "./contact";

type JsonLd = Record<string, unknown>;

const SCHEMA_DAYS: Record<DayIndex, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.url}/`).toString();
}

const physicianId = absoluteUrl("/#consultorio");

function postalAddress(): JsonLd {
  return {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

function openingHoursSpecification(): JsonLd[] {
  return weekDisplayOrder.flatMap((day) =>
    weeklyHours[day].map((range) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[day]}`,
      opens: range.open,
      closes: range.close,
      name: dayNames[day],
    })),
  );
}

function priceRange(): string {
  const prices = services.flatMap((service) => service.variants.map((variant) => variant.price));
  return `$${Math.min(...prices)} - $${Math.max(...prices)} ${site.currency}`;
}

/** Physician: consultorio individual (en schema.org, Physician es un MedicalBusiness). */
export function physicianJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": physicianId,
    name: site.doctor.fullName,
    alternateName: site.name,
    description: seo.defaultDescription,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    telephone: site.phone.e164,
    address: postalAddress(),
    hasMap: getMapsHref(),
    medicalSpecialty: "https://schema.org/PrimaryCare",
    isAcceptingNewPatients: true,
    priceRange: priceRange(),
    currenciesAccepted: site.currency,
    openingHoursSpecification: openingHoursSpecification(),
    availableService: services.map((service) => ({
      "@type": "Service",
      name: service.name,
      url: absoluteUrl(`/servicios/${service.slug}`),
    })),
    employee: {
      "@type": "Person",
      name: site.doctor.fullName,
      jobTitle: doctor.role,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: doctor.license.label,
        identifier: doctor.license.number,
      },
    },
  };
}

export function serviceJsonLd(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    url: absoluteUrl(`/servicios/${service.slug}`),
    areaServed: { "@type": "City", name: site.address.city },
    provider: {
      "@type": "Physician",
      "@id": physicianId,
      name: site.doctor.fullName,
      telephone: site.phone.e164,
      address: postalAddress(),
    },
    offers: service.variants.map((variant) => ({
      "@type": "Offer",
      name: variant.label,
      price: variant.price,
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
    })),
    priceRange: `$${getStartingPrice(service)}`,
  };
}

export function faqPageJsonLd(faqs: readonly Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: readonly Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
