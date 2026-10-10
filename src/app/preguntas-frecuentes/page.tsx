import type { Metadata } from "next";
import { Accordion } from "@/components/accordion";
import { BookingLink } from "@/components/booking-link";
import { ClosingCta } from "@/components/closing-cta";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-bar";
import { PageHeader } from "@/components/page-header";
import { buttonClasses } from "@/components/ui/button-styles";
import { faqGroups, getAllFaqs } from "@/data/faqs";
import { actions } from "@/data/pages/common";
import { faqPage } from "@/data/pages/misc";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...faqPage.meta, path: "/preguntas-frecuentes" });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(getAllFaqs())} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: faqPage.title, path: "/preguntas-frecuentes" },
        ])}
      />
      <PageHeader
        title={faqPage.title}
        intro={faqPage.intro}
        aside={
          <div className="rounded-soft bg-mist p-6">
            <h2 className="text-h3">{faqPage.aside.title}</h2>
            <p className="mt-3 text-slate">{faqPage.aside.text}</p>
            <BookingLink source="faq-encabezado" className={buttonClasses("primary", "lg", "mt-6 w-full")}>
              <WhatsAppIcon />
              {actions.whatsapp}
            </BookingLink>
          </div>
        }
      />

      <div className="container-page grid gap-10 border-t border-line pt-10 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <nav aria-label="Temas" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
            {faqGroups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-12 items-center rounded-control border border-line px-4 font-bold text-ink no-underline hover:bg-mist lg:w-full lg:border-0 lg:px-3"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-14 lg:col-span-8 lg:col-start-5">
          {faqGroups.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-titulo`} className="scroll-mt-6 lg:scroll-mt-24">
              <h2 id={`${group.id}-titulo`} className="text-h2">
                {group.title}
              </h2>
              <Accordion items={group.items} className="mt-5" />
            </section>
          ))}
        </div>
      </div>

      <ClosingCta source="cierre-faq" />
      <MobileActionBar source="barra-faq" />
    </>
  );
}
