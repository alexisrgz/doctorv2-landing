import { ChevronLeft, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/accordion";
import { JsonLd } from "@/components/json-ld";
import { CheckList } from "@/components/lists";
import { Photo } from "@/components/photo";
import { Section } from "@/components/section";
import { ServiceBooking } from "@/components/service-booking";
import { ServiceCard } from "@/components/service-card";
import { SERVICE_ICONS } from "@/components/service-icon";
import { actions, labels } from "@/data/pages/common";
import { serviceDetailPage } from "@/data/pages/services";
import { getDurationRange, getRelatedServices, getService, getStartingPrice, services } from "@/data/services";
import { formatDuration, formatPrice } from "@/lib/format";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const from = service.variants.length > 1 ? `${labels.from} ` : "";
  return pageMetadata({
    title: service.name,
    description: `${service.summary} ${formatDuration(service.durationMin)}, ${from}${formatPrice(getStartingPrice(service))}.`,
    path: `/servicios/${service.slug}`,
  });
}

const sectionTitle = "font-display text-[26px] leading-tight font-bold tracking-[-0.02em] lg:text-[30px]";

export default async function ServiceDetailPage({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const copy = serviceDetailPage.sections;
  const { min, max } = getDurationRange(service);
  const multiple = service.variants.length > 1;
  const related = getRelatedServices(service);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: serviceDetailPage.breadcrumbParent, path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ])}
      />

      <section data-hero aria-labelledby="servicio-titulo" className="pt-3 pb-12 lg:pt-10 lg:pb-20">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <nav aria-label="Migas de pan">
              <Link href="/servicios" className="link -ml-1 inline-flex min-h-12 items-center gap-1 px-1 text-meta font-bold">
                <ChevronLeft aria-hidden="true" className="size-5" />
                {serviceDetailPage.breadcrumbParent}
              </Link>
            </nav>
            <h1 id="servicio-titulo" className="mt-2 text-h1">
              {service.name}
            </h1>
            <p className="mt-4 max-w-[48ch] text-lead text-slate">{service.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Resumen">
              <li className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-mist px-3.5 text-meta font-bold">
                <Clock aria-hidden="true" className="size-5" />
                <span className="sr-only">{labels.duration}: </span>
                {formatDuration(min, max)}
              </li>
              <li className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-mist px-3.5 text-meta font-bold">
                <Tag aria-hidden="true" className="size-5" />
                <span className="sr-only">{labels.price}: </span>
                {multiple ? `${labels.from} ` : ""}
                {formatPrice(getStartingPrice(service))}
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <Photo
              name={service.photo.name}
              alt={service.photo.alt}
              focal={service.photo.focal}
              icon={SERVICE_ICONS[service.icon]}
              shape="signature"
              ratio="4:3"
              priority
              sizes="(min-width: 1200px) 580px, (min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 lg:pb-24">
        <div className="flex flex-col gap-12 lg:col-span-7 lg:row-start-1">
          <section aria-labelledby="incluye-titulo">
            <h2 id="incluye-titulo" className={sectionTitle}>
              {copy.includes}
            </h2>
            <CheckList items={service.includes} className="mt-5" />
          </section>
          <section aria-labelledby="para-quien-titulo">
            <h2 id="para-quien-titulo" className={sectionTitle}>
              {copy.forWhom}
            </h2>
            <CheckList items={service.forWhom} className="mt-5" />
          </section>
          <section aria-labelledby="como-titulo">
            <h2 id="como-titulo" className={sectionTitle}>
              {copy.howItWorks}
            </h2>
            <p className="mt-4 max-w-[65ch]">{service.howItWorks}</p>
          </section>
        </div>

        <aside aria-label={copy.price} className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <ServiceBooking
              slug={service.slug}
              name={service.name}
              shortName={service.shortName}
              variants={service.variants}
              priceNote={service.priceNote}
            />
          </div>
        </aside>

        <section aria-labelledby="faq-servicio-titulo" className="lg:col-span-7 lg:row-start-2">
          <h2 id="faq-servicio-titulo" className={sectionTitle}>
            {copy.faqs}
          </h2>
          <Accordion items={service.faqs} className="mt-5" />
        </section>
      </div>

      <Section tone="mist" roundedTop labelledBy="relacionados-titulo">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="relacionados-titulo" className="text-h2">
              {copy.related}
            </h2>
            <Link href="/servicios" className="link mt-4 inline-flex min-h-12 items-center font-bold">
              {actions.allServices}
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
            {related.map((item) => (
              <li key={item.slug}>
                <ServiceCard service={item} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
