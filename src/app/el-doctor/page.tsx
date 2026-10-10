import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { ClosingCta } from "@/components/closing-cta";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-bar";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { Section, SectionHeader } from "@/components/section";
import { SnapRow } from "@/components/snap-row";
import { buttonClasses } from "@/components/ui/button-styles";
import { doctor } from "@/data/doctor";
import { actions } from "@/data/pages/common";
import { doctorPage } from "@/data/pages/doctor";
import { photos } from "@/data/photos";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...doctorPage.meta, path: "/el-doctor" });

const officePhotos = [photos.officeReception, photos.officeConsult, photos.officeDetail];

export default function DoctorPage() {
  const copy = doctorPage.sections;
  const [degree] = doctor.education;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: doctorPage.meta.title, path: "/el-doctor" },
        ])}
      />
      <PageHeader
        title={doctor.fullName}
        intro={doctorPage.lead}
        actions={
          <>
            <dl className="grid w-full gap-4 border-y border-line py-5 sm:grid-cols-2" data-testid="credentials">
              <div>
                <dt className="text-meta text-slate">{doctor.license.label}</dt>
                <dd className="mt-1 font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">
                  {doctor.license.number}
                </dd>
              </div>
              {degree ? (
                <div>
                  <dt className="text-meta text-slate">{copy.education}</dt>
                  <dd className="mt-1 font-bold">
                    {degree.title}
                    <span className="block font-normal text-slate">{degree.institution}</span>
                  </dd>
                </div>
              ) : null}
            </dl>
            <BookingLink source="doctor-encabezado" className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
              <WhatsAppIcon />
              {actions.book}
            </BookingLink>
          </>
        }
        aside={
          <Photo
            {...photos.doctorPortrait}
            shape="signature"
            priority
            sizes="(min-width: 1024px) 370px, 100vw"
            className="max-sm:aspect-square sm:max-w-[420px] lg:max-w-none"
          />
        }
      />

      <Section tone="white" labelledBy="trayectoria-titulo" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="trayectoria-titulo" className="text-h2">
              {copy.timeline}
            </h2>
            {doctor.bio.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[55ch]">
                {paragraph}
              </p>
            ))}
            <h3 className="mt-10 font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">{copy.education}</h3>
            <ul className="mt-4 flex flex-col gap-4">
              {doctor.education.map((item) => (
                <li key={item.title}>
                  <span className="block font-bold">{item.title}</span>
                  <span className="text-slate">
                    {item.institution}, {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ol className="border-l-2 border-line lg:col-span-6 lg:col-start-7" aria-label={copy.timeline}>
            {doctor.timeline.map((item) => (
              <li key={item.title} className="relative pb-8 pl-6 last:pb-0">
                <span aria-hidden="true" className="absolute top-2 -left-[7px] size-3 rounded-full bg-ink" />
                <p className="text-meta font-bold text-slate">{item.period}</p>
                <h3 className="mt-1 font-display text-[20px] leading-tight font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-1 max-w-[52ch]">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="sand" labelledBy="principios-titulo">
        <SectionHeader id="principios-titulo" title={copy.principles} intro={copy.principlesIntro} />
        <ul className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {doctor.principles.map((principle) => (
            <li key={principle.title} className="rounded-soft bg-white p-6">
              <h3 className="font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">{principle.title}</h3>
              <p className="mt-3 text-slate">{principle.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="consultorio-titulo">
        <SectionHeader id="consultorio-titulo" title={copy.office} intro={copy.officeIntro} />
        <SnapRow label={copy.office} columns={3} focusable className="mt-8 lg:mt-12">
          {officePhotos.map((photo) => (
            <li key={photo.name}>
              <Photo {...photo} shape="soft" sizes="(min-width: 1024px) 380px, 82vw" />
            </li>
          ))}
        </SnapRow>
      </Section>

      <ClosingCta source="cierre-doctor" />
      <MobileActionBar source="barra-doctor" />
    </>
  );
}
