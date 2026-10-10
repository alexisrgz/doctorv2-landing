/**
 * Servicios del consultorio. Precios en MXN, ficticios.
 * Cada servicio genera su página en /servicios/[slug].
 */

export type ServiceGroupId = "consultas" | "chequeos";

export type ServiceGroup = {
  id: ServiceGroupId;
  /** Ancla de salto en /servicios. */
  anchor: string;
  title: string;
  description: string;
};

export type ServiceVariant = {
  id: string;
  label: string;
  durationMin: number;
  price: number;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceIcon =
  | "stethoscope"
  | "heart-pulse"
  | "file-check"
  | "bandage"
  | "clipboard-list"
  | "clipboard-check"
  | "school";

export type ServicePhoto = {
  /** Nombre del archivo en public/images, sin extensión. */
  name: string;
  alt: string;
  /** object-position */
  focal?: string;
};

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroupId;
  /** Una línea para tarjetas y metadatos. */
  summary: string;
  includes: readonly string[];
  forWhom: readonly string[];
  /** Cómo es la consulta, en prosa corta. */
  howItWorks: string;
  /** Duración de referencia en minutos (la de la variante principal). */
  durationMin: number;
  variants: readonly [ServiceVariant, ...ServiceVariant[]];
  /** Aclaración junto al precio (por ejemplo, costos que se pagan aparte). */
  priceNote?: string;
  faqs: readonly ServiceFaq[];
  photo: ServicePhoto;
  icon: ServiceIcon;
  related: readonly [string, string];
};

export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: "consultas",
    anchor: "consultas-y-seguimiento",
    title: "Consultas y seguimiento",
    description: "Para cuando algo te molesta, para llevar el control de una enfermedad crónica o para trámites médicos.",
  },
  {
    id: "chequeos",
    anchor: "chequeos-preventivos",
    title: "Chequeos preventivos",
    description: "Revisiones sin síntomas de por medio, con estudios y un plan claro para lo que sigue.",
  },
];

