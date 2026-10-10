export const locationPage = {
  meta: {
    title: "Ubicación y contacto",
    description: "Dirección, horario, teléfono, estacionamiento y accesibilidad del consultorio en el centro de Mazatlán.",
  },
  title: "Ubicación y contacto",
  intro: "Consultorio en planta baja en el centro de Mazatlán, con estacionamiento para pacientes.",
  sections: {
    contact: "Contacto",
    hours: "Horario",
    hoursNote: "Horario de Mazatlán. Las consultas son con cita.",
    office: "Así es la entrada",
  },
} as const;

export const faqPage = {
  meta: {
    title: "Preguntas frecuentes",
    description: "Respuestas sobre citas, pagos, la primera consulta, el seguimiento y la privacidad de tu expediente.",
  },
  title: "Preguntas frecuentes",
  intro: "Respuestas sobre citas, pagos, la primera consulta y tu expediente.",
  aside: {
    title: "¿No encontraste tu respuesta?",
    text: "Escríbenos por WhatsApp y te respondemos en horario de consulta.",
  },
} as const;

export const privacyPage = {
  meta: {
    title: "Aviso de privacidad",
    description: "Cómo se recaban, usan y protegen tus datos personales en el consultorio.",
  },
  title: "Aviso de privacidad",
  updatedLabel: "Última actualización:",
} as const;

export const notFoundPage = {
  title: "No encontramos esta página",
  text: "Puede que el enlace haya cambiado. Estas secciones pueden ayudarte:",
  home: "Ir al inicio",
} as const;
