"use client";

import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { actions } from "@/data/pages/common";
import { BookingLink } from "./booking-link";
import { CallLink } from "./call-link";
import { useAfterHero } from "./hooks/use-after-hero";
import { WhatsAppIcon } from "./icons/whatsapp-icon";
import { buttonClasses } from "./ui/button-styles";

/** Contenedor de la barra fija inferior (solo < 1024px). Entra cuando el hero sale de pantalla. */
export function MobileBarFrame({ label, children }: { label: string; children: ReactNode }) {
  const visible = useAfterHero();
  return (
    <aside
      aria-label={label}
      data-testid="mobile-bar"
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
      inert={!visible}
      className="mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="container-page flex items-stretch gap-2">{children}</div>
    </aside>
  );
}

/** Barra genérica: Agendar + Llamar. */
export function MobileActionBar({ source = "barra-movil" }: { source?: string }) {
  return (
    <MobileBarFrame label={actions.book}>
      <BookingLink source={source} className={buttonClasses("primary", "lg", "flex-1")}>
        <WhatsAppIcon />
        {actions.book}
      </BookingLink>
      <CallLink className={buttonClasses("secondary", "lg")}>
        <Phone aria-hidden="true" className="size-5" />
        {actions.call}
      </CallLink>
    </MobileBarFrame>
  );
}