export const services: readonly Service[] = [
  {
    slug: "consulta-general",
    name: "Consulta general",
    group: "consultas",
    summary: "Valoración de tus síntomas, revisión física completa e indicaciones claras por escrito.",
    includes: [
      "Entrevista sobre tus síntomas, antecedentes y medicamentos",
      "Exploración física completa",
      "Toma de presión, pulso, temperatura, peso y talla",
      "Receta e indicaciones por escrito",
      "Orden de estudios, solo si hacen falta",
      "Tiempo para tus preguntas antes de terminar",
    ],
    forWhom: [
      "Personas de cualquier edad con síntomas recientes, como fiebre, tos, dolor o malestar general",
      "Familias que buscan un médico de cabecera",
      "Quien quiere revisar un tratamiento que ya lleva",
    ],
    howItWorks:
      "Empieza con una conversación: qué sientes, desde cuándo y qué has intentado. Sigue la exploración física y la toma de signos vitales. Al final, el doctor te explica lo que encontró, las opciones que tienes y el plan, y te entrega las indicaciones por escrito.",
    durationMin: 40,
    variants: [
      { id: "primera", label: "Primera consulta", durationMin: 40, price: 700 },
      { id: "seguimiento", label: "Consulta de seguimiento", durationMin: 30, price: 550 },
    ],
    faqs: [
      {
        question: "¿Cuál es la diferencia entre primera consulta y seguimiento?",
        answer:
          "La primera consulta incluye tu historia clínica completa. La consulta de seguimiento es para revisar la evolución del mismo motivo dentro de los 30 días siguientes.",
      },
      {
        question: "¿Atienden a niñas y niños?",
        answer: "Sí, de cualquier edad, siempre acompañados por su madre, padre o tutor.",
      },
      {
        question: "¿Me pueden dar una constancia de asistencia?",
        answer: "Sí. Pídela al terminar la consulta y se te entrega sin costo adicional.",
      },
    ],
    photo: {
      name: "servicio-consulta-general",
      alt: "El doctor conversa con una paciente sentada frente a su escritorio",
      focal: "50% 40%",
    },
    icon: "stethoscope",
    related: ["seguimiento-cronico", "chequeo-basico"],
  },
  {
    slug: "seguimiento-cronico",
    name: "Seguimiento de enfermedades crónicas",
    group: "consultas",
    summary: "Control periódico de hipertensión, diabetes o colesterol alto, con revisión de tus mediciones.",
    includes: [
      "Revisión de tus mediciones en casa, como presión o glucosa",
      "Toma de presión, peso y circunferencia de cintura",
      "Revisión de tus medicamentos y, si hace falta, ajustes",
      "Orden de estudios de control cuando corresponde",
      "Indicaciones por escrito y fecha sugerida para tu siguiente cita",
    ],
    forWhom: [
      "Personas con diagnóstico de hipertensión, diabetes tipo 2 o colesterol alto",
      "Quien necesita revisar o renovar su tratamiento",
      "Familiares que acompañan el cuidado de una persona mayor",
    ],
    howItWorks:
      "Trae tu registro de mediciones, tus medicamentos y tus estudios más recientes. Con eso se revisa cómo has estado desde la última cita, se ajusta lo necesario y se acuerda cuándo volver a revisar.",
    durationMin: 40,
    variants: [{ id: "control", label: "Consulta de control", durationMin: 40, price: 750 }],
    faqs: [
      {
        question: "¿Cada cuánto tengo que venir?",
        answer:
          "Depende de cada caso; lo más común es cada uno a tres meses. El doctor te propone una frecuencia según tus mediciones y estudios.",
      },
      {
        question: "¿Tengo que llevar estudios de laboratorio?",
        answer:
          "Si tienes estudios recientes, tráelos. Si hacen falta nuevos, recibes la orden durante la consulta.",
      },
      {
        question: "¿Me pueden renovar la receta sin consulta?",
        answer: "No. Las recetas se emiten después de valorarte en consulta, para revisar que el tratamiento siga siendo adecuado.",
      },
    ],
    photo: {
      name: "servicio-seguimiento-cronico",
      alt: "Toma de presión arterial en el brazo de un paciente adulto",
      focal: "50% 50%",
    },
    icon: "heart-pulse",
    related: ["chequeo-completo", "consulta-general"],
  },
  {
    slug: "certificado-medico",
    name: "Certificado médico",
    group: "consultas",
    summary: "Revisión física y certificado de salud para escuela, trabajo o actividad deportiva.",
    includes: [
      "Preguntas sobre tus antecedentes de salud",
      "Exploración física y signos vitales",
      "Revisión básica de la vista",
      "Certificado firmado, con nombre y cédula profesional del médico",
      "En la variante deportiva, revisión de corazón, pulmones, músculos y articulaciones",
    ],
    forWhom: [
      "Estudiantes que lo necesitan para una inscripción",
      "Personas que lo piden para un empleo",
      "Quien va a empezar una actividad deportiva o una competencia",
    ],
    howItWorks:
      "Es una consulta corta y enfocada. Se revisan tus antecedentes, se hace la exploración física y, si todo está en orden, recibes el certificado al terminar. Si la escuela o la empresa tienen un formato propio, llévalo impreso.",
    durationMin: 20,
    variants: [
      { id: "escolar-laboral", label: "Escolar o laboral", durationMin: 20, price: 350 },
      { id: "deportivo", label: "Deportivo", durationMin: 30, price: 450 },
    ],
    faqs: [
      {
        question: "¿El certificado se entrega el mismo día?",
        answer: "Sí, al final de la consulta, siempre que la revisión no requiera estudios adicionales.",
      },
      {
        question: "¿Qué tiene el deportivo que no tenga el escolar o laboral?",
        answer:
          "Una revisión más detallada de corazón, pulmones, músculos y articulaciones, y preguntas sobre la actividad que vas a realizar.",
      },
      {
        question: "¿Lo puede pedir un menor de edad?",
        answer: "Sí. La persona menor de edad debe venir acompañada por su madre, padre o tutor.",
      },
    ],
    photo: {
      name: "servicio-certificado-medico",
      alt: "Manos del doctor firmando un certificado médico sobre el escritorio",
      focal: "50% 55%",
    },
    icon: "file-check",
    related: ["chequeo-escolar-deportivo", "consulta-general"],
  },
  {
    slug: "curaciones-menores",
    name: "Curaciones y retiro de puntos",
    group: "consultas",
    summary: "Limpieza y curación de heridas pequeñas, cambio de vendaje y retiro de puntos.",
    includes: [
      "Revisión de la herida",
      "Limpieza y curación con material estéril",
      "Retiro de puntos de sutura",
      "Cambio de vendaje",
      "Indicaciones de cuidado en casa por escrito",
    ],
    forWhom: [
      "Personas con heridas pequeñas o raspones que necesitan curación",
      "Quien tiene puntos de una sutura o cirugía previa y necesita retirarlos",
      "Quien necesita cambiar un vendaje",
    ],
    howItWorks:
      "Se revisa la herida, se limpia y se cura con material estéril, o se retiran los puntos si ya es momento. Te llevas por escrito cómo cuidarla en casa y qué señales vigilar. Una herida profunda o con sangrado que no se detiene necesita atención en un servicio de urgencias.",
    durationMin: 30,
    variants: [{ id: "curacion", label: "Curación o retiro de puntos", durationMin: 30, price: 400 }],
    faqs: [
      {
        question: "¿Qué tipo de heridas atienden?",
        answer:
          "Heridas pequeñas y superficiales, raspones y cambios de vendaje. Una herida profunda, con sangrado que no se detiene o por mordedura de animal debe atenderse en un servicio de urgencias.",
      },
      {
        question: "¿Me pueden retirar puntos que me pusieron en otro lugar?",
        answer: "Sí. Si la tienes, trae la indicación de cuándo debían retirarse.",
      },
    ],
    photo: {
      name: "servicio-curaciones-menores",
      alt: "Material de curación estéril ordenado sobre una charola metálica",
      focal: "50% 50%",
    },
    icon: "bandage",
    related: ["consulta-general", "certificado-medico"],
  },
  {
    slug: "chequeo-basico",
    name: "Chequeo preventivo básico",
    group: "chequeos",
    summary: "Revisión general con estudios de laboratorio básicos y una consulta breve para revisar resultados.",
    includes: [
      "Historia clínica y antecedentes familiares",
      "Exploración física y signos vitales",
      "Orden de estudios básicos: biometría hemática, química sanguínea y examen general de orina",
      "Consulta breve para revisar tus resultados",
      "Recomendaciones de prevención según tu edad",
    ],
    forWhom: [
      "Adultos sin síntomas que quieren una revisión anual",
      "Quien no se ha hecho estudios en el último año",
      "Personas con antecedentes familiares que quieren empezar a vigilarse",
    ],
    howItWorks:
      "En la primera visita se hace la revisión y recibes la orden de estudios. Eliges el laboratorio y pagas los estudios directamente ahí. Con los resultados listos, agendas la consulta breve de revisión, que ya está incluida en el precio.",
    durationMin: 50,
    variants: [{ id: "basico", label: "Chequeo básico", durationMin: 50, price: 1200 }],
    priceNote: "El laboratorio se paga aparte, directamente al laboratorio que elijas.",
    faqs: [
      {
        question: "¿El precio incluye los estudios de laboratorio?",
        answer:
          "No. Los estudios se pagan aparte, directamente al laboratorio que elijas. El precio incluye la revisión y la consulta de resultados.",
      },
      {
        question: "¿Tengo que ir en ayunas?",
        answer: "A la consulta no. Para los estudios de sangre normalmente sí; el laboratorio te indica cuántas horas.",
      },
      {
        question: "¿Cuánto tiempo tengo para llevar mis resultados?",
        answer: "Lo recomendable es dentro de los 30 días siguientes a la revisión.",
      },
    ],
    photo: {
      name: "servicio-chequeo-basico",
      alt: "Tubos de muestra rotulados y una orden de estudios sobre una mesa clara",
      focal: "50% 50%",
    },
    icon: "clipboard-list",
    related: ["chequeo-completo", "seguimiento-cronico"],
  },
  {
    slug: "chequeo-completo",
    name: "Chequeo preventivo completo",
    group: "chequeos",
    summary: "Evaluación amplia de factores de riesgo, estudios ampliados y un plan de seguimiento por escrito.",
    includes: [
      "Historia clínica ampliada: hábitos, sueño, actividad física y antecedentes",
      "Evaluación de factores de riesgo cardiovascular y metabólico",
      "Exploración física completa y signos vitales",
      "Orden de estudios ampliada: perfil de lípidos, glucosa, función renal y hepática, entre otros",
      "Consulta de revisión de resultados",
      "Plan de seguimiento por escrito",
    ],
    forWhom: [
      "Adultos de 40 años o más",
      "Personas con antecedentes familiares de diabetes, hipertensión o enfermedad del corazón",
      "Quien quiere un punto de partida detallado para cuidar su salud",
    ],
    howItWorks:
      "Son dos visitas. En la primera se hace una historia clínica detallada, la exploración y la evaluación de factores de riesgo, y recibes la orden de estudios. En la segunda se revisan los resultados contigo y te llevas un plan de seguimiento por escrito.",
    durationMin: 70,
    variants: [{ id: "completo", label: "Chequeo completo", durationMin: 70, price: 1900 }],
    priceNote: "El laboratorio se paga aparte, directamente al laboratorio que elijas.",
    faqs: [
      {
        question: "¿En qué se diferencia del chequeo básico?",
        answer:
          "Incluye una historia clínica más detallada, la evaluación de factores de riesgo, más estudios y un plan de seguimiento por escrito.",
      },
      {
        question: "¿El precio incluye los estudios de laboratorio?",
        answer: "No. Los estudios se pagan aparte, directamente al laboratorio que elijas.",
      },
      {
        question: "¿Cuánto tarda todo el proceso?",
        answer:
          "Son dos visitas, normalmente con una o dos semanas de diferencia, según el tiempo que tarde el laboratorio en entregar resultados.",
      },
    ],
    photo: {
      name: "servicio-chequeo-completo",
      alt: "El doctor revisa resultados impresos junto con un paciente",
      focal: "50% 45%",
    },
    icon: "clipboard-check",
    related: ["chequeo-basico", "seguimiento-cronico"],
  },
  {
    slug: "chequeo-escolar-deportivo",
    name: "Chequeo escolar y deportivo",
    group: "chequeos",
    summary: "Revisión de crecimiento, vista y salud general para el regreso a clases o para empezar un deporte.",
    includes: [
      "Medición de peso y talla y revisión del crecimiento",
      "Exploración física completa",
      "Revisión básica de la vista",
      "Revisión de la cartilla de vacunación",
      "En la variante deportiva, revisión de corazón, músculos y articulaciones",
      "Certificado médico incluido",
    ],
    forWhom: [
      "Niñas, niños y adolescentes en edad escolar",
      "Jóvenes que van a entrar a un equipo o a una liga",
      "Familias que quieren una revisión antes del ciclo escolar",
    ],
    howItWorks:
      "La consulta se hace con la niña o el niño y la persona adulta que lo acompaña. Se revisa el crecimiento, la vista y la cartilla de vacunación, se hace la exploración física y, al terminar, se entrega el certificado.",
    durationMin: 40,
    variants: [
      { id: "escolar", label: "Escolar", durationMin: 40, price: 650 },
      { id: "deportivo", label: "Deportivo", durationMin: 40, price: 750 },
    ],
    faqs: [
      {
        question: "¿Incluye el certificado médico?",
        answer: "Sí, el certificado va incluido en las dos variantes.",
      },
      {
        question: "¿Qué tengo que llevar?",
        answer: "La cartilla de vacunación y, si la escuela o el club tienen un formato propio, ese formato impreso.",
      },
    ],
    photo: {
      name: "servicio-chequeo-escolar-deportivo",
      alt: "Un niño con uniforme deportivo sentado en la mesa de exploración junto a su mamá",
      focal: "50% 40%",
    },
    icon: "school",
    related: ["certificado-medico", "consulta-general"],
  },
];

/** Servicios destacados en la página de inicio (en este orden). */
export const featuredServiceSlugs = [
  "consulta-general",
  "seguimiento-cronico",
  "chequeo-basico",
  "chequeo-completo",
] as const;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getVariant(service: Service, variantId?: string): ServiceVariant {
  return service.variants.find((variant) => variant.id === variantId) ?? service.variants[0];
}

export function getServicesByGroup(group: ServiceGroupId): Service[] {
  return services.filter((service) => service.group === group);
}

export function getFeaturedServices(): Service[] {
  return featuredServiceSlugs.map((slug) => {
    const service = getService(slug);
    if (!service) throw new Error(`Servicio destacado inexistente: ${slug}`);
    return service;
  });
}

export function getRelatedServices(service: Service): Service[] {
  return service.related.map((slug) => {
    const related = getService(slug);
    if (!related) throw new Error(`Servicio relacionado inexistente: ${slug}`);
    return related;
  });
}

export function getStartingPrice(service: Service): number {
  return Math.min(...service.variants.map((variant) => variant.price));
}

export function getDurationRange(service: Service): { min: number; max: number } {
  const durations = service.variants.map((variant) => variant.durationMin);
  return { min: Math.min(...durations), max: Math.max(...durations) };
}
