import { site } from "@/config/site";

export type TimelineItem = {
  period: string;
  title: string;
  detail: string;
};

export type Principle = {
  title: string;
  text: string;
};

export const doctor = {
  fullName: site.doctor.fullName,
  role: "Médico general",
  focus: "Medicina preventiva y seguimiento familiar",
  license: {
    label: "Cédula profesional",
    number: "0000000",
  },
  /** Año desde el que ejerce (para calcular años de práctica). */
  practiceSince: 2012,
  education: [
    {
      title: "Médico cirujano",
      institution: "Facultad de Medicina, Universidad Costa del Pacífico",
      period: "2004 a 2010",
    },
    {
      title: "Diplomado en medicina preventiva",
      institution: "Instituto de Educación Médica Continua del Noroeste",
      period: "2019",
    },
  ],
  bio: [
    "Atiende a adultos, niñas y niños en consulta individual, con citas espaciadas para que cada consulta tenga el tiempo que necesita.",
    "Antes de abrir su consultorio trabajó siete años en consulta externa y guardias de hospital. De ahí viene su interés por la prevención: detectar a tiempo y acompañar a las familias con un seguimiento ordenado.",
  ],
  timeline: [
    {
      period: "2004 a 2010",
      title: "Licenciatura en medicina",
      detail: "Médico cirujano por la Facultad de Medicina de la Universidad Costa del Pacífico.",
    },
    {
      period: "2010 a 2011",
      title: "Servicio social",
      detail:
        "Médico pasante en un centro de salud rural del sur de Sinaloa: consulta general, control prenatal y vacunación.",
    },
    {
      period: "2012 a 2019",
      title: "Médico general en hospital",
      detail: "Consulta externa y guardias en el Hospital Regional Bahía Sur.",
    },
    {
      period: "2019",
      title: "Diplomado en medicina preventiva",
      detail: "Instituto de Educación Médica Continua del Noroeste.",
    },
    {
      period: "2020 a la fecha",
      title: "Consulta propia",
      detail: "Consultorio individual en el centro de Mazatlán, con agenda pensada para consultas sin prisa.",
    },
  ] satisfies TimelineItem[],
  principles: [
    {
      title: "Escuchar antes de indicar",
      text: "Cada consulta empieza con tu historia completa: qué sientes, desde cuándo y qué te preocupa.",
    },
    {
      title: "Explicar con claridad",
      text: "Sales sabiendo qué se encontró, qué opciones tienes y qué sigue, con las indicaciones por escrito.",
    },
    {
      title: "Prevenir y dar seguimiento",
      text: "Se acuerdan revisiones periódicas según tu edad y tus antecedentes, no solo cuando algo duele.",
    },
  ] satisfies Principle[],
} as const;

export function getYearsOfPractice(now: Date = new Date()): number {
  return now.getFullYear() - doctor.practiceSince;
}
