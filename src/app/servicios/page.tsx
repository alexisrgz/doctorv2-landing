import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { ClosingCta } from "@/components/closing-cta";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-bar";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { cardGridClasses, columnsFor, metaLayoutFor } from "@/components/card-grid";
import { ServiceCard } from "@/components/service-card";
import { buttonClasses } from "@/components/ui/button-styles";
import { actions } from "@/data/pages/common";
import { servicesPage } from "@/data/pages/services";
import { getServicesByGroup, serviceGroups } from "@/data/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...servicesPage.meta, path: "/servicios" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: servicesPage.title, path: "/servicios" },
        ])}
      />
      <PageHeader
        title={servicesPage.title}
        intro={servicesPage.intro}
        actions={
          <nav aria-label={servicesPage.jumpLabel} className="flex flex-wrap gap-3">
            {serviceGroups.map((group) => (
              <a key={group.id} href={`#${group.anchor}`} className={buttonClasses("secondary", "md")}>
                {group.title}
              </a>
            ))}
          </nav>
        }
        aside={
          <div className="rounded-soft bg-mist p-6">
            <h2 className="text-h3">{servicesPage.note.title}</h2>
            <p className="mt-3 text-slate">{servicesPage.note.text}</p>
            <BookingLink source="servicios-encabezado" className={buttonClasses("primary", "lg", "mt-6 w-full")}>
              <WhatsAppIcon />
              {actions.book}
            </BookingLink>
          </div>
        }
      />

      {serviceGroups.map((group, index) => {
        const titleId = `${group.anchor}-titulo`;
        const groupServices = getServicesByGroup(group.id);
        return (
          <Section
            key={group.id}
            id={group.anchor}
            tone={index % 2 === 0 ? "mist" : "white"}
            roundedTop={index === 0}
            labelledBy={titleId}
            className="scroll-mt-4 lg:scroll-mt-20"
          >
            <SectionHeader id={titleId} title={group.title} intro={group.description} />
            <ul
              data-testid="service-grid"
              className={`mt-8 grid gap-4 lg:mt-12 lg:gap-6 ${cardGridClasses(groupServices.length)}`}
            >
              {groupServices.map((service) => (
                <li key={service.slug}>
                  <ServiceCard
                    service={service}
                    metaLayout={metaLayoutFor(groupServices.length)}
                    sizes={`(min-width: 1024px) ${columnsFor(groupServices.length) === 4 ? 270 : 380}px, (min-width: 640px) 50vw, 100vw`}
                  />
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <ClosingCta source="cierre-servicios" />
      <MobileActionBar source="barra-servicios" />
    </>
  );
}
