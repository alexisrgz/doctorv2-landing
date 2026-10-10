export const servicesPage = {
  meta: {
    title: "Servicios y chequeos",
    description:
      "Consulta general, seguimiento de enfermedades crónicas, certificados médicos, curaciones y chequeos preventivos, con precio y duración.",
  },
  title: "Servicios y chequeos",
  intro: "Consultas, seguimiento y chequeos preventivos con precio y duración claros. Elige uno para ver qué incluye.",
  note: {
    title: "Sobre los precios",
    text: "Los precios están en pesos mexicanos y cubren la consulta. Los estudios de laboratorio se pagan aparte, directamente al laboratorio.",
  },
  jumpLabel: "Ir a",
} as const;

export const serviceDetailPage = {
  breadcrumbParent: "Servicios y chequeos",
  sections: {
    includes: "Qué incluye",
    forWhom: "Para quién es",
    howItWorks: "Cómo es la consulta",
    price: "Precio",
    faqs: "Preguntas frecuentes",
    related: "También te puede interesar",
  },
  booking: {
    chooseVariant: "Elige una opción",
    bookPrefix: "Agendar",
    note: "Se abre WhatsApp con tu mensaje listo para enviar.",
  },
} as const;
