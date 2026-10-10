import { practice } from "./practice";

export type Faq = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  items: readonly Faq[];
};

export const faqGroups: readonly FaqGroup[] = [
  {
    id: "citas-y-pagos",
    title: "Citas y pagos",
    items: [
      {
        question: "¿Cómo agendo una cita?",
        answer:
          "Por WhatsApp. Al tocar cualquier botón de «Agendar cita» se abre una conversación con un mensaje ya escrito; solo envíalo y te respondemos con los horarios disponibles.",
      },
      {
        question: "¿Puedo cambiar o cancelar mi cita?",
        answer:
          "Sí. Avísanos por WhatsApp con al menos 3 horas de anticipación para ofrecer ese horario a otra persona.",
      },
      {
        question: "¿Qué formas de pago aceptan?",
        answer: `${practice.payments.methods.join(", ")}. ${practice.payments.receipt}`,
      },
      {
        question: "¿Trabajan con aseguradoras?",
        answer: practice.payments.insurance,
      },
    ],
  },
  {
    id: "primera-consulta",
    title: "Primera consulta",
    items: [
      {
        question: "¿Qué llevo a mi primera consulta?",
        answer:
          "Una identificación, la lista de medicamentos que tomas y, si los tienes, tus estudios y recetas anteriores.",
      },
      {
        question: "¿Cuánto dura?",
        answer:
          "La primera consulta general dura 40 minutos. Te recomendamos llegar 10 minutos antes para registrar tus datos.",
      },
      {
        question: "¿Puedo ir con alguien?",
        answer: "Sí. Puedes venir con un familiar o una persona de confianza; las personas menores de edad siempre vienen acompañadas.",
      },
    ],
  },
  {
    id: "consultas-y-seguimiento",
    title: "Consultas y seguimiento",
    items: [
      {
        question: "¿Atienden urgencias?",
        answer: practice.emergencyNotice,
      },
      {
        question: "¿Hacen consultas a domicilio?",
        answer: "Por ahora no. Todas las consultas son en el consultorio.",
      },
      {
        question: "¿Puedo escribir si tengo dudas después de la consulta?",
        answer:
          "Sí, sobre las indicaciones que recibiste. Si aparece un síntoma nuevo o algo cambia, lo adecuado es agendar una consulta de seguimiento.",
      },
    ],
  },
  {
    id: "privacidad-y-expediente",
    title: "Privacidad y expediente",
    items: [
      {
        question: "¿Quién tiene acceso a mi expediente?",
        answer:
          "Solo el médico tratante. Tu información se usa para tu atención y se resguarda conforme al aviso de privacidad.",
      },
      {
        question: "¿Puedo pedir una copia de mi expediente o un resumen clínico?",
        answer: "Sí. Solicítalo por escrito o por WhatsApp; se entrega un resumen clínico a ti o a quien autorices por escrito.",
      },
    ],
  },
];

export function getAllFaqs(): Faq[] {
  return faqGroups.flatMap((group) => group.items);
}
