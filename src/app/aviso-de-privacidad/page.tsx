import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-bar";
import { PageHeader } from "@/components/page-header";
import { privacyPage } from "@/data/pages/misc";
import { privacyNotice } from "@/data/privacy";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...privacyPage.meta, path: "/aviso-de-privacidad" });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: privacyPage.title, path: "/aviso-de-privacidad" },
        ])}
      />
      <PageHeader
        title={privacyPage.title}
        intro={privacyNotice.intro}
        aside={
          <div className="rounded-soft bg-mist p-6">
            <p className="text-meta text-slate">{privacyPage.updatedLabel}</p>
            <p className="mt-1 font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">
              {privacyNotice.updatedAt}
            </p>
          </div>
        }
      />

      <div className="container-page grid gap-10 border-t border-line pt-10 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <nav aria-label="Contenido del aviso" className="lg:col-span-3">
          <ul className="flex flex-col lg:sticky lg:top-24">
            {privacyNotice.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="link inline-flex min-h-12 items-center">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex max-w-[65ch] flex-col gap-10 lg:col-span-8 lg:col-start-5">
          {privacyNotice.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-6 lg:scroll-mt-24">
              <h2 id={`${section.id}-titulo`} className="font-display text-[26px] leading-tight font-bold tracking-[-0.02em]">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-6">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <MobileActionBar source="barra-privacidad" />
    </>
  );
}
