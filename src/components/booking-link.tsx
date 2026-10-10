import Link from "next/link";
import type { ReactNode } from "react";
import { getBookingHref, isExternalBooking, type BookingRequest } from "@/lib/booking";

type BookingLinkProps = BookingRequest & {
  className?: string;
  children: ReactNode;
  "data-testid"?: string;
};

/**
 * Único componente que renderiza enlaces de cita.
 * En modo "whatsapp" abre WhatsApp en otra pestaña; en "internal", navega a /agenda.
 */
export function BookingLink({ service, variant, source, className, children, ...rest }: BookingLinkProps) {
  const href = getBookingHref({ service, variant, source });
  const data = {
    "data-booking": "true",
    "data-booking-service": service,
    "data-booking-variant": variant,
    "data-booking-source": source,
    "data-testid": rest["data-testid"],
  };

  if (isExternalBooking()) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...data}>
        {children}
        <span className="sr-only"> (se abre en WhatsApp)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...data}>
      {children}
    </Link>
  );
}
