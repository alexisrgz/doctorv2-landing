import { Phone } from "lucide-react";
import { actions, closingCta } from "@/data/pages/common";
import { BookingLink } from "./booking-link";
import { CallLink } from "./call-link";
import { WhatsAppIcon } from "./icons/whatsapp-icon";
import { Section } from "./section";
import { buttonClasses } from "./ui/button-styles";

/** Cierre con CTA en banda Tinta: título a la izquierda, acciones a la derecha. */
export function ClosingCta({
  title = closingCta.title,
  text = closingCta.text,
  source,
}: {
  title?: string;
  text?: string;
  source: string;
}) {
  return (
    <Section tone="ink" labelledBy="cierre-titulo" className="lg:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 id="cierre-titulo" className="text-h2">
            {title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-white/85">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <BookingLink source={source} className={buttonClasses("primary", "lg", "sm:flex-1 lg:flex-none")}>
            <WhatsAppIcon />
            {actions.book}
          </BookingLink>
          <CallLink className={buttonClasses("inverse", "lg")}>
            <Phone aria-hidden="true" className="size-5" />
            {actions.call}
          </CallLink>
        </div>
      </div>
    </Section>
  );
}
