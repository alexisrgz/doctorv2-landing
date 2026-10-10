/**
 * Datos de marca y contacto. Para adaptar el sitio a otro consultorio,
 * empieza aquí (ver README, sección "Adaptar a otro doctor").
 * Este archivo no debe importar nada: scripts/check-rules.mjs lo lee con Node.
 */
export const site = {
  /** Nombre corto que aparece en el header. */
  name: "Dr. Villaseñor",
  /** Descriptor bajo el nombre corto. */
  descriptor: "Medicina general",
  doctor: {
    fullName: "Dr. Andrés Villaseñor Ríos",
    givenName: "Andrés",
    familyName: "Villaseñor Ríos",
    honorific: "Dr.",
  },
  locale: "es-MX",
  language: "es",
  timeZone: "America/Mazatlan",
  currency: "MXN",
  phone: {
    /** Formato E.164, para tel: y datos estructurados. */
    e164: "+526690000000",
    /** Formato para mostrar. */
    display: "+52 669 000 0000",
    /** Solo dígitos, para WhatsApp. */
    whatsapp: "526690000000",
  },
  address: {
    street: "Av. Rafael Buelna 215",
    neighborhood: "Col. Centro",
    city: "Mazatlán",
    state: "Sinaloa",
    postalCode: "82000",
    country: "MX",
    countryName: "México",
  },
  /** Fecha de la última revisión de contenido (sitemap). */
  contentUpdatedAt: "2026-10-09",
  /** Único aviso del sitio; aparece solo en el footer. */
  demoNotice: "Sitio de demostración; marca y datos ficticios.",
} as const;

export type Site = typeof site;
