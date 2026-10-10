/** Textos compartidos entre páginas (etiquetas de acciones y cierres). */
export const actions = {
  book: "Agendar cita",
  call: "Llamar",
  directions: "Cómo llegar",
  whatsapp: "Escribir por WhatsApp",
  allServices: "Ver todos los servicios",
} as const;

/** Avisos solo para lectores de pantalla. */
export const srNotes = {
  newTab: " (se abre en otra pestaña)",
} as const;

export const closingCta = {
  title: "Agenda tu consulta",
  text: "Escríbenos por WhatsApp y te respondemos con los horarios disponibles. Si prefieres, llama al consultorio.",
} as const;

export const labels = {
  from: "desde",
  minutes: "min",
  duration: "Duración",
  price: "Precio",
  address: "Dirección",
  phone: "Teléfono",
  hours: "Horario",
  today: "Hoy",
} as const;
