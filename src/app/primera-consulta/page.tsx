import { Clock, CreditCard, Receipt, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { ClosingCta } from "@/components/closing-cta";
import { EmergencyNotice } from "@/components/emergency-notice";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { JsonLd } from "@/components/json-ld";
import { CheckList, StepList } from "@/components/lists";
import { MobileActionBar } from "@/components/mobile-bar";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { Section } from "@/components/section";
import { buttonClasses } from "@/components/ui/button-styles";
import { actions } from "@/data/pages/common";
import { firstVisitPage } from "@/data/pages/first-visit";
import { photos } from "@/data/photos";
import { practice } from "@/data/practice";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...firstVisitPage.meta, path: "/primera-consulta" });

const h2 = "text-h2";

export default function FirstVisitPage() {
  const { payments } = practice;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: firstVisitPage.title, path: "/primera-consulta" },
        ])}
      />
      <PageHeader
        title={firstVisitPage.title}
        intro={firstVisitPage.intro}
        layout="balanced"
        actions={
          <BookingLink source="primera-encabezado" className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
            <WhatsAppIcon />
            {actions.book}
          </BookingLink>
        }
        aside={<Photo {...photos.firstVisit} shape="soft" priority sizes="(min-width: 1024px) 560px, 100vw" />}
      />

      <Section labelledBy="pasos-titulo" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="pasos-titulo" className={h2}>
              {firstVisitPage.stepsTitle}
            </h2>
            <EmergencyNotice className="mt-8" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <StepList steps={firstVisitPage.steps} />
          </div>
        </div>
      </Section>

      <Section tone="mist" roundedTop labelledBy="llevar-titulo">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="llevar-titulo" className={h2}>
              {firstVisitPage.bring.title}
            </h2>
            <CheckList items={firstVisitPage.bring.items} className="mt-6" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-soft bg-white p-6">
              <h2 className="flex items-center gap-3 text-h3">
                <Clock aria-hidden="true" className="size-6 shrink-0" />
                {firstVisitPage.duration.title}
              </h2>
              <p className="mt-3">{firstVisitPage.duration.text}</p>
              <Link href="/servicios" className="link mt-2 inline-flex min-h-12 items-center font-bold">
                {firstVisitPage.duration.link}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="pagos-titulo">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="pagos-titulo" className={`${h2} lg:col-span-4`}>
            {payments.title}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
            <li>
              <CreditCard aria-hidden="true" className="size-6" />
              <h3 className="mt-3 font-bold">{payments.methodsTitle}</h3>
              <p className="mt-1 text-slate">{payments.methods.join(", ")}.</p>
            </li>
            <li>
              <Receipt aria-hidden="true" className="size-6" />
              <h3 className="mt-3 font-bold">{payments.receiptTitle}</h3>
              <p className="mt-1 text-slate">{payments.receipt}</p>
            </li>
            <li>
              <ShieldCheck aria-hidden="true" className="size-6" />
              <h3 className="mt-3 font-bold">{payments.insuranceTitle}</h3>
              <p className="mt-1 text-slate">{payments.insurance}</p>
            </li>
          </ul>
        </div>
      </Section>

      <ClosingCta source="cierre-primera" />
      <MobileActionBar source="barra-primera" />
    </>
  );
}
