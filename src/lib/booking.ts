/**
 * Única fuente de enlaces de cita. Ningún otro módulo arma enlaces de WhatsApp.
 * Cambiar BOOKING_MODE a "internal" redirige todas las citas a la agenda propia (fase 2).
 */
import { BOOKING_MODE, INTERNAL_BOOKING_PATH, type BookingMode } from "@/config/booking";
import { site } from "@/config/site";
import { bookingMessages, fillTemplate } from "@/data/booking-messages";
import { getService, getVariant } from "@/data/services";

export type BookingRequest = {
  /** Slug del servicio. */
  service?: string;
  /** Id de la variante; si falta, se usa la primera del servicio. */
  variant?: string;
  /** Dónde se originó el clic (hero, header, barra móvil…). Solo para medición. */
  source?: string;
};

export function getBookingMessage({ service, variant }: BookingRequest = {}): string {
  const found = service ? getService(service) : undefined;
  if (!found) {
    return fillTemplate(bookingMessages.general, { doctor: site.doctor.fullName });
  }
  return fillTemplate(bookingMessages.service, {
    servicio: found.name,
    variante: getVariant(found, variant).label,
  });
}

export function getBookingHref(request: BookingRequest = {}, mode: BookingMode = BOOKING_MODE): string {
  if (mode === "internal") {
    const params = new URLSearchParams();
    const found = request.service ? getService(request.service) : undefined;
    if (found) {
      params.set("servicio", found.slug);
      params.set("variante", getVariant(found, request.variant).id);
    }
    const query = params.toString();
    return query ? `${INTERNAL_BOOKING_PATH}?${query}` : INTERNAL_BOOKING_PATH;
  }
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(getBookingMessage(request))}`;
}

/** true cuando la cita sale del sitio (WhatsApp): abrir en pestaña nueva con rel seguro. */
export function isExternalBooking(mode: BookingMode = BOOKING_MODE): boolean {
  return mode === "whatsapp";
}
