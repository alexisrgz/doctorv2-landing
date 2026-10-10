import { Accessibility, Car, CreditCard } from "lucide-react";
import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { ClosingCta } from "@/components/closing-cta";
import { EmergencyNotice } from "@/components/emergency-notice";
import { HoursTable } from "@/components/hours-table";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-bar";
import { LocationCard } from "@/components/location-card";
import { OpenStatus } from "@/components/open-status";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { Section, SectionHeader } from "@/components/section";
import { SnapRow } from "@/components/snap-row";
import { buttonClasses } from "@/components/ui/button-styles";
import { actions } from "@/data/pages/common";
import { locationPage } from "@/data/pages/misc";
import { photos } from "@/data/photos";
import { practice } from "@/data/practice";
import { breadcrumbJsonLd, physicianJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...locationPage.meta, path: "/ubicacion" });

const entrancePhotos = [photos.officeEntrance, photos.officeWaiting];

export default function LocationPage() {
  const copy = locationPage.sections;
  const { parking, accessibility, payments } = practice;

  return (
    <>
      <JsonLd data={physicianJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: locationPage.title, path: "/ubicacion" },
        ])}
      />
      <PageHeader
        title={locationPage.title}
        intro={locationPage.intro}
        layout="balanced"
        actions={
          <BookingLink source="ubicacion-encabezado" className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
            <WhatsAppIcon />
            {actions.whatsapp}
          </BookingLink>
        }
        aside={<LocationCard showPhone />}
      />

      <Section labelledBy="horario-titulo" className="border-t border-line">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="horario-titulo" className="text-h2">
              {copy.hours}
            </h2>
            <OpenStatus className="mt-4" data-testid="schedule-open-status" />
            <p className="mt-3 max-w-[44ch] text-slate">{copy.hoursNote}</p>
            <EmergencyNotice className="mt-8" />
          </div>
          <div className="rounded-soft border border-line p-2 sm:p-3 lg:col-span-6 lg:col-start-7">
            <HoursTable caption={copy.hours} />
          </div>
        </div>
      </Section>

      <Section tone="mist" roundedTop labelledBy="llegar-titulo">
        <h2 id="llegar-titulo" className="sr-only">
          {copy.contact}
        </h2>
        <ul className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <li className="rounded-soft bg-white p-6">
            <Car aria-hidden="true" className="size-6" />
            <h3 className="mt-3 text-h3">{parking.title}</h3>
            <p className="mt-2 text-slate">{parking.text}</p>
          </li>
          <li className="rounded-soft bg-white p-6">
            <Accessibility aria-hidden="true" className="size-6" />
            <h3 className="mt-3 text-h3">{accessibility.title}</h3>
            <ul className="mt-2 list-disc pl-5 text-slate">
              {accessibility.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
          <li className="rounded-soft bg-white p-6">
            <CreditCard aria-hidden="true" className="size-6" />
            <h3 className="mt-3 text-h3">{payments.title}</h3>
            <p className="mt-2 text-slate">{payments.methods.join(", ")}.</p>
            <p className="mt-2 text-slate">{payments.receipt}</p>
            <p className="mt-2 text-slate">{payments.insurance}</p>
          </li>
        </ul>
      </Section>

      <Section labelledBy="entrada-titulo">
        <SectionHeader id="entrada-titulo" title={copy.office} intro={copy.officeIntro} />
        <SnapRow label={copy.office} columns={2} focusable className="mt-8 lg:mt-12">
          {entrancePhotos.map((photo) => (
            <li key={photo.name}>
              <Photo {...photo} shape="soft" sizes="(min-width: 1024px) 570px, 82vw" />
            </li>
          ))}
        </SnapRow>
      </Section>

      <ClosingCta source="cierre-ubicacion" />
      <MobileActionBar source="barra-ubicacion" />
    </>
  );
}
