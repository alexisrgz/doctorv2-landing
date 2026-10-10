export const firstVisitPage = {
  meta: {
    title: "Tu primera consulta",
    description: "Cómo agendar, qué llevar, cuánto dura y cómo pagar tu primera consulta de medicina general en Mazatlán.",
  },
  title: "Tu primera consulta",
  intro: "Todo lo que necesitas saber antes de venir, paso por paso.",
  stepsTitle: "Paso por paso",
  steps: [
    {
      title: "Agenda por WhatsApp",
      text: "Toca «Agendar cita» y envía el mensaje. Te respondemos con los horarios disponibles y confirmamos tu cita por el mismo medio.",
    },
    {
      title: "Prepara lo que llevas",
      text: "Reúne tu identificación, la lista de medicamentos que tomas y tus estudios previos, si los tienes.",
    },
    {
      title: "Llega 10 minutos antes",
      text: "En recepción se registran tus datos y firmas el consentimiento para abrir tu expediente.",
    },
    {
      title: "La consulta",
      text: "Conversación sobre tu motivo de consulta, exploración física y explicación de lo que se encontró. Puedes preguntar todo lo que necesites.",
    },
    {
      title: "Después de la consulta",
      text: "Te llevas las indicaciones por escrito y, si hace falta, la orden de estudios y la fecha sugerida para tu seguimiento.",
    },
  ],
  bring: {
    title: "Qué llevar",
    items: [
      "Identificación oficial",
      "Lista de los medicamentos que tomas, con la dosis",
      "Estudios previos y recetas recientes",
      "Cartilla de vacunación, si la consulta es para una niña o un niño",
    ],
  },
  duration: {
    title: "Cuánto dura",
    text: "La primera consulta general dura 40 minutos y las de seguimiento, 30. Los chequeos preventivos duran entre 40 y 70 minutos.",
    link: "Ver duración de cada servicio",
  },
} as const;
