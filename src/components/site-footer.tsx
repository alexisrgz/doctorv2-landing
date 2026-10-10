import Link from "next/link";
import { footerNav, mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { doctor } from "@/data/doctor";
import { actions, labels, srNotes } from "@/data/pages/common";
import { getAddressLines, getMapsHref, getPhoneDisplay } from "@/lib/contact";
import { BookingLink } from "./booking-link";
import { CallLink } from "./call-link";
import { OpenStatus } from "./open-status";

const footerLink =
  "inline-flex min-h-12 min-w-12 items-center text-white underline decoration-[1.5px] underline-offset-[3px] hover:decoration-[2.5px]";

/** Footer en banda Tinta. Lleva el único aviso de sitio de demostración. */
export function SiteFooter() {
  const [line1, line2] = getAddressLines();
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink bg-ink pt-14 pb-[calc(var(--mobile-bar-height)+env(safe-area-inset-bottom)+24px)] text-white lg:pt-20 lg:pb-10">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="font-display text-[28px] leading-none font-bold tracking-[-0.02em]">{site.name}</p>
          <p className="mt-2 text-white/80">{site.descriptor}</p>
          <p className="mt-6 text-meta text-white/80">
            {doctor.fullName}
            <br />
            {doctor.license.label} {doctor.license.number}
          </p>
          <OpenStatus variant="inverse" className="mt-6" data-testid="footer-open-status" />
        </div>

        <div className="lg:col-span-4">
          <h2 className="font-display text-[20px]">{labels.address}</h2>
          <address className="mt-3 not-italic text-white/90">
            {line1}
            <br />
            {line2}
          </address>
          <ul className="mt-3 flex flex-col">
            <li>
              <a href={getMapsHref()} target="_blank" rel="noopener noreferrer" className={footerLink}>
                {actions.directions}
                <span className="sr-only">{srNotes.newTab}</span>
              </a>
            </li>
            <li>
              <CallLink className={footerLink}>
                {labels.phone}: {getPhoneDisplay()}
              </CallLink>
            </li>
            <li>
              <BookingLink source="footer" className={footerLink}>
                {actions.whatsapp}
              </BookingLink>
            </li>
          </ul>
        </div>

        <nav aria-label="Pie de página" className="lg:col-span-4">
          <h2 className="font-display text-[20px]">Secciones</h2>
          <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
            {[...mainNav, ...footerNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-page mt-12 border-t border-line-inverse pt-6 text-meta text-white/80 lg:flex lg:justify-between">
        <p>{site.demoNotice}</p>
        <p className="mt-2 lg:mt-0">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
