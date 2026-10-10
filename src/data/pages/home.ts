import { doctor } from "../doctor";

export const homePage = {
  meta: {
    description:
      "Consulta de medicina general, seguimiento familiar y chequeos preventivos en el centro de Mazatlán. Agenda por WhatsApp.",
  },
  hero: {
    title: "Medicina general con tiempo para escucharte",
    subtitle: "Consulta individual, seguimiento familiar y chequeos preventivos en Mazatlán.",
  },
  featured: {
    title: "Servicios más solicitados",
    intro: "Cada servicio indica qué incluye, cuánto dura y cuánto cuesta.",
  },
  firstVisit: {
    title: "Cómo es tu primera consulta",
    intro: "Sin trámites complicados: agendas por WhatsApp y llegas con lo necesario.",
    steps: [
      {
        title: "Agenda por WhatsApp",
        text: "Te respondemos con los horarios disponibles y confirmamos tu cita.",
      },
      {
        title: "Prepara lo que llevas",
        text: "Tu identificación, la lista de tus medicamentos y tus estudios previos.",
      },
      {
        title: "La consulta",
        text: "Conversación, exploración física y explicación de lo que se encontró.",
      },
      {
        title: "Indicaciones y seguimiento",
        text: "Te llevas todo por escrito y, si hace falta, la fecha de tu siguiente revisión.",
      },
    ],
    link: "Ver el proceso completo",
  },
  doctor: {
    title: "Quién te atiende",
    text: doctor.bio[0],
    link: "Conoce al doctor",
    facts: {
      license: "Cédula profesional",
      years: "Años de práctica",
      focus: "Enfoque",
    },
  },
  testimonials: {
    title: "Lo que dicen los pacientes",
    intro: "Comentarios sobre el trato, los tiempos y las explicaciones.",
  },
  location: {
    title: "Dónde estamos",
    intro: "En planta baja, con rampa de acceso y estacionamiento para pacientes.",
    link: "Ver ubicación y horarios",
  },
} as const;
