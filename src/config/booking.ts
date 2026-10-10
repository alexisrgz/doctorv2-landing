/**
 * Modo de reserva.
 * - "whatsapp": todo "Agendar cita" abre WhatsApp con un mensaje prellenado (fase 1).
 * - "internal": los enlaces apuntan a /agenda (módulo de la fase 2, aún no construido).
 */
export type BookingMode = "whatsapp" | "internal";

export const BOOKING_MODE: BookingMode = "whatsapp";

/** Ruta del futuro módulo de agenda (fase 2). */
export const INTERNAL_BOOKING_PATH = "/agenda";
