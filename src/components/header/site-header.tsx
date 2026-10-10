import Link from "next/link";
import { mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { actions } from "@/data/pages/common";
import { BookingLink } from "../booking-link";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import { OpenStatus } from "../open-status";
import { buttonClasses } from "../ui/button-styles";
import { NavLinks } from "./main-nav";
import { MobileMenu } from "./mobile-menu";

function Brand() {
  return (
    <Link href="/" className="-ml-1 flex min-h-12 flex-col justify-center rounded-control px-1 text-ink no-underline">
      <span className="font-display text-[20px] leading-none font-bold tracking-[-0.02em]">{site.name}</span>
      <span className="mt-1 text-meta leading-none text-slate">{site.descriptor}</span>
    </Link>
  );
}

/**
 * Header: 56px en móvil (marca + menú), 72px y fijo en desktop.
 * 1024–1099px: marca + "Agendar cita" + menú. ≥1100px: navegación en línea con etiquetas cortas.
 */
export function SiteHeader() {
  return (
    <header className="z-40 border-b border-line bg-white lg:sticky lg:top-0">
      <div className="container-page flex h-14 items-center justify-between gap-4 lg:h-[72px]">
        <Brand />
        <nav aria-label="Principal" className="hidden nav:block">
          <ul className="flex items-center">
            <NavLinks
              items={mainNav}
              short
              linkClassName="inline-flex min-h-12 items-center rounded-control px-3 text-[16px] font-bold whitespace-nowrap text-ink hover:bg-mist"
              activeClassName="underline decoration-2 underline-offset-[6px]"
            />
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <BookingLink source="header" className={buttonClasses("primary", "md")}>
              <WhatsAppIcon />
              {actions.book}
            </BookingLink>
          </div>
          <MobileMenu brand={<Brand />} footer={<OpenStatus variant="inline" data-testid="menu-open-status" />} />
        </div>
      </div>
    </header>
  );
}
