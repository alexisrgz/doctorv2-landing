import type { Metadata } from "next";
import Link from "next/link";
import { MobileActionBar } from "@/components/mobile-bar";
import { buttonClasses } from "@/components/ui/button-styles";
import { footerNav, mainNav } from "@/config/nav";
import { notFoundPage } from "@/data/pages/misc";

export const metadata: Metadata = {
  title: notFoundPage.title,
  robots: { index: false },
};

export default function NotFound() {
  const links = [...mainNav.slice(1), ...footerNav];
  return (
    <>
      <section data-hero className="pt-10 pb-16 lg:pt-20 lg:pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h1 className="text-h1">{notFoundPage.title}</h1>
            <p className="mt-4 max-w-[46ch] text-lead text-slate">{notFoundPage.text}</p>
            <Link href="/" className={buttonClasses("primary", "lg", "mt-8")}>
              {notFoundPage.home}
            </Link>
          </div>
          <nav aria-label="Secciones" className="rounded-soft bg-mist p-6 lg:col-span-5 lg:col-start-8">
            <ul className="flex flex-col">
              {links.map((item) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <Link href={item.href} className="link flex min-h-12 items-center font-bold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <MobileActionBar source="barra-404" />
    </>
  );
}
